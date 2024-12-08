const ESLintPlugin = require("eslint-webpack-plugin");

const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.config.common");

module.exports = merge(commonConfig, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    port: 3000,
    hot: true,
    open: true,
  },
  plugins: [
    new ESLintPlugin({
      extensions: ["js", "jsx"],
      failOnError: false,
      emitWarning: true,
      fix: true,
    }),
  ],
});
