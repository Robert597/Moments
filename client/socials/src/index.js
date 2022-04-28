import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import {BrowserRouter as Router} from "react-router-dom";
import { DataProvider } from './context/datacontext';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router>
      <DataProvider>
    <App />
    </DataProvider>
    </Router>
   </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


