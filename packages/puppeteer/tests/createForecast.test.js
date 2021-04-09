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

    const clickLots = (total, selector) => {
      new Array(total)
        .fill(selector)
        .forEach(async (selector) => {
          await page.click(selector);
        })
    }

    // Start with a forecast range in the future
    // Needs to start on a monday and end on sunday!
    await page.type('.forecastRangestartDate', '2021-05-03');
    await page.keyboard.press('Enter');
    clickLots(3, '.forecastRange-increment');


    // Choose the range you want to look at historically
    // In this example lets take all data fromthe past year until now
    await page.type('.dayValueDateRangesstartDate', '2020-01-01');
    await page.keyboard.press('Enter');
    clickLots(54, '.dayValueDateRanges-increment');


    await page.click('.Range-range');

    // set the day curve range, for this we'll choose the month of may
    await page.type('.dayCurveDateRangestartDate', '2021-03-08');
    await page.keyboard.press('Enter');
    clickLots(3, '.dayCurveDateRange-increment');


    // For now we've hard coded some series date when the form submits

    await page.click('.dynamicFormSave');
    // await page.click('.dynamicFormCancel');

    await page.waitForTimeout(300000);
  });


});