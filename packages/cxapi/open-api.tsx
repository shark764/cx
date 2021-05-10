import axios from 'axios';

export interface ApiParams {
  pathParams: PathParms;
  queryString: QueryString;
  body: Body;
}
export interface PathParms {
  [key: string]: string;
}
export interface QueryString {
  [key: string]: string;
}
export type Body = unknown;

export class OpenApi {
  openApiSpecification: unknown;
  headers: any;
  baseUrl: string;
  apiMethods: any;
  api: any;

  constructor(openApiSpecification: any, authToken: string) {

    this.openApiSpecification = openApiSpecification,
    // this.headers = { headers: { authorization: authToken } },
    this.headers = {

      'x-cx-auth-tenant': '["CXWFM_FORECAST_READ", "CXWFM_FORECAST_WRITE"]',
      'x-cx-auth-platform': '[""]',
    },
    this.baseUrl = `${openApiSpecification.protocol}://${openApiSpecification.host}${openApiSpecification.basePath}`,

    this.apiMethods = {
      // @ts-ignore
      get: ({ path, qs }) => axios({ headers: this.headers, method: 'GET', url: this.url(path) + this.parseQueryString(qs) }, this.parse),
      // @ts-ignore
      put: ({ path, body }) => axios({ headers: this.headers, method: 'PUT', url: this.url(path), data: body, json: true }, this.parse),
      // @ts-ignore
      post: ({ path, body }) => axios({ headers: this.headers, method: 'POST', url: this.url(path), data: body, json: true }, this.parse),
      // @ts-ignore
      delete: ({ path }) => axios({ headers: this.headers, method: 'DELETE', url: this.url(path) }, this.parse),
    },

    this.api = Object.entries(openApiSpecification.paths)
      .reduce((functions, [path, methods]: any) => ({
      ...functions,
      ...Object.entries(methods).reduce((functions, [action, methodDetails]: any) => ({
        ...functions,
        [methodDetails.operationId]: this.apiFunctionBody(action, path)
      }), {})
    }), {})

  }

  parseSummary(summary: string): string {
    if (!summary) {return '';}
    const withoutPeriods = summary.split('.').join('');
    const withoutSpaces = withoutPeriods.trim().split(' ').join('_');
    return withoutSpaces.toLowerCase();
  }

  parseQueryString(queryString: any = {}): string {
    const qs = Object.keys(queryString).map((key) => `${key}=${queryString[key]}`).join('&');
    return `?${qs}`;
  }

  parse(err: any, res: any): any {
    if (err) throw new Error(err);
    return (typeof res === 'string') ? JSON.parse(res) : res
  };

  url = (path: string): string =>`${this.baseUrl}${path}`;

  pathWithParamsTransposed(path: string, pathParams: PathParms): string {
    return `/${path.substring(1).split('/').map(node =>
      (node.charAt(0) === '{') ? pathParams[node.slice(1, node.length - 1)] : node
    ).join('/')
      }`
  };

  apiFunctionBody(action: string, path: string): any {
    return ({ pathParams, queryString, body }: ApiParams) =>
      this.apiMethods[action]({
        path: this.pathWithParamsTransposed(path, pathParams),
        body: JSON.stringify(body),
        qs: queryString,
      });
  }

  listMethods(): void { console.log(Object.keys(this.api).filter(x => x != 'undefined')) };

};
