import express from 'express';
import yields from 'express-yields';
import fs from 'fs-extra';
import webpack from 'webpack';
import { argv } from 'optimist';
import { get } from 'request-promise';
import { delay } from 'redux-saga';
import { questions, question } from '../data/api-real-url';
import getStore from '../src/getStore';
import {renderToString} from 'react-dom/server';
import { Provider } from 'react-redux';
import React from 'react';
import App from '../src/App';

const port = process.env.PORT || 3000;
const app = express();

const useServerRender = argv.useServerRender === 'true';
const useLiveData = argv.useLiveData === 'true';

if(process.env.NODE_ENV === 'development') {
    const config = require('../webpack.config.dev.babel.js').default;
    const compiler = webpack(config);
    app.use(require('webpack-dev-middleware')(compiler,{
        /**
         * @noInfo Only display warnings and errors to the concsole
         */
        noInfo: true,
        stats: {
            assets: false,
            colors: true,
            version: false,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false
        }
    }));
    app.use(require('webpack-hot-middleware')(compiler));
}

function * getQuestions (){
    let data;
    if (useLiveData) {
        /**
         * If live data is used, contact the external API
         */
        data = yield get(questions,{gzip:true});
    } else {
        /**
         * If live data is not used, read the mock questions file
         */
        data = yield fs.readFile('./data/mock-questions.json',"utf-8");
    }

    /**
     * Parse the data and return it
     */
    return JSON.parse(data);
}

function * getQuestion (question_id) {
    let data;
    if (useLiveData) {
        /**
         * If live data is used, contact the external API
         */
        data = yield get(question(question_id),{gzip:true,json:true});
    } else {
        /**
         * If live data is not used, get the list of mock questions and return the one that
         * matched the provided ID
         */
        const questions = yield getQuestions();
        const question = questions.items.find(_question=>_question.question_id == question_id);
        /**
         * Create a mock body for the question
         */
        question.body = `Mock question body: ${question_id}`;
        data = {items:[question]};
    }
    return data;
}

app.get('/api/questions',function *(req,res){
    const data = yield getQuestions();
    /**
     * Insert a small delay here so that the async/hot-reloading aspects of the application are
     * more obvious. You are strongly encouraged to remove the delay for production.
     */
    yield delay(150);
    res.json(data);
});

app.get('/api/questions/:id',function *(req,res){
    const data = yield getQuestion(req.params.id);
    /**
     * Remove this delay for production.
     */
    yield delay(150);
    res.json(data);
});


app.get(['/'], function * (req, res) {
    let index = yield fs.readFile('./public/index.html', "utf-8");

    const initialState = {
        questions: []
    };

    const questions = yield getQuestions();

    initialState.questions = questions.items;

    const store = getStore(initialState);
    
    if(useServerRender){
        const appRendered = renderToString(
            <Provider store={store}>
                <App />
            </Provider>
        );
        index = index.replace(`<%= preloadedApplication %>`, appRendered );
    }else{
        index = index.replace(`<%= preloadedApplication %>`, `Please wait while we load the application.` );
    }

    res.send(index);
});

app.listen(port, '0.0.0.0', ()=>console.info(`App listening on ${port}`));