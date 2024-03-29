const assert = require('assert');

const data = require('../fixtures/array-data')
const json2xls = require('../../src')

describe('generate-xls', () => {
    it('check binary', async () => {

        const xlsBinary = await json2xls(data)
        assert.ok(xlsBinary.slice(0, 2) === 'PK')

    })

    it('check base64', async () => {

        const xlsBase64 = await json2xls(data, {
            output: 'base64'
        })
        assert.ok(xlsBase64 === Buffer.from(xlsBase64, 'base64').toString('base64'))

    })


    it('check base64 sync', () => {

        const xlsBase64 = json2xls.sync(data, {
            output: 'base64'
        })
        assert.ok(xlsBase64 === Buffer.from(xlsBase64, 'base64').toString('base64'))

    })
})
