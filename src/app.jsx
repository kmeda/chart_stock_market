import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {firebase, firebaseRef} from './firebase/index.js';

import Home from './components/Home.jsx';

import '../styles/main.scss';
const actions = require('./actions/actions.jsx');
var store = require('./store/configureStore.jsx').configure();


var fetchStockSymbols = firebaseRef.child("symbolsActive");
fetchStockSymbols.on("value", (data)=>{
  if (data.exists()) {
    store.dispatch(actions.fetchSymbols());
  } else {
    store.dispatch(actions.addCurrentlyActiveSymbols([]));
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Home />
  </Provider>,
  document.getElementById('root'));
