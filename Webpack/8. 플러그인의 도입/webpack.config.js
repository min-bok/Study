const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode:"development",
    entry:{
        index: "./source/index.js",
        about: "./source/about.js"
    },
    output:{
        path:path.resolve(__dirname, "public"),
        filename:'[name]_bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template:'./source/index.html',
          filename:'./index.html',
          chunks:['index']
      }),
        new HtmlWebpackPlugin({
          template:'./source/about.html',
          filename:'./about.html',
          chunks:['about']
  })
    ],
};