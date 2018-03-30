module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    },
    {
      test: /\.scss$/,
      loader: "sass-loader",
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx','.scss']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
