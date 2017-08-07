import React,{Component} from 'react';
import * as Redux from "react-redux";
import {firebase, firebaseRef} from '../firebase/index.js';
import _ from "lodash";
import axios from "axios";

import SearchList from "./SearchList.jsx";
import StockList from "./StockList.jsx";

const actions = require("../actions/actions.jsx");

import Search from './Search.jsx';

class Home extends Component {
  constructor(props){
    super(props);

  }

  componentWillReceiveProps(nextProps){
    var {dispatch, removeEvent} = this.props;

    if (nextProps.removeEvent.setFlag === true) {
      console.log("Invoked");
      dispatch(actions.updateClientWithStockData(nextProps.symbolsActive));
    }

  }


  render(){

        var {stockCodes} = this.props;

        var loadstockSymbols = ()=>{
            if (stockCodes.length > 0) {
              return <Search />;
            } else {
              return <div className="sk-loading-prog">
                <i className="fa fa-refresh fa-spin fa-fw"></i>
                <span>Loading Stock Symbols...</span>
              </div>
            }
          }


    return (
      <div className="sk-container">
        <div className="sk-header"></div>
        <div className="sk-inner-wrapper">

          <div className="sk-chart-component-container">Add Chart Component here...</div>
          <div className="sk-chart-list-container">
            <div className="sk-chart-list-header">

              {loadstockSymbols()}

              <div className="sk-search-list">
                <SearchList />
              </div>
            </div>

            <StockList />

          </div>
        </div>
      </div>
    )
  }
}

export default Redux.connect(
  (state)=>{
    return {
      stockCodes: state.stockCodes,
      symbolsActive: state.symbolsActive,
      removeEvent: state.removeEvent
    }
  }
)(Home);
