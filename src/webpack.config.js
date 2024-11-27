module.exports = {
    entry: [
      'react-hot-loader/patch',
      './src/index.js'
    ],
    // other configurations...
    devServer: {
      hot: true, // enables HMR
      open: true, // automatically opens the browser
    },
  };
  