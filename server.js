const express = require('express');
const path = require('path');
const axios = require("axios");
const CircularJSON = require('circular-json');

const app = express();

app.use(function(req, res, next){
res.header('Access-Control-Allow-Origin', "*");
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");

next();
});

app.get("/alphaadv_api/get_stock", (req, res) => {

  //make the request here with request parameters and send json response back

  //monitoring requests
  console.log(req.query.code);

  // var url = `https://www.quandl.com/api/v3/datasets/WIKI/${req.query.code.toUpperCase()}/data.json?start_date=2016-08-01&api_key=${process.env.API_KEY}`;
  var url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${req.query.code.toUpperCase()}&apikey=MHTTI85H37ZFFBPP`;

  var stockData;
  axios.get(url).then((response)=>{
    let json = CircularJSON.stringify(response);
    res.send(json);
  },(error)=> {
    let err = CircularJSON.stringify(error);
    res.send(err);
  });
});


if (process.env.NODE_ENV !== 'production') {
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config.js');
  console.log("Runnig non-prod");
  app.use(webpackMiddleware(webpack(webpackConfig)));
} else {

  app.use(express.static('dist'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(process.env.PORT || 3050, () => console.log('Listening'));
