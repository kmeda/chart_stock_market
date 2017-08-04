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

  render(){
        var {searchList} = this.props;
    return (
      <div className="sk-container">
        <div className="sk-header"></div>
        <div className="sk-inner-wrapper">

          <div className="sk-chart-component-container">Add Chart Component here...</div>
          <div className="sk-chart-list-container">
            <div className="sk-chart-list-header">
              <Search />
                <p>All users update stock chart in realtime.</p>
              <div className="sk-search-list">
                <SearchList list={this.props.searchList}/>
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
      searchList: state.searchList
    }
  }
)(Home);
