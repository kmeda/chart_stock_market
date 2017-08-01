import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import firebase from './firebase/index.js';

import Home from './components/Home.jsx';

import '../styles/main.scss';
const actions = require('./actions/actions.jsx');
var store = require('./store/configureStore.jsx').configure();

ReactDOM.render(
  <Provider store={store}>
    <Home />
  </Provider>,
  document.getElementById('root'));
