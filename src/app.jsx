import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {firebase, firebaseRef} from './firebase/index.js';

import Home from './components/Home.jsx';

import '../styles/main.scss';
const actions = require('./actions/actions.jsx');
var store = require('./store/configureStore.jsx').configure();


store.dispatch(actions.getStockCodes());
store.dispatch(actions.fetchSymbols());
var newItems = false;
var fetchStockSymbols = firebaseRef.child("symbolsActive");


fetchStockSymbols.on("child_removed", (data)=>{
  // console.log("Realtime data removed: "+data.val());
  store.dispatch(actions.removeStockCodefromClient());
});

fetchStockSymbols.on("child_added", (data)=>{
  if (!newItems) {
    // console.log("Fired because no existing items");
    return;
  }
  if (data.exists()) {
    // console.log("Realtime data added: " + data.val());
    store.dispatch(actions.addCurrentlyActiveStockCode(data.val()));
  } else {
    store.dispatch(actions.addCurrentlyActiveStockCode([]));
  }

});

fetchStockSymbols.once("value", (data)=>{
  if (data.exists()) {
    // newItems = true;
  }
  newItems = true;
})

ReactDOM.render(
  <Provider store={store}>
    <Home />
  </Provider>,
  document.getElementById('root'));
