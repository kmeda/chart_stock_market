import * as Redux from 'redux';
import thunk from 'redux-thunk';

import {  stockCodesReducer,
          searchListReducer,
          searchTermReducer,
          stockDataReducer,
          symbolsActiveReducer,
          removeEventReducer,
          isFetchingReducer
          } from '../reducers/reducers.jsx';

export var configure = (initialState = {}) => {

  var reducer = Redux.combineReducers({
    stockCodes: stockCodesReducer,
    searchList: searchListReducer,
    searchTerm: searchTermReducer,
    stockData: stockDataReducer,
    symbolsActive: symbolsActiveReducer,
    isFetching: isFetchingReducer
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
