import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import storeReducer from './store/index'
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';

const store = createStore(storeReducer,composeWithDevTools(applyMiddleware(reduxThunk)))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
