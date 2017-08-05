import {firebase, firebaseRef} from '../firebase/index.js';
import axios from "axios";

//Initialise app with a list of all stick symbols fetched from firebase
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

// Set current search term in state
export var setSearchTerm = (payload)=>{
  return {
    type: "SET_SEARCH_TERM",
    payload
  }
}
export var clearSearchTerm = ()=>{
  return {
    type: "CLEAR_SEARCH_TERM"
  }
}


//Filter the list and return matched symbols
export var setSearchList = (payload)=>{
  return {
    type: "SET_SEARCH_LIST",
    payload
  }
}
export var clearSearchList = ()=>{
  return {
    type: "CLEAR_SEARCH_LIST"
  }
}


//Fetch data for specific stock and set state
export var getStockDataAndPushToFirebase = (code)=>{
  return (dispatch, getState)=>{
    var url = `https://www.quandl.com/api/v3/datasets/WIKI/${code.toUpperCase()}/data.json?start_date=2016-08-01api_key=process.env.API_KEY`;
    axios.get(url).then((res)=>{
      var stockData = {...res, symbol: code.toUpperCase()}
      console.log(stockData);
      dispatch(addStockData(stockData));

    // DISPATCH AN ACTION TO PUSH SYMBOL TO FIREBASE


    },(error)=> alert(`Incorrect request code or Data not found for ${code.toUpperCase()}`));
  }
}

export var updateClientWithStockData = (code)=>{
  return (dispatch, getState)=>{
    var url = `https://www.quandl.com/api/v3/datasets/WIKI/${code.toUpperCase()}/data.json?start_date=2016-08-01api_key=process.env.API_KEY`;
    axios.get(url).then((res)=>{
      var stockData = {...res, symbol: code.toUpperCase()}
      console.log(stockData);
      dispatch(addStockData(stockData));
    },(error)=> alert(`Incorrect request code or Data not found for ${code.toUpperCase()}`));
  }
}

export var addStockData = (payload)=>{
  return {
    type: "ADD_STOCK_DATA",
    payload
  }
}
