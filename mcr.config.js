export default {
    // logging: 'debug',
    name: 'My Note Coverage Report',

    reports: [
        'console-details',
        'v8'
    ],

    onEnd: (results) => {
        console.log(`coverage report generated: ${results.reportPath}`);
    }
};
