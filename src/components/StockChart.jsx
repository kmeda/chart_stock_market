import React,{Component} from 'react';
import * as Redux from "react-redux";
import moment from 'moment';

const ReactHighstock = require('react-highcharts/ReactHighstock')

const actions = require("../actions/actions.jsx");

class StockChart extends Component {
  constructor(props){
    super(props);
    }

    getConfig(){
      var {stockData} = this.props;
      // Create seriesOptions here from the state and feed to config.

      var seriesOptions = stockData.map((stock)=>{
        var dataFormat = {
          name: 'placeholder',
          data: [],
          tooltip: {valueDecimals: 2}
        }

        var timeSeries = stock["Time Series (Daily)"];
        timeSeries = Object.keys(timeSeries).map((date)=>{
          var data = [(moment(date, "YYYY/MM/DD").unix()*1000), Number(timeSeries[date]["1. open"])];
          //sort ascending to fix error
          return data;
        });

        var data = {name: stock["Meta Data"]["2. Symbol"], data: timeSeries.sort(), tooltip: {valueDecimals: 2}};

        return data;
      });

      console.log(seriesOptions);

      return {
        credits: {
          enabled: false
        },
        chart: {
          height: 550,
          backgroundColor: "rgba(0,0,0,0.5)"
        },
        xAxis: [{
          lineColor: "#cccccc"
        }],
        yAxis: [{
          gridLineColor: "#6c6b6b"
        }],
        rangeSelector: {
        buttonTheme: { // styles for the buttons
            fill: '#414141',
            stroke: 'none',
            'stroke-width': 0,
            r: 3,
            height: 14,
            style: {
                color: '#dedede',
                fontWeight: 'bold',
                color: '#141414'
            },
            states: {
                hover: {
                  fill: '#bbbbbb',
                  style: {
                      color: '#141414'
                  }
                },
                select: {
                    fill: '#bbbbbb',
                    style: {
                        color: '#141414'
                    }
                }
            }
        },
        inputBoxBorderColor: 'gray',
        inputStyle: {
            color: '#9f9f9f',
            fontWeight: 'bold'
        },
        labelStyle: {
            color: 'silver',
            fontWeight: 'bold'
        },
        selected: 5
    },
        title: {
          text: 'Stocks',
          style: {color: "#bbbbbb"}
        },
        series: seriesOptions
      };
    }

  render(){
    return (
      <ReactHighstock className="sk-chart-component" config={this.getConfig()}/>
    )
  }
}

export default Redux.connect(
  (state)=>{
    return {
      stockData: state.stockData
    }
  }
)(StockChart);
