module.exports = {
  // ... các cấu hình khác ...
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: /node_modules\/face-api.js/
      }
    ]
  }
};
