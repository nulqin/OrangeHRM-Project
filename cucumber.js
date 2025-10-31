module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      'src/steps/**/*.ts',
      'src/hooks/**/*.ts'
    ],
    format: [
      'progress',
      'html:test-results/cucumber-report.html',
      'json:test-results/cucumber-report.json'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    publishQuiet: true
  }
}