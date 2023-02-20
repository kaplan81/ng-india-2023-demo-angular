// @ts-check
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { share, SharedMappings } = require('@angular-architects/module-federation/webpack');
const sharedMappings = new SharedMappings();

const shellWebpackConfig = {
  output: {
    publicPath: 'http://localhost:4200/',
  },
  optimization: {
    runtimeChunk: false,
  },
  experiments: {
    outputModule: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      library: { type: 'module' },
      remotes: {
        mfes: 'mfes@http://localhost:4201/remoteEntry.js',
      },
      shared: share({
        '@angular/core': {
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto',
          eager: true,
          includeSecondaries: {
            skip: ['@angular/core/testing'],
          },
        },
        '@angular/common': {
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto',
          eager: true,
          includeSecondaries: {
            skip: [
              '@angular/common/http',
              '@angular/common/http/testing',
              '@angular/common/testing',
              '@angular/common/upgrade',
            ],
          },
        },
      }),
    }),
    sharedMappings.getPlugin(),
  ],
};

// // Uncomment for debugging.
// console.log('shellWebpackConfig:::', shellWebpackConfig);
// console.log(
//   'ModuleFederationPlugin options:::',
//   // @ts-ignore
//   shellWebpackConfig.plugins[0]._options,
// );

module.exports = shellWebpackConfig;
