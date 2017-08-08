import React,{Component} from 'react';
import * as Redux from "react-redux";
import {firebase, firebaseRef} from '../firebase/index.js';
import _ from "lodash";



const actions = require("../actions/actions.jsx");

class StockChart extends Component {
  constructor(props){
    super(props);

  }

  render(){
    return (
      <div>Add Chart Here....</div>
    )
  }
}

export default Redux.connect(
  (state)=>{
    return {
      stockData: state.stockData
    }
  }
)(StockChart);
