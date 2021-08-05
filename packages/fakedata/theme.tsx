const theme = {
  result: {
    logo: null,
    updated: '2018-08-08T22:00:18Z',
    favicon: null,
    productName: 'CxEngage',
    updatedBy: '6fe5e430-9b56-11e8-9e38-9440dab83f25',
    active: true,
    styles:
      // eslint-disable-next-line max-len
      '{"navbar": "#2a2af0","navbarText": "#ffffff","primaryColor": "#2a2af0","accentColor": "#3498db","accentHoverColor": "#e6f5ff"}',
    tenantId: '44720170-922b-11e6-8754-ca81484488df',
  },
};
// https://staging-api.cxengagelabs.net/v1/tenants/d676b68b-2f1c-498c-b6b3-db7e3a3e5708/branding
export const fetchTheme = () => new Promise((resolve, reject) => {
  if (!theme) {
    return setTimeout(() => reject(new Error('Theme not found')), 100);
  }

  return setTimeout(() => resolve({ data: theme }), 100);
});
