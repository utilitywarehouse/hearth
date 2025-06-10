const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const path = require('path');

module.exports = (env, argv) => ({
  mode: argv.mode === 'production' ? 'production' : 'development',

  // This is necessary because Figma's 'eval' works differently than normal eval
  devtool: argv.mode === 'production' ? false : 'inline-source-map',

  entry: {
    ui: './src/app/index.tsx', // The entry point for your UI code
    code: './src/plugin/controller.ts', // The entry point for your plugin code
  },

  module: {
    rules: [
      { test: /\.m?js/, resolve: { fullySpecified: false } },

      // Converts TypeScript code to JavaScript
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },

      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false, // Disable URL processing to prevent URL construction errors
            },
          },
        ],
      },

      // Allows you to use "<%= require('./file.svg') %>" in your HTML code to get a data URI
      { test: /\.(png|jpg|gif|webp|svg)$/, loader: 'url-loader' },

      // Handle fonts - inline all fonts as base64
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 50000, // Inline files smaller than 50kb
            publicPath: './', // Use empty string for publicPath
          },
        },
      },
    ],
  },

  // Webpack tries these extensions for you if you omit the extension like "import './file'"
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './', // Set empty string to prevent automatic publicPath
  },

  // Tells Webpack to generate "ui.html" and to inline "ui.ts" into it
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/app/index.html',
      filename: 'ui.html',
      chunks: ['ui'],
      cache: false,
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/ui/]),
  ],
});
