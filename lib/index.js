import fs from 'fs';
import { Transform } from 'node:stream';
import { CoverageReport } from 'monocart-coverage-reports';

const dataDir = '.coverage';
process.env.NODE_V8_COVERAGE = dataDir;

const cleanCoverage = () => {
    if (fs.existsSync(dataDir)) {
        fs.rmSync(dataDir, {
            recursive: true,
            force: true,
            maxRetries: 10
        });
    }
};

class MCRReporter extends Transform {
    constructor() {
        super({
            writableObjectMode: true
        });
        cleanCoverage();
    }

    async generateCoverage(callback) {
        const mcr = new CoverageReport({
            cleanCache: true,
            dataDir
        });

        await mcr.loadConfig();
        await mcr.generate();

        cleanCoverage();

        return callback(null);
    }

    // https://nodejs.org/docs/latest/api/test.html#test-reporters
    _transform(event, _encoding, callback) {
        const type = event.type;
        // console.log('[MCR]', type);
        if (type === 'test:plan') {
            // Emitted when all subtests have completed for a given test.
            // This event is guaranteed to be emitted in the same order as the tests are defined.
            return this.generateCoverage(callback);
        }
        return callback(null);
    }
}

export default new MCRReporter();
