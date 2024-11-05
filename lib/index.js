import fs from 'fs';
import { Transform } from 'node:stream';
import { spec as Spec } from 'node:test/reporters';
import { CoverageReport } from 'monocart-coverage-reports';

const dataDir = '.coverage';
process.env.NODE_V8_COVERAGE = dataDir;

const mcr = new CoverageReport({
    cleanCache: true,
    dataDir
});

const cleanCoverage = () => {
    if (fs.existsSync(dataDir)) {
        fs.rmSync(dataDir, {
            recursive: true,
            force: true,
            maxRetries: 10
        });
    }
};

cleanCoverage();

const baseReporter = new Spec();

const mcrReporter = new Transform({
    writableObjectMode: true,
    async transform(event, encoding, callback) {
        baseReporter._transform(event, encoding, callback);

        // https://nodejs.org/docs/latest/api/test.html#test-reporters
        const type = event.type;
        // console.log('[MCR]', type);

        // global teardown
        if (type === 'test:diagnostic' && event.data.message.includes('duration_ms')) {

            await mcr.loadConfig();
            await mcr.generate();

            cleanCoverage();

        }

    }
});

export default mcrReporter;
