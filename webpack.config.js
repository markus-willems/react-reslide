const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => {
  return {
    entry: './index.js',
    output: {
      path: path.resolve(__dirname, 'deploy'),
      filename: 'react-reslide.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html'
      })
    ]
  }
}
