const path = require('path');
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
  plugins: [
    new NodePolyfillPlugin(),
  ]
}
