import * as Redux from 'redux';
import thunk from 'redux-thunk';

import {  stockCodesReducer, searchListReducer
          } from '../reducers/reducers.jsx';

export var configure = (initialState = {}) => {

  var reducer = Redux.combineReducers({
    stockCodes: stockCodesReducer,
    searchList: searchListReducer
  });

  var store = Redux.createStore(
    reducer,
    initialState,
    Redux.compose(
      Redux.applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
  return store;
}
