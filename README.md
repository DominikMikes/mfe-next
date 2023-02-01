# Next.js 13 with Module Federation
This project was created with `npx create-next-app`.<br>
It uses Nextjs Module Federation package [`@module-federation/nextjs-mf`](https://www.npmjs.com/package/@module-federation/nextjs-mf)<br>
Using [concurrently](https://www.npmjs.com/package/concurrently) npm package to start multiple applications at once. 

## Getting Started
-  run `npm run start` to start shell and remote application in dev mode.
- run `npm run build` to build shell and remote application
- run `npm run serve` to start shell and rmeote application.

## Context
We have one shell application which dynamically loads the exposed components from the remote application.
 - `shell` - port 3000
 - `remote` - port 3002

## How it works
Module federation uses webpack to generate a `remoteEntry.js` which holds all exposed objects from remote applications. Due to the use of Next.js this config is included in the `next.config.js` (usally it is covered in the `webpack.config.js`) Example config:<br>
```javascript
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
            // all exposed objects from listed remotes can be used in this app
            //remote: `remote@http://localhost:3002/_next/static/chunks/remoteEntry.js`
          },
          filename: 'static/chunks/remoteEntry.js',
          exposes: {
            // all exposed objects are available for other apps
            //'./component': './src/components/component.js',
          },
          shared: {},
        }),
      );
    }

    return config;
  },
};
```