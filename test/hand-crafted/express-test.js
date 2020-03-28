const json2xls = require('../../src')

const express = require('express')
const app = express()

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

app.use(json2xls.middleware);

app.get('/', function (req, res) {
    res.xls('data.xlsx', jsonArr);
});
app.listen(3000)
