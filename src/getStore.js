import { createStore, combineReducers, applyMiddleware } from 'redux';
import { identity } from 'lodash';

export default function (defaultState = {
    test: "Test Value"
}) {
    const store = createStore(identity, defaultState);
    return store;
}