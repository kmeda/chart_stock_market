import React,{Component} from 'react';
import * as Redux from "react-redux";

const actions = require("../actions/actions.jsx");


class SearchList extends Component {
  constructor(props){
    super(props);
  }


  render(){

  if (this.props.list.length > 0) {
    console.log(this.props.list);

    return (
      <ul>
      {
        this.props.list.map((item)=>{
          return <li>{item.name}</li>
        })
      }
    </ul>
  );
  } else {
    return <div></div>
  }

  }
}

export default Redux.connect()(SearchList);
