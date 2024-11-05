import fs from 'fs';
// import { Transform } from 'node:stream';
import { spec } from 'node:test/reporters';
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

class MCRReporter extends spec {
    constructor() {
        super({
            writableObjectMode: true
        });

        cleanCoverage();

        const super__transform = this._transform.bind(this);

        this._transform = async function(event, _encoding, callback) {
            const res = await super__transform(event, _encoding, callback);

            // https://nodejs.org/docs/latest/api/test.html#test-reporters
            const type = event.type;
            // console.log('[MCR]', type);
            if (type === 'test:plan') {
                // Emitted when all sub tests have completed for a given test.
                // This event is guaranteed to be emitted in the same order as the tests are defined.

                const mcr = new CoverageReport({
                    cleanCache: true,
                    dataDir
                });

                await mcr.loadConfig();
                await mcr.generate();

                cleanCoverage();
            }

            return res;
        };

    }

}

export default MCRReporter;
