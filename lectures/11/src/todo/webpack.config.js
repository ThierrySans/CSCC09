const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: [path.join(__dirname, 'frontend/js/index.js'), path.join(__dirname, 'frontend/style/form.css'), path.join(__dirname, 'frontend/style/main.css')],
  output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'static'),
  },
  module: {
      rules: [
        {
          test: /\.(png|jpg)$/,
          loader: 'file-loader?name=/media/[name].[ext]',
        },
        {
          test: /\.css$/,
          use: [ {loader: 'style-loader'}, {loader: 'css-loader', options:{}}]
        }
      ],
    },
    plugins: [
        new CopyWebpackPlugin([
          { from: '*.html',
            to:  path.join(__dirname, 'static'),
          }
        ], {context: path.join(__dirname, 'frontend')})
    ]
};