var path = require('path')

const { override, babelInclude } = require('customize-cra');

module.exports = function (config, env) {
  return Object.assign(
    config,
    override(
      babelInclude([
        /* transpile (converting to es5) code in src/ and shared component library */
        path.resolve('src'),
        path.resolve('../components'),
        path.resolve('../types'),
        path.resolve('../utilities'),
        path.resolve('../fakedata'),
        path.resolve('../cxapi'),
      ])
    )(config, env)
  )
}