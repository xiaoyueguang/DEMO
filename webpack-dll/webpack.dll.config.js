var path = require('path');
var webpack = require('webpack');

module.exports = {
  mode: 'production',
  // mode: 'development',
  entry: {
    alpha: ['./src/alpha.js', './src/a.js', 'vue/dist/vue.esm.browser'],
    beta: ['./src/beta.js', './src/b.js']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    library: '[name]'
  },
  devtool: false,
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dist', '[name]-manifest.json'),
      name: '[name]'
    })
  ]
};
