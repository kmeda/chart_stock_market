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
          return <div key={index} className={(index%2) ? "sk-chart-list-even" : "sk-chart-list-odd"}>
            <div className="sk-stock-code-name">{stock.symbol}</div>
            <div className="sk-stock-code-data">{stock.data.data.dataset_data.data[0][1]}</div>
            <div className="sk-stock-code-data">{stock.data.data.dataset_data.data[0][2]}</div>
            <div className="sk-stock-code-data">{stock.data.data.dataset_data.data[0][3]}</div>
            <div className="sk-stock-code-data">{stock.data.data.dataset_data.data[0][4]}</div>
            <div className="sk-stock-code-data">{stock.data.data.dataset_data.data[0][5]}</div>
            <div className="sk-remove-stock"><i className="fa fa-trash"></i></div>
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
