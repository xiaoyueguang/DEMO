const webpack = require('webpack')
const path = require('path')

module.exports = {
  mode: 'production',
  // mode: 'development',
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  devtool: false,
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: require('./dist/alpha-manifest.json'),
      // scope: "alpha",
    }),
    new webpack.DllReferencePlugin({
      manifest: require('./dist/beta-manifest.json'),
    }),
  ],
}