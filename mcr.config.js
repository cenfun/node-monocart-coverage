export default {
    logging: 'debug',
    name: 'My Note Coverage Report',

    reports: [
        'console-details',
        'v8-json',
        'v8',
        'codecov'
    ],

    onEnd: (results) => {
        console.log(`coverage report generated: ${results.reportPath}`);
    }
};
