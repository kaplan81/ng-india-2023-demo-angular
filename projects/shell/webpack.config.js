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
        mfes: 'http://localhost:4201/remoteEntry.js',
      },
      /**
       * All modules and libraries are singleton and shared by default.
       * The `share` property in the Webpack configuration for the Module Federation plugin
       * allows you to customize and control how the sharing behavior is applied,
       * and specify any additional runtime dependencies that may be required.
       *
       * For example in this case we need to set these 2 packages to true to that the
       * shell app loads them eagerly and not lazily when the component requetsts them.
       * If that would happen you would get a null injector error for dependencies that must be
       * initialized when an Angular app starts, that are containes in thsese pacakges.
       *
       * We will apply the same `share` configuration to the micfrofrontends.
       */
      shared: share({
        '@angular/core': {
          /**
           * We we requiere same packages but different versions,
           * Webpack automatically loads both if there are breaking changes between the 2.
           * However, if you wanna risk it and still load only one of them,
           * you can set this property to true.
           * You will still get a warning in the console if a module requests an unsatisfied version.
           */
          singleton: true,
          /**
           * But if you want those breaking changes to shout out at you
           * (e.g. lib requieres version 1 but we are only loading version 2),
           * you might be interested in getting an error instead of a warning
           * by setting `strictVersion` to true.
           */
          strictVersion: true,
          /**
           * This defines the version range.
           * By default (auto) Webpack takes the
           * highest version compatible with both modules.
           */
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
