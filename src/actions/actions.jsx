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


//Fetch data for specific stock and set state then push symbol to firebase
export var getStockDataAndPushToFirebase = (code)=>{
  return (dispatch, getState)=>{

    var stockData;
    var fetchStockData = axios.get(`http://localhost:3050/quandl_api/get_stock?code=${code}`).then((res)=>{
      stockData = {symbol: code, ...res.data.data};
      console.log(stockData);

  }, (error)=> alert(`No response from server. Please try again.`));

    fetchStockData.then(()=>{
      if (Object.keys(stockData).length < 2) {
        alert(`Incorrect Stock code or Data not supplied by API for ${code}.`);
        return;
      } else {
        dispatch(addStockData(stockData));
        // DISPATCH AN ACTION TO PUSH SYMBOL TO FIREBASE
        dispatch(addStockCodeToFirebase(stockData.symbol))
      }
    });
  }
}

export var addStockCodeToFirebase = (code)=>{
  return (dispatch, getState) => {
    var pushSymbol = firebaseRef.child("symbolsActive");
    pushSymbol.push(code);
  }
}

export var updateClientWithStockData = (code)=>{
  return (dispatch, getState)=>{
    var url = `https://www.quandl.com/api/v3/datasets/WIKI/${code}/data.json?start_date=2016-08-01&api_key=process.env.API_KEY`;
    axios.get(url).then((res)=>{
      var stockData = {...res, symbol: code}
      console.log(stockData);
      dispatch(addStockData(stockData));
    },(error)=> alert(`Incorrect request code or Data not found for ${code}`));
  }
}

export var addStockData = (payload)=>{
  return {
    type: "ADD_STOCK_DATA",
    payload
  }
}


//actions to fetch symbols from firebase and update state

export var fetchSymbols = ()=>{
  return (dispatch, getState)=>{
    var getSymbols = firebaseRef.child("symbolsActive");
    getSymbols.once("value", (data)=>{
      if (data.exists()) {
        var symbols = Object.values(data.val());
        console.log("Currently active symbols: "+symbols);
        dispatch(addCurrentlyActiveSymbols(symbols));
      }
    });
  }
}

export var addCurrentlyActiveSymbols = (payload)=>{
  return {
    type: "ADD_CUURENTLY_ACTIVE_SYMBOLS",
    payload
  }
}
