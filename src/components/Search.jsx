import React,{Component} from 'react';
import * as Redux from "react-redux";
import _ from "lodash";
const actions = require("../actions/actions.jsx");




class Search extends Component {
  constructor(props){
    super(props);
  }



  handleSearch(){
    var {dispatch, stockCodes} = this.props;

    var search = _.trim(this.refs.searchTerm.value.toLowerCase());

    dispatch(actions.setSearchTerm(this.refs.searchTerm.value.toUpperCase()));

    if (search === '' || search.length < 2) {
      dispatch(actions.setSearchList([]));
      return;
    } else {

      var filteredList = stockCodes.filter((item)=>{
        var symbol = item["Symbol"].toLowerCase();
        var name  = item["Company Name"].toLowerCase();
        var stockInfo = symbol + ' ' + name;

        return stockInfo.indexOf(search) > -1;
      });

      //dispatch an action to update state
      dispatch(actions.setSearchList(filteredList.slice(0,25)))
    }
  }

  handleSubmit(e){
    e.preventDefault();
    var {dispatch, searchTerm, symbolsActive, stockData} = this.props;

    if (searchTerm === '' || searchTerm.length < 2) {
      return;
    }

    if (_.includes(symbolsActive, searchTerm)) {
      alert("Symbol already added.");
      return;
    } else {
      dispatch(actions.getStockDataAndPushToFirebase(searchTerm));
    }

    //if error ? throw error else update state with stock data
    dispatch(actions.clearSearchList());
    {/*dispatch(actions.clearSearchTerm());
    if (searchTerm === '') {
      this.refs.searchTerm.value = '';
    }*/}
  }

  render(){

    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
            className="sk-stock-search"
            placeholder="Search Stock.."
            onChange={this.handleSearch.bind(this)}
            ref="searchTerm"/>
          <button className="sk-stock-search-btn" onClick={this.handleSubmit.bind(this)}>Go</button>
      </form>
    </div>
  );
  }
}

export default Redux.connect(
  (state)=>{
    return {
      stockCodes: state.stockCodes,
      searchList: state.searchList,
      searchTerm: state.searchTerm,
      symbolsActive: state.symbolsActive,
      stockData: state.stockData
    }
  }
)(Search);
