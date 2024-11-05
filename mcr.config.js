export default {
    // logging: 'debug',
    name: 'My Note Coverage Report',

    reports: [
        'console-details',
        'v8',
        'v8-json',
        'codecov'
    ],

    onEnd: (results) => {
        console.log(`coverage report generated: ${results.reportPath}`);
    }
};
