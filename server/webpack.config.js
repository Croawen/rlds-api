const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: ['webpack/hot/poll?1000', './src/main.ts'],
  watch: true,
  watchOptions: {
    ignored: [
      'node_modules',
      'test',
      'var',
      'migrations',
      'docker',
      'docs',
      'bin',
    ],
    aggregateTimeout: 300,
    poll: 1000,
  },
  target: 'node',
  node: {
    __dirname: false,
  },
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000'],
    }),
  ],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        enforce: 'pre',
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  mode: 'development',
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
  },
};
