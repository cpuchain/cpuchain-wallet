const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: 'esbuild-loader'
      }
    ]
  },
  entry: './bitcoin.js',
  output: {
    filename: 'bitcoinjs.min.js',
    path: path.resolve('.'),
    library: 'bitcoin',
    libraryTarget: 'umd'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      })
    ]
  },
  plugins: [
    new NodePolyfillPlugin(),
  ]
}
