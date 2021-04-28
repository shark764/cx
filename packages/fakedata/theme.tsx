const theme = {};
export const fetchTheme = () => new Promise((resolve, reject) => {
  if (!theme) {
    return setTimeout(() => reject(new Error('Theme not found')), 100);
  }

  return setTimeout(() => resolve({ data: theme }), 100);
});
// https://staging-api.cxengagelabs.net/v1/tenants/d676b68b-2f1c-498c-b6b3-db7e3a3e5708/branding
const temp  = {"result":{
  "logo":null,
  "updated":"2018-08-08T22:00:18Z",
  "favicon":null,
  "productName":"CxEngage",
  "updatedBy":"6fe5e430-9b56-11e8-9e38-9440dab83f25",
  "active":true,
  "styles":"{\"navbar\": \"#07487a\",\"navbarText\": \"#ffffff\",\"primaryColor\": \"#07487a\",\"accentColor\": \"#3498db\",\"accentHoverColor\": \"#e6f5ff\"}",
  "tenantId":"44720170-922b-11e6-8754-ca81484488df"}};

const colors = JSON.stringify(temp.result.styles);

// https://staging-api.cxengagelabs.net/v1/tenants/d676b68b-2f1c-498c-b6b3-db7e3a3e5708/protected-brandings
const tempo2 = {"result":[
  {
    "key":"productName",
    "updated":"2018-07-10T22:16:49Z",
    "value":"CxEngage",
    "created":"2018-07-10T22:16:49Z",
    "updatedBy":"f0d232d0-848e-11e8-9e38-9440dab83f25",
    "createdBy":"f0d232d0-848e-11e8-9e38-9440dab83f25",
    "active":true,
    "tenantId":"44720170-922b-11e6-8754-ca81484488df"
  }]}