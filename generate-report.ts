import reporter from 'cucumber-html-reporter';

const options = {
  theme: 'bootstrap' as const, // <-- usa 'as const' para que TypeScript lo trate como literal
  jsonFile: 'reports/cucumber_report.json',
  output: 'reports/cucumber_report.html',
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "Project": "Restful Booker API Automation",
    "Platform": process.platform,
    "Executed": "Local"
  }
};

reporter.generate(options);