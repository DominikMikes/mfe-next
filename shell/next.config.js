const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config, options) {
    const { webpack } = options;
    Object.assign(config.experiments, { topLevelAwait: true });
    if (!options.isServer) {
      //config.cache=false
      config.plugins.push(
        new NextFederationPlugin({
          name: 'checkout',
          remotes: {
            mfe1: `mfe1@http://localhost:3002/_next/static/chunks/remoteEntry.js`
          },
          filename: 'static/chunks/remoteEntry.js',
          exposes: {},
          shared: {},
        }),
      );
    }

    return config;
  },
};