
import test from 'node:test';
import assert from 'node:assert';

import {
    foo, bar, app
} from '../src/app.js';

test('foo bar', (t) => {
    foo();
    bar();
    
    assert.strictEqual(1, 1);
});

test('app', (t) => {
    app();
});
