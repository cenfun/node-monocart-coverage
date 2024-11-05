# Node Monocart Coverage

[![](https://img.shields.io/npm/v/node-monocart-coverage)](https://www.npmjs.com/package/node-monocart-coverage)
[![](https://badgen.net/npm/dw/node-monocart-coverage)](https://www.npmjs.com/package/node-monocart-coverage)
![](https://img.shields.io/github/license/cenfun/node-monocart-coverage)


> Generating native V8 coverage reports for [Node test runner](https://nodejs.org/docs/latest/api/test.html) with [Monocart coverage reports](https://github.com/cenfun/monocart-coverage-reports)

## Install
```sh
npm i node-monocart-coverage -D
```

## Usage
```sh
node --test-reporter=node-monocart-coverage --test
```

## Config file for Coverage Options 

- mcr.config.js
- mcr.config.cjs
- mcr.config.mjs
- mcr.config.json
- mcr.config.ts

See config example [mcr.config.js](./mcr.config.js)
```js
// mcr.config.js
export default {
    // logging: 'debug',
    name: 'My Node Test Coverage Report',

    reports: [
        'console-details',
        'v8',
        'codecov'
    ],

    onEnd: (results) => {
        console.log(`coverage report generated: ${results.reportPath}`);
    }
};

```
See [monocart-coverage-reports](https://github.com/cenfun/monocart-coverage-reports) for more coverage options.

## Changelog

- [CHANGELOG.md](CHANGELOG.md)