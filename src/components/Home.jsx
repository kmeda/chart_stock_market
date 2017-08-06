import React,{Component} from 'react';
import * as Redux from "react-redux";
import {firebase, firebaseRef} from '../firebase/index.js';

import SearchList from "./SearchList.jsx";

const actions = require("../actions/actions.jsx");

import Search from './Search.jsx';

class Home extends Component {
  constructor(props){
    super(props);

  }

  componentWillMount(){
    this.props.dispatch(actions.getStockCodes());
    this.props.dispatch(actions.fetchSymbols());
  }

  componentWillReceiveProps(nextProps){
    //listening to props from firebase
    //when user adds or removes a stock I receive the stock codes.

    //I verify and make sure that my state has stockdata only for these codes

    //Pseudo code
    //Remove operation
      // map through the state
      // filter if stock code not in props
      // dispatch filtered payload removing stocks

    //Add Operation
    // for each of the stock codes
    // map through the state
    // if stock code not in props
    // dispatch get request and add stock data to state
    // console.log("newProps: " + this.props.symbolsActive);
    //console.log(nextProps.stockSymbols);

  }

  render(){

        var {stockCodes} = this.props;

        var stockSymbolsLoad = ()=>{
            if (stockCodes.length > 0) {
              return <Search />;
            } else {
              return <div className="sk-loading-prog">
                <i className="fa fa-refresh fa-spin QQfa-fw"></i>
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

              {stockSymbolsLoad()}

              <div className="sk-search-list">
                <SearchList />
              </div>
            </div>

              <div className="sk-chart-list-odd"></div>
              <div className="sk-chart-list-even"></div>
              <div className="sk-chart-list-odd"></div>
              <div className="sk-chart-list-even"></div>
              <div className="sk-chart-list-odd"></div>
              <div className="sk-chart-list-even"></div>
              <div className="sk-chart-list-odd"></div>
              <div className="sk-chart-list-even"></div>

          </div>
        </div>
      </div>
    )
  }
}

export default Redux.connect(
  (state)=>{
    return {
      stockCodes: state.stockCodes
    }
  }
)(Home);
