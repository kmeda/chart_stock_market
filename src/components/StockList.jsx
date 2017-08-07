import React,{Component} from 'react';
import * as Redux from "react-redux";

const actions = require("../actions/actions.jsx");


class StockList extends Component {
  constructor(props){
    super(props);
  }

  render(){

    var {stockData} = this.props;

    var renderStockList = () =>{
      if (stockData.length > 0) {
        return stockData.map((stock, index)=>{
          return <div key={index} className={(index%2) ? "sk-chart-list-even" : "sk-chart-list-odd"}>{stock.symbol}</div>
        })
      }
    }

    return(
      <div>
        {renderStockList()}
      </div>
    );
  }
}

export default Redux.connect(
  (state)=>{
    return {
      stockData: state.stockData
    }
  }
)(StockList);
