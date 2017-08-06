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
    case "REMOVE_STOCK_DATA":
      return action.payload;
    default:
      return state;

  }
}

export var symbolsActiveReducer = (state=[], action)=>{
  switch (action.type) {
    case "ADD_CUURENTLY_ACTIVE_SYMBOLS":
      return action.payload
    default:
    return state;
  }
}
