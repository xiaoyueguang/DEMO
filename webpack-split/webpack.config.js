const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'production',
  entry: {
    page1: './src/page1.js',
    page2: './src/page2.js',
    // page3: './src/page3.js',
    // page4: './src/page4.js',
  },
  plugins: [
    // new BundleAnalyzerPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 10,
      maxInitialRequests: 10,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          // minChunks: 1,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
}