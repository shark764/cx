const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  entry: {
    app: {
      import: path.join(__dirname, 'index.tsx'),
      dependOn: 'vendor',
    },
    vendor: ['react', 'react-dom', 'styled-components'],
  },
  devtool: 'source-map', // this causes production vendor bundle to be huge
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      Utils: path.resolve(__dirname, 'src', 'utils'),
    },
  },
  externals: {
    CxEngage: 'CxEngage',
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
      },
    ],
  },
  output: {
    chunkFilename: '[name].[contenthash].js',
    filename: '[name].[contenthash].js',
    assetModuleFilename: '[name].[contenthash][ext][query]',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
    }),
    new CopyPlugin({
      patterns: [{ from: path.join(__dirname, '../../', 'assets'), to: '' }],
    }),
    new GenerateSW(),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static'
    // }),
  ],
  optimization: { moduleIds: 'deterministic' },
  mode: 'development',
};
