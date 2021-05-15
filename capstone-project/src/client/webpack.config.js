const webpackMerge = require('webpack-merge');

const commonConfig = require('./webpack/webpack.base');

module.exports = (env) => {
  const envConfig = !env.mode ? require('./webpack/webpack.development') : require(`./webpack/webpack.${env.mode}`);

  return webpackMerge({ mode: env.mode }, commonConfig, envConfig);
};
