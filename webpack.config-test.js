const path = require('path')

module.exports = {
  mode: 'development',
  entry: ['./test/index.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '',
    filename: 'test.js',
    sourceMapFilename: "test.js.map",
  },
  devServer: {
    contentBase: path.join(__dirname, 'test'),
    compress: false,
    port: 9000,
  },
  devtool: 'inline-source-map',
  resolve: {
    modules: [path.resolve('./node_modules')],
    extensions: ['.js', '.json', '.jsx', '.css'],
  },
  node: {
    fs: 'empty'
  }
};