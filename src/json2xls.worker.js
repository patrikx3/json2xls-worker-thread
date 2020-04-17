const { parentPort, workerData } = require('worker_threads');

const json2xls = require('./util');
const xls = json2xls(workerData.data, workerData.options.nodeExcel);

if (workerData.options.output === 'base64') {
    const xlsBase64 = Buffer.from(xls, 'binary').toString('base64');
    parentPort.postMessage(xlsBase64)
} else {
    parentPort.postMessage(xls)
}
