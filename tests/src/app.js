function foo(argument) {
    console.log('this is foo');

    if (argument) {
        console.log('covered foo argument');
    }
}

function bar(argument) {
    console.log('this is bar');

    if (argument) {
        console.log('covered bar argument');
    }
}

const a = () => {};

(function() {})();

function app() {
    console.log('this is app');
}

if (global.a) {
    console.log('a');
}

for (let i = 0; i < 5; i++) {
    if (i > 2) {
        console.log(i);
    } else if (global.b) {
        console.log('b');
    }
}

export {
    app,
    foo,
    bar
};
