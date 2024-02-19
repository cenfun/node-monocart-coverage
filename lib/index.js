import { Transform } from 'node:stream';

const customReporter = new Transform({
  writableObjectMode: true,
  transform(event, encoding, callback) {
    switch (event.type) {
      case 'test:dequeue':
        callback(null, `test ${event.data.name} dequeued\n`);
        break;
      case 'test:enqueue':
        callback(null, `test ${event.data.name} enqueued\n`);
        break;
      case 'test:watch:drained':
        callback(null, 'test watch queue drained');
        break;
      case 'test:start':
        callback(null, `test ${event.data.name} started\n`);
        break;
      case 'test:pass':
        callback(null, `test ${event.data.name} passed\n`);
        break;
      case 'test:fail':
        callback(null, `test ${event.data.name} failed\n`);
        break;
      case 'test:plan':
        callback(null, 'test plan\n');
        break;
      case 'test:diagnostic':
      case 'test:stderr':
      case 'test:stdout':
        callback(null, event.data.message+"\n");
        break;
      case 'test:coverage': {
        const { totalLineCount } = event.data.summary.totals;

        console.log(event.data)

        // event.data.summary.files.forEach(file=> {
        //     console.log("functions",file.functions)
        //     console.log("branches", file.branches)
        //     console.log("lines", file.lines)
        // })

        callback(null, `total line count: ${totalLineCount}\n`);
        break;
      }
    }
  },
});

export default customReporter;