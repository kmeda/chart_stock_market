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
    var {dispatch, searchTerm, symbolsActive, stockCodes} = this.props;

    if (searchTerm === '' || searchTerm.length < 2) {
      return;
    }

    if (_.includes(symbolsActive, searchTerm)) {
      alert("Symbol already added.");
      return;
    } else {
      // check if symbol exists in database
        var extractCodesfromState = stockCodes.map((stock)=>{
          return stock.Symbol;
        });

      if (_.includes(extractCodesfromState, searchTerm.toUpperCase())) {
        dispatch(actions.setRemoveFlag(true));
        dispatch(actions.addStockCodeToFirebase(searchTerm));
      } else {
        alert(searchTerm + " is either invalid or not listed.");
      }


    }

    dispatch(actions.clearSearchList());
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
      symbolsActive: state.symbolsActive
    }
  }
)(Search);
