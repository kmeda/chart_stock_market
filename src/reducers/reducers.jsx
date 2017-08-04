export var stockCodesReducer = (state={}, action) => {
  switch (action.type) {
    case "ADD_STOCK_CODES":
      return action.payload
    default:
      return state;
  }
}

export var searchListReducer = (state={}, action)=>{
  switch (action.type) {
    case "SET_SEARCH_LIST":
      return action.payload;
    default:
      return state;
  }
}
