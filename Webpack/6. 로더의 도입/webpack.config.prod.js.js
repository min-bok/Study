const path = require('path');

module.exports = {
    mode:"production",
    entry:"./source/index.js",
    output:{
        path:path.resolve(__dirname, "public"),
        filename:'index_bundle.js'
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