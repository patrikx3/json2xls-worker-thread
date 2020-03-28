const {
    Worker, isMainThread, parentPort, workerData
} = require('worker_threads');

// this is in the main thread
if (isMainThread) {

    const transform = async (data, options) => {

        options = options || {}

        if (!options.hasOwnProperty('output')) {
            options.output = 'binary'
        }
        if (!options.hasOwnProperty('nodeExcel')) {
            options.nodeExcel = undefined
        }

        const workerResult = await new Promise((resolve, reject) => {
            const worker = new Worker(__filename, {
                workerData: {
                    data: data,
                    options: options,
                }
            });
            worker.on('message', resolve);
            worker.on('error', reject);
            worker.on('exit', (code) => {
                if (code !== 0) {
                    reject(new Error(`Worker stopped with exit code ${code}`));
                }
                worker.terminate()
            });
        });
        return workerResult
    };

    transform.middleware = function(req, res, next) {
        res.xls = async (filename, data, config) => {
            const xls = await transform(data, config);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats');
            res.setHeader("Content-Disposition", "attachment; filename=" + filename);
            res.end(xls, 'binary');
        };
        next();
    };

    module.exports = transform

} else {

    if (typeof workerData.options.output !== 'string' && workerData.options.output !== 'binary' && workerData.options.output !== 'base64') {
        throw new Error(`The p3x-json2xls-worker-thread output can be 'binary' or 'base64', you requested ${workerData.options.output}, which is wrong.`)
    }

    const json2xls = require('./util');
    const xls = json2xls(workerData.data, workerData.options.nodeExcel);

    if (workerData.options.output === 'base64') {
        const xlsBase64 = Buffer.from(xls, 'binary').toString('base64');
        parentPort.postMessage(xlsBase64)
    } else {
        parentPort.postMessage(xls)
    }


}

