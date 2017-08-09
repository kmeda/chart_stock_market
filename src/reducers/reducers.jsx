export var stockCodesReducer = (state={}, action) => {
  switch (action.type) {
    case "ADD_STOCK_CODES":
      return action.payload
    default:
      return state;
  }
}

export var searchListReducer = (state=[], action)=>{
  switch (action.type) {
    case "SET_SEARCH_LIST":
      return action.payload;
    case "CLEAR_SEARCH_LIST":
      return [];
    default:
      return state;
  }
}

export var searchTermReducer = (state='', action)=>{
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return action.payload;
    case "CLEAR_SEARCH_TERM":
      return '';
    default:
      return state;
  }
}

export var stockDataReducer = (state=[], action)=>{
  switch (action.type) {
    case "ADD_STOCK_DATA":
      return state.concat(action.payload);
    case "FILTER_STOCK_DATA":
      return action.payload;
    default:
      return state;

  }
}

export var symbolsActiveReducer = (state=[], action)=>{
  switch (action.type) {
    case "ADD_CUURENTLY_ACTIVE_STOCK_CODE":
      return [...state, action.payload];
    case "RESET_CURRENTLY_ACTIVE_STOCK_CODES":
      return action.payload;
    case "SET_CURRENTLY_ACTIVE_STOCK_CODES":
      return action.payload;
    default:
    return state;
  }
}

export var isFetchingReducer = (state=false, action)=>{
  switch (action.type) {
    case "IS_LOADING":
      return action.flag;
    default:
      return state;
  }
}
