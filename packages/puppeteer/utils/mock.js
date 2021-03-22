exports.enableApiMockingAndRefreshPage = (pagePath, mockMap = []) => {
  return async () => {
    await page.setRequestInterception(true);
    page.on('request', request => {
      if (mockMap.find(({url}) => request.url().includes(url))) {
        request.respond({
          content: 'application/json',
          headers: { "Access-Control-Allow-Origin": "*" },
          body: JSON.stringify({ mocked_api_data: 'hello from puppeteer!!' })
        });
      } else {
        request.continue();
      };
    });

    await page.goto(pagePath);
  };
};