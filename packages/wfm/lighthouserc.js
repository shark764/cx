module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      /* Add configuration here */
      staticDistDir: './dist',
      // startServerCommand: 'npm run lighthouse',
      url: ['http://localhost:8080'],
      isSinglePageApplication: true,
    },
    upload: {
      /* Add configuration here */
      target: 'temporary-public-storage',
    },
  },
};
