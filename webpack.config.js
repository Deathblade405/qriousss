const path = require('path');

module.exports = {
  entry: './src/index.js',  // Your entry file (adjust if different)
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Make sure it only resolves .js and .jsx
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Handle .js and .jsx files
        exclude: /node_modules/,
        use: 'babel-loader',  // Use Babel to transpile JS/JSX files
      },
      // You might also need a CSS or file-loader if using styles or images
    ],
  },
  
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // Serve files from the 'dist' folder
    port: 3000, // The port you want to serve the app on (default: 8080)
    open: true,  // Automatically open the browser when the server starts
  },
};