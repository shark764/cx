module.exports = {
  launch: {
    // headless: process.env.HEADLESS !== 'false',
    // slowMo: process.env.SLOWMO ? process.env.SLOWMO : 0,
    headless: false,
    slowMo: 0,
    devtools: false,
    args: [
      '--disable-web-security',
    ],
  }
}