const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const share = mf.share;
const sharedMappings = new mf.SharedMappings();

const microfrontendWebpackConfig = {
  output: {
    publicPath: 'auto',
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
      name: 'mfes',
      exposes: {},
      shared: share({
        '@angular/core': {
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto',
          includeSecondaries: {
            skip: ['@angular/core/testing'],
          },
        },
        '@angular/common': {
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto',
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
// console.log('microfrontendWebpackConfig:::', microfrontendWebpackConfig);
// console.log(
//   'ModuleFederationPlugin options:::',
//   // @ts-ignore
//   microfrontendWebpackConfig.plugins[0]._options,
// );

module.exports = microfrontendWebpackConfig;
