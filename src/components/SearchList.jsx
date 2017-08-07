import React,{Component} from 'react';
import * as Redux from "react-redux";

const actions = require("../actions/actions.jsx");


class SearchList extends Component {
  constructor(props){
    super(props);
  }

  handleClick(code){
    var {dispatch, symbolsActive} = this.props;

    //if error ? throw error else update state with stock data
    if (_.includes(symbolsActive, code)) {
      alert("Symbol already added.");
      return;
    } else {
      dispatch(actions.setRemoveFlag(true));
      dispatch(actions.addStockCodeToFirebase(code));
    }
    dispatch(actions.clearSearchList());
  }


  render(){

  if (this.props.searchList.length > 0) {
    return (
      <div>
      {
        this.props.searchList.map((item, index)=>{
          return <div className="sk-list-item" key={index} onClick={this.handleClick.bind(this, item["Symbol"])}>
            <span>{item["Symbol"]}, </span>
            <span className="sk-list-item-child2">{item["Company Name"]}</span>
          </div>
        })
      }
    </div>
  );
  } else {
    return <div></div>
  }
  }
}

export default Redux.connect(
  (state)=>{
    return {
      searchList: state.searchList,
      symbolsActive: state.symbolsActive
    }
  }
)(SearchList);
