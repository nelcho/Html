const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  
  resolve: {
    alias: {
      '@img': path.resolve(__dirname, 'src/assets/img/'),
      '@js': path.resolve(__dirname, 'src/js/'),
      '@css': path.resolve(__dirname, 'src/css/'),
      '@sass': path.resolve(__dirname, 'src/sass/'),
    }
  },
  
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          sources: false,
        },
      },
      {
        test: /\.(c|sc|sa)ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(webp|png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          //filename: "assets/img/[hash][ext][query]",
          filename: "assets/img/[name][ext][query]",
        },
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/index.html",
      title: "Plantilla Base WebPack",
      filename: "./index.html",
      
    }),
    
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      ignoreOrder: false,
    }),
  ],
};
