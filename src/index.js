const { Worker } = require('worker_threads');

const ensureOptions = (options) => {
    options = options || {}

    if (!options.hasOwnProperty('output')) {
        options.output = 'binary'
    }
    if (!options.hasOwnProperty('nodeExcel')) {
        options.nodeExcel = undefined
    }


    if (typeof options.output !== 'string' || (options.output !== 'binary' && options.output !== 'base64')) {
        throw new Error(`The p3x-json2xls-worker-thread options.output can be 'binary' or 'base64', you requested '${options.output}', which is wrong.`)
    }

    return options
}

const transform = async (data, options) => {

    options = ensureOptions(options)

    const workerResult = await new Promise((resolve, reject) => {
        const worker = new Worker(`${__dirname}/json2xls.worker.js`, {
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
    res.xls = async (filename, data, options) => {
        try {
            options = options || {}
            options.output = 'binary';
            options = ensureOptions(options)
            const xls = await transform(data, options);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats');
            res.setHeader("Content-Disposition", "attachment; filename=" + filename);
            res.end(xls, 'binary');
        } catch(e) {
            res.status(500).send({
                status: 'error',
                ok: false,
                message: e.message
            })
        }
    };
    next();
};

transform.sync = (data, options) => {
    const json2xls = require('./util');
    options = ensureOptions(options)
    const xls = json2xls(data, options.nodeExcel);
    if (options.output === 'base64') {
        const xlsBase64 = Buffer.from(xls, 'binary').toString('base64');
        return xlsBase64
    } else {
        return xls
    }
}

module.exports = transform


