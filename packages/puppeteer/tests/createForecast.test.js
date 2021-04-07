const { enableApiMockingAndRefreshPage } = require('../utils/mock');

const endpointsToMock = [
  {url: 'http://us-east-1-staging-wfm-cx-forecast.cxengagelabs.net/tenants/00000000-0000-0000-0000-000000000000/competencies/00000000-0000-0000-0000-000000000000/historical', data: { mocked_api_data: 'hello from puppeteer!!' }}
];

describe('Forecasting', () => {
  beforeAll(enableApiMockingAndRefreshPage('http://localhost:3000/#/forecasting', endpointsToMock))



  it('choosing week view show the week forecast zzz', async () => {

    page.emulate({
      viewport: {
        width: 1000,
        height: 900
      },
      userAgent: ''
    });

    await page.waitForSelector('.createForecast');
    await page.click('.createForecast');

    //     await page.waitForSelector('.choose-date');
    //     await page.click('.choose-date');

    //     await page.waitForSelector('.choose-date-select__option');
    //     await page.click('.choose-date-select__option')[0];



    //     await expect(page.title()).resolves.toMatch('Workforce Management');
    //     await page.waitForTimeout(50000);
    //   });
    await page.type('.name', 'Test Forecast', {delay: 0});
    await page.type('.description', 'Test Forecast', {delay: 0});

    await page.type('.startDate', 'Feb 01, 2021', {delay: 0});
    await page.type('.endDate', 'Feb 02, 2021', {delay: 0});

    await page.type('.dayValueDateRangesstartDate0', 'Jan 20, 2021', {delay: 0});
    await page.type('.dayValueDateRangesendDate0', 'Jan 26, 2021', {delay: 0});

    await page.type('.dayCurveDateRangestartDate', 'Jan 20, 2021', {delay: 0});
    await page.type('.dayCurveDateRangeendDate', 'Jan 26, 2021', {delay: 0});

    await page.type('.series_competency', '64e27f30-7dd9-11e7-9441-d379301ec11d', {delay: 0});
    await page.type('.series_channel', 'voice', {delay: 0});
    await page.type('.series_direction', 'inbound', {delay: 0});

    // await page.click('.dynamicFormSave');
    await page.click('.dynamicFormCancel');


    await expect(page.title()).resolves.toMatch('Workforce Management');
    await page.waitForTimeout(300000);
  });


});