const path = require('path')
const { HotModuleReplacementPlugin, EnvironmentPlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const env = process.env.NODE_ENV !== 'production' ? (
  new Dotenv()
) : (
  new EnvironmentPlugin({ ...process.env })
)

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve('public'),
    filename: 'app.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: ['style-loader', 'css-loader'] },
      { test: /\.s(a|c)ss$/, loader: ['style-loader', 'css-loader', 'sass-loader'] }
    ]
  },
  devServer: {
    hot: true,
    port: 8000,
    open: true,
    contentBase: './src',
    watchContentBase: true
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    env,
    new CopyWebpackPlugin([
      { from: './src/images', to: 'images' }
    ])
  ]
}
