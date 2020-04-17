const nodeExcel = require('excel-export')
const objectPath = require('object-path')

const transform = function (json, config) {
    const conf = transform.prepareJson(json, config)
    const result = nodeExcel.execute(conf)
    return result
}

// get a xls type based on js type
function getType (obj, type) {
    if (type) {
        return type
    }
    const t = typeof obj
    switch (t) {
        case 'string':
        case 'number':
            return t
        case 'boolean':
            return 'bool'
        default:
            return 'string'
    }
}

// get a nested property from a JSON object given its key, i.e 'a.b.c'
function getByString (object, path) {
    path = path.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
    path = path.replace(/^\./, '') // strip a leading dot
    const defaultValue = object[path] || null
    return objectPath.get(object, path, defaultValue)
}

// prepare json to be in the correct format for excel-export
transform.prepareJson = function (json, config) {
    const res = {}
    const conf = config || {}
    const jsonArr = [].concat(json)
    let fields = conf.fields || Object.keys(jsonArr[0] || {})
    let types = []
    if (!(fields instanceof Array)) {
        types = Object.keys(fields).map(function (key) {
            return fields[key]
        })
        fields = Object.keys(fields)
    }
    // cols
    res.cols = fields.map(function (key, i) {
        return {
            caption: key,
            type: getType(jsonArr[0][key], types[i]),
            beforeCellWrite: function (row, cellData, eOpt) {
                eOpt.cellType = getType(cellData, types[i])
                return cellData
            }
        }
    })
    // rows
    res.rows = jsonArr.map(function (row) {
        return fields.map(function (key) {
            let value = getByString(row, key)
            // stringify objects
            if (value && value.constructor === Object) value = JSON.stringify(value)
            // replace illegal xml characters with a square
            // see http://www.w3.org/TR/xml/#charsets
            // #x9 | #xA | #xD | [#x20-#xD7FF] | [#xE000-#xFFFD] | [#x10000-#x10FFFF]
            if (typeof value === 'string') {
                // eslint-disable-next-line no-control-regex
                value = value.replace(/[^\u0009\u000A\u000D\u0020-\uD7FF\uE000-\uFFFD\u10000-\u10FFFF]/g, '')
            }
            return value
        })
    })
    // add style xml if given
    if (conf.style) {
        res.stylesXmlFile = conf.style
    }
    return res
}

/*
transform.middleware = function (req, res, next) {
    res.xls = function (fn, data, config) {
        const xls = transform(data, config)
        res.setHeader('Content-Type', 'application/vnd.openxmlformats')
        res.setHeader('Content-Disposition', 'attachment filename=' + fn)
        res.end(xls, 'binary')
    }
    next()
}
 */

module.exports = transform
