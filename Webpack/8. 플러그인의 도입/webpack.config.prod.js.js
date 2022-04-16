const path = require('path');

module.exports = {
    mode:"production",
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
}