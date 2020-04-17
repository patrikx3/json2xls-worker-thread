const json2xls = require('../../src')
const fs = require('fs').promises

const jsonArr = [
    {
        foo: 'bar',
        qux: 'moo',
        poo: 123,
        stux: new Date()
    },
    {
        foo: 'bar',
        qux: 'moo',
        poo: 345,
        stux: new Date()
    }
];

const executeAsync = async() => {
    try {
        const data = json2xls.sync(jsonArr);
        await fs.writeFile(`${process.cwd()}/test.xls`, data,  'binary')
    } catch(e) {
        console.error(e)
    }
}

executeAsync()
