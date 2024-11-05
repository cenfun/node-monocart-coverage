import { describe, it } from 'node:test';
import assert from 'node:assert';

import { foo } from '../src/app.js';


describe('group 2', () => {
    it('foo', (t) => {
        foo();

        assert.strictEqual(1, 1);
    });
});
