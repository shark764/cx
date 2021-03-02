const axios = require('axios');

exports.OpenApi = class OpenApi {

  constructor(openApiSpecification, authToken) {

    this.openApiSpecification = openApiSpecification,
    // this.headers = { headers: { authorization: authToken } },
    this.headers = { auth: { username: '', password: '' } },
    this.baseUrl = `${openApiSpecification.protocol}://${openApiSpecification.host}${openApiSpecification.basePath}`,

    this.apiMethods = {
      get: ({ path, qs }) => axios({ ...this.headers, method: 'GET', url: this.url(path), qs }, this.parse),
      put: ({ path, body }) => axios({ ...this.headers, method: 'PUT', url: this.url(path), body, json: true }, this.parse),
      post: ({ path, body }) => axios({ ...this.headers, method: 'POST', url: this.url(path), body, json: true }, this.parse),
      delete: ({ path }) => axios({ ...this.headers, method: 'DELETE', url: this.url(path) }, this.parse),
    },

    this.api = Object.entries(openApiSpecification.paths)
      .reduce((functions, [path, methods]) => ({
      ...functions,
      ...Object.entries(methods).reduce((functions, [action, methodDetails]) => ({
        ...functions,
        [this.parseSummary(methodDetails.summary)]: this.apiFunctionBody(action, path, methodDetails)
      }), {})
    }), {})

  }

  parseSummary(summary) {
    if (!summary) {return;}
    const withoutPeriods = summary.split('.').join('');
    const withoutSpaces = withoutPeriods.trim().split(' ').join('_');
    return withoutSpaces.toLowerCase();
  }

  parse(err, res) {
    if (err) throw new Error(err);
    return (typeof res === 'string') ? JSON.parse(res) : res
  };

  url(path) { return `${this.baseUrl}${path}` };

  pathWithParamsTransposed(path, pathParams) {
    return `/${path.substring(1).split('/').map(node =>
      (node.charAt(0) === '{') ? pathParams[node.slice(1, node.length - 1)] : node
    ).join('/')
      }`
  };

  paramValidations(methodDetails, body, pathParams, queryString) {
    return true; // TODO: console log to the user when passed params dont match specifications
  };

  apiFunctionBody(action, path, methodDetails) {
    if (action === 'parameters') { return ;}
    return ({ pathParams, queryString, body }) =>
      this.paramValidations(methodDetails, pathParams, queryString, body) &&
      this.apiMethods[action]({
        path: this.pathWithParamsTransposed(path, pathParams),
        body: body,
        qs: queryString,
      });
  }

  listMethods() { console.log(Object.keys(this.api).filter(x => x != 'undefined')) };

};