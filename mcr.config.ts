import { CoverageReportOptions} from "monocart-coverage-reports"

// https://github.com/cenfun/monocart-coverage-reports
const coverageOptions: CoverageReportOptions = {

    name: 'My Playwright Coverage Report',

    // Added to make coverage reporter check for every file, even untested files.
    all: './src',
    logging:'debug',
    reports: [
        'console-details',
        'v8',
        "lcovonly",
        ['json', {
            file: 'coverage_report.json'
        }]
    ],

    entryFilter: {
         '**/node_modules/**': false,
         '**/src/**': false,
         '**/_next/**': false,    
    },

    sourceFilter: {
         '**/node_modules/**': false,
         '**/src/**': true,
         '**/_next/**': false
    },
    outputDir: './coverage'
}

export default coverageOptions