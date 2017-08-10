const express = require('express');
const path = require('path');
const axios = require("axios");
const CircularJSON = require('circular-json');
var favicon = require('serve-favicon');


const app = express();
app.use(favicon(path.join(__dirname + '/favicon.ico')));


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
