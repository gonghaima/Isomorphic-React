import App from './App.jsx';

import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import getStore from './getStore';

const store = getStore();

const render = (_App) => {
    ReactDOM.render(
    <Provider store={store}>
        <_App />
    </Provider>,
    document.getElementById('AppContainer'))
};

render(App);