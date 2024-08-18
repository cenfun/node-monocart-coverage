import test from 'node:test';
import assert from 'node:assert';

import { foo } from '../src/app.js';

test('foo', (t) => {
    foo();

    assert.strictEqual(1, 1);
});
