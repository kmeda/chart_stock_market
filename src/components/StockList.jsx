import React,{Component} from 'react';
import * as Redux from "react-redux";

const actions = require("../actions/actions.jsx");


class StockList extends Component {
  constructor(props){
    super(props);
  }

  removeStock(symbol){
    var {dispatch} = this.props;
    // dispatch(actions.removeStockCodeFromFirebase(symbol));
  }

  render(){

    var {stockData} = this.props;

    var renderStockList = () =>{
      if (stockData.length > 0) {
        return stockData.map((stock, index)=>{
          return <div key={index} className={(index%2) ? "sk-chart-list-even" : "sk-chart-list-odd"}>
            <div className="sk-stock-code-name">{stock.symbol}</div>
            <div className="sk-stock-code-data">{stock["Time Series (Daily)"][Object.keys(stock["Time Series (Daily)"])[0]]["1. open"]}</div>
            <div className="sk-stock-code-data">{stock["Time Series (Daily)"][Object.keys(stock["Time Series (Daily)"])[0]]["2. high"]}</div>
            <div className="sk-stock-code-data">{stock["Time Series (Daily)"][Object.keys(stock["Time Series (Daily)"])[0]]["3. low"]}</div>
            <div className="sk-stock-code-data">{stock["Time Series (Daily)"][Object.keys(stock["Time Series (Daily)"])[0]]["4. close"]}</div>
            <div className="sk-stock-code-data">{stock["Time Series (Daily)"][Object.keys(stock["Time Series (Daily)"])[0]]["6. volume"]}</div>
            <div className="sk-remove-stock"><i className="fa fa-trash" onClick={this.removeStock.bind(this, stock.symbol)}></i></div>
          </div>
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
