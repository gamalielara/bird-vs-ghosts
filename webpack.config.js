const HTMLWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    hehehehehe: path.resolve(__dirname, "src/index"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
    assetModuleFilename: "assets/[name][ext][query]",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|mp3|wav)/i,
        type: "asset/resource",
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      "<utils>": path.resolve(__dirname, "src/script/utils"),
      "<assets>": path.resolve(__dirname, "src/assets"),
      "<script>": path.resolve(__dirname, "src/script"),
    }
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: "bird vs ghosts by Ara Gamaliel",
      filename: "index.html",
      template: "src/index.html",
      favicon: "src/assets/favicon.ico"
    }),
  ],
};
