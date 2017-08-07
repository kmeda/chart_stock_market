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


// Add stock code to firebase
export var addStockCodeToFirebase = (code)=>{
  return (dispatch, getState) => {
    var pushSymbol = firebaseRef.child("symbolsActive");

    var url = `https://chart-stocks-fcc.herokuapp.com/quandl_api/get_stock?code=${code}`;

    axios.get(url).then((res)=>{
      if (!res.data.response) {
        pushSymbol.push(code);
      } else {
        alert(res.data.response.data.quandl_error.message);
      }
    });

  }
}

//fetch all sybols for initial data load
export var fetchSymbols = ()=>{
  return (dispatch, getState) => {
    var fetchStockSymbols = firebaseRef.child("symbolsActive");
    fetchStockSymbols.once("value", (data)=>{
      if (data.exists()) {
        var codes = Object.values(data.val());
        dispatch(setCurrentlyActiveStockCodes(codes));
      }
    })
  }
}

// Remove stock code form firebase
export var removeStockCodeFromFirebaase = (code)=>{
  return (dispatch, getState) =>{

  }
}

//
export var updateClientWithStockData = (newSymbols)=>{
  return (dispatch, getState)=>{

    // console.log("___________***___________");
    // console.log(newSymbols);
    // Check to see if the length of new symbols
    var newStockData = [];

    //check if stocks already exist in state ? filter them out
    var existingStockData = getState().stockData;
    var existingSymbols = existingStockData.map((stock)=>{
      return stock.symbol;
    });
    // console.log("Current stock data in client: "+existingSymbols);

    var getNewStocks = newSymbols.map((symbol)=>{
      if (!(_.includes(existingSymbols, symbol))) {
        var url = `https://chart-stocks-fcc.herokuapp.com/quandl_api/get_stock?code=${symbol}`;
        return axios.get(url).then((res)=>{
          var stockData = {...res, symbol: symbol};
          newStockData.push(stockData);
        });
      }
    });

    axios.all(getNewStocks).then(()=>{

      if (getNewStocks.length > 0) {

        dispatch(addStockData(newStockData));
      }

    }, (error) => alert(error));
  }
}


export var addStockData = (payload)=>{
  return {
    type: "ADD_STOCK_DATA",
    payload
  }
}

export var filterStockData = (payload) => {
  return {
    type: "FILTER_STOCK_DATA",
    payload
  }
}

//actions to fetch symbols from firebase and update state

export var removeStockCodefromClient = () =>{
  return (dispatch, getState) => {

    // console.log("**************************************************");

    //set flag to false
    dispatch(setRemoveFlag(false));

    var getCurrentCodes = firebaseRef.child("symbolsActive");

    getCurrentCodes.once("value", (data)=>{
      if (data.exists()) {
        var currentCodes = Object.values(data.val());

        // console.log("Filtered Codes: " + currentCodes);
        dispatch(resetCurrentlyActiveStockCodes(currentCodes));
        // dispatch action to set filtered stock data here...

        var currentState = getState().stockData;
        var filteredState = currentState.filter((stock)=>{
            return _.includes(currentCodes, stock.symbol);
        });
        // console.log(filteredState);
        dispatch(filterStockData(filteredState));
        // dispatch(setRemoveFlag(true));
        //set flag to true

      } else {
        dispatch(filterStockData([]));
        dispatch(resetCurrentlyActiveStockCodes([]));
        //set flag to true
        // dispatch(setRemoveFlag(true));
      }
    });
  }
}


export var addCurrentlyActiveStockCode = (payload)=>{
  return {
    type: "ADD_CUURENTLY_ACTIVE_STOCK_CODE",
    payload
  }
}

export var resetCurrentlyActiveStockCodes = (payload) => {
  return {
    type: "RESET_CURRENTLY_ACTIVE_STOCK_CODES",
    payload
  }
}

export var setCurrentlyActiveStockCodes = (payload) => {
  return {
    type: "SET_CURRENTLY_ACTIVE_STOCK_CODES",
    payload
  }
}

export var setRemoveFlag = (flag)=>{
  return {
    type: "SET_REMOVE_FLAG",
    flag
  }
}
