import App from './App.jsx';

import ReactDOM from 'react-dom';
import React from 'react';

const render = (_App) => {
    ReactDOM.render(<_App />, document.getElementById('AppContainer'))
};

render(App);