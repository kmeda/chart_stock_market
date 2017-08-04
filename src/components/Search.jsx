import React,{Component} from 'react';
import * as Redux from "react-redux";
import _ from "lodash";
const actions = require("../actions/actions.jsx");




class Search extends Component {
  constructor(props){
    super(props);
  }


  onSearch(){
    var {dispatch, stockCodes} = this.props;

    var search = _.trim(this.refs.searchTerm.value.toLowerCase());

    if (search === '' || search.length < 2) {
      dispatch(actions.setSearchList([]));
      return;
    } else {
      var filteredList = stockCodes.filter((item)=>{
        var symbol = item["symbol"].toLowerCase();
        var name  = item["name"].toLowerCase();
        var stockInfo = symbol + ' ' + name;

        return stockInfo.indexOf(search) > -1;
      });

      //dispatch an action to update state
      dispatch(actions.setSearchList(filteredList.slice(0,10)))


    }
  }

  render(){

    return (
      <div>
        <form>
          <input
            className="sk-stock-search"
            placeholder="Search Stock.."
            onChange={this.onSearch.bind(this)}
            ref="searchTerm"/>
          <button className="sk-stock-search-btn" onClick={(e)=> e.preventDefault()}>Go</button>
      </form>
    </div>
  );
  }
}

export default Redux.connect(
  (state)=>{
    return {
      stockCodes: state.stockCodes
    }
  }
)(Search);
