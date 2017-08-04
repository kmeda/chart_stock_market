import {firebase, firebaseRef} from '../firebase/index.js';


export var addStockCodes = (payload)=>{
  return {
    type: "ADD_STOCK_CODES",
    payload
  }
}

export var getStockCodes = ()=>{
  return (dispatch, getState)=>{
    firebaseRef.child("stockCodes/-KqdNW-CqMrlK0fWZiDG").once("value", (data)=>{
      var codes = data.val();
      dispatch(addStockCodes(codes));
    });
  }
}

export var setSearchList = (payload)=>{
  return {
    type: "SET_SEARCH_LIST",
    payload
  }
}
