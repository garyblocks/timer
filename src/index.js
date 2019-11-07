import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

import Timer from './timer';

const rootElement = document.getElementById("root");
ReactDOM.render(
    <Provider store={store}>
        <Timer />
    </Provider>,
    rootElement
);
