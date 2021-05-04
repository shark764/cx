const path = require('path');

const { override, babelInclude } = require('customize-cra');

module.exports = function (config, env) {
  return Object.assign(
    config,
    override(
      babelInclude([
        path.resolve('src'),
        path.resolve('../components'),
        path.resolve('../fakedata'),
        path.resolve('../types'),
        path.resolve('../utilities'),
        path.resolve('../cxapi'),
      ])
    )(config, env)
  );
};
