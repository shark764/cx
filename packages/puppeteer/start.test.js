const { enableApiMockingAndRefreshPage } = require('./utils/mock');

const endpointsToMock = [
  {url: 'http://us-east-1-staging-wfm-cx-forecast.cxengagelabs.net/tenants/00000000-0000-0000-0000-000000000000/competencies/00000000-0000-0000-0000-000000000000/historical', data: { mocked_api_data: 'hello from puppeteer!!' }}
];

describe('Forecasting', () => {
  beforeAll(enableApiMockingAndRefreshPage('http://localhost:3000/#/forecasting', endpointsToMock))



  it('choosing week view show the week forecast ', async () => {

    page.emulate({
      viewport: {
        width: 1000,
        height: 900
      },
      userAgent: ''
    });


    await page.waitForSelector('.choose-date');
    await page.click('.choose-date');

    await page.waitForSelector('.choose-date-select__option');
    await page.click('.choose-date-select__option')[0];



    await expect(page.title()).resolves.toMatch('Workforce Management');
    // await page.waitForTimeout(50000);
  });


});