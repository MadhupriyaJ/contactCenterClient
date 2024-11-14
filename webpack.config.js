const HtmlWebPackPlugin = require("html-webpack-plugin");
const {ModuleFederationPlugin} = require("webpack").container;
const path = require("path");

const mfeobject = new ModuleFederationPlugin({
   name: 'metronics_v8.2.0-main',
   filename:'remoteEntry.js',
   exposes:{
      './MFEApp':'./src/App'
   }
})

const htmlPlugin = new HtmlWebPackPlugin({
   template: "./public/index.html",
   filename: "./index.html"
});
module.exports = {
   mode: 'development',
   devServer: {
      static: path.join(__dirname, "dist"),
      port: 8080,
      historyApiFallback: {
         index: '/public/index.html'
      },
   },
   module: {
      rules: [{
         test: /\.js$/,
         exclude: /node_modules/,
         use: {
            loader: "babel-loader"
         }
      }]
   },
   plugins: [
      htmlPlugin,
      mfeobject
   ]
};
