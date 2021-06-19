const path = require("path");
const webpack = require("webpack");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const generateHtmlPlugins = () => {
  const templatesDir = "./src/templates";
  const templates = fs.readdirSync(path.resolve(__dirname, templatesDir));
  const plugins = templates.map((item) => {
    const parts = item.split(".");
    const name = parts[0];
    const extension = parts[1];
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templatesDir}/${name}.${extension}`),
    });
  });
  return plugins;
};

module.exports = {
  entry: path.resolve(__dirname, "src/assets/scripts/index.js"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "assets/scripts/index.js",
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./build"),
    port: 8080,
    open: true,
    compress: true,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    ...generateHtmlPlugins(),
    // new BundleAnalyzerPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "assets/style/style.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "[name].[ext]",
              outputPath: 'assets/images',
            },
          },
        ],
      },
      { test: /\.(js)$/, use: "babel-loader", exclude: /node_modules/ },
      {
        test: /\.pug$/,
        loader: "pug-loader",
        options: {
          pretty: true,
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["autoprefixer"],
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
    minimize: true,
  },
};
