module.exports = {
  launch: {
    // headless: process.env.HEADLESS !== 'false',
    // slowMo: process.env.SLOWMO ? process.env.SLOWMO : 0,
    // executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: false,
    slowMo: 0,
    devtools: false,
    args: [
      '--disable-web-security',
    ],
  }
}