const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config, options) {
    const { webpack } = options;
    Object.assign(config.experiments, { topLevelAwait: true });
    if (!options.isServer) {
      //config.cache=false
      config.plugins.push(
        new NextFederationPlugin({
          name: 'mfe1',
          remotes: {},
          filename: 'static/chunks/remoteEntry.js',
          exposes: {
            './title': './src/components/title.js',
          },
          shared: {},
        }),
      );
    }

    return config;
  },
};