const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const RobotstxtPlugin = require("robotstxt-webpack-plugin").default;

const robotsOptions = {}; 
const paths = [
  {
    path: '/',
    lastMod: new Date().toISOString(),
    priority: '1',
    changeFreq: 'weekly'
  }
];

module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{ loader: 'html-loader', options: { minimize: true } }]
      },
      {
        test: /\.(png|jpe?g|svg)/i,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "./img/[name].[ext]",
              limit: 10000
            }
          },
          {
            loader: "img-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      template: "src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new SitemapPlugin('https://juliusreade.com', paths),
    new RobotstxtPlugin(robotsOptions)
  ],
};