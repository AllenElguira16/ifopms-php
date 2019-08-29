import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack, { Configuration } from "webpack";
import WebpackNotifier from "webpack-notifier";
let isProd;
if (process.env.NODE_ENV) {
  isProd = process.env.NODE_ENV.trim() === "production";
}

const config: Configuration = {
  performance: {
    hints: false
  },
  watch: isProd ? false : true,
  entry: {
    main: ["./Assets/Scripts/index.tsx"],
    vendor: ["react", "react-dom", "react-router-dom"]
  },
  output: {
    path: path.resolve(__dirname, "Public/Scripts"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js"
  },
  resolve: {
    extensions: ["*", ".ts", ".tsx", ".jsx", ".js", ".json", ".vue"]
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)/,
        exclude: /node_modules/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          // isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [
          // isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader"
      },
      {
        test: /\.(jpe?g|png|gif)/,
        loader: "url-loader"
      },
      {
        test: /\.(zip|rar)/,
        loader: "url-loader"
      }
    ]
  },
  plugins: [
    new WebpackNotifier({
      title: "Webpack",
      alwaysNotify: true
    }),
    new MiniCssExtractPlugin({
      filename: "../Styles/[name].bundle.css"
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
};

export default config;
