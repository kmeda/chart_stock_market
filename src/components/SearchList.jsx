import React,{Component} from 'react';
import * as Redux from "react-redux";

const actions = require("../actions/actions.jsx");


class SearchList extends Component {
  constructor(props){
    super(props);
  }

  handleClick(code){
    var {dispatch} = this.props;

    // dispatch action to call api to get data
    dispatch(actions.getStockDataAndPushToFirebase(code));
    // dispatch action to add stock data to redux state

    // dispatch action to clear search results
    dispatch(actions.clearSearchList());

  }


  render(){

  if (this.props.list.length > 0) {
    return (
      <div>
      {
        this.props.list.map((item, index)=>{
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

export default Redux.connect()(SearchList);
