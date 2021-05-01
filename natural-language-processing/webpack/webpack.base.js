const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const dotenv = require('dotenv');

const DIST_DIR = path.join(__dirname, '../public');
const SRC_DIR = './src';
const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((accumulator, current) => {
  accumulator[`process.env.${current}`] = JSON.stringify(env[current]);
  return accumulator;
}, {});

module.exports = {
  context: path.join(__dirname, '../'),
  entry: [`${SRC_DIR}/js/index.js`, `${SRC_DIR}/scss/style.scss`],
  output: {
    path: DIST_DIR,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.svg'],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: `${SRC_DIR}/views/index.html`,
      inject: 'body',
    }),
    new webpack.DefinePlugin(envKeys),
    new CopyPlugin({
      patterns: [
        { from: "src/js/sw.js", to: "sw.js" },
      ],
    }),
  ],
  module: {
    rules: [
      { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
};
