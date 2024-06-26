const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


    


module.exports = {
  entry: './src/index.js',
  
  devtool: 'inline-source-map',
 
  plugins: [
    new HtmlWebpackPlugin({
        template: 'src/index.html'
    }),
  ],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
  
  {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
  },
  {
    test: /\.html$/i,
    loader: "html-loader",
  },]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  

 
  };