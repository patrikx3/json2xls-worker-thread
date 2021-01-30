[//]: #@corifeus-header

[![NPM](https://nodei.co/npm/p3x-json2xls-worker-thread.png?downloads=true&downloadRank=true)](https://www.npmjs.com/package/p3x-json2xls-worker-thread/)

  

[![Donate for Corifeus / P3X](https://img.shields.io/badge/Donate-Corifeus-003087.svg)](https://paypal.me/patrikx3) [![Contact Corifeus / P3X](https://img.shields.io/badge/Contact-P3X-ff9900.svg)](https://www.patrikx3.com/en/front/contact) [![Corifeus @ Facebook](https://img.shields.io/badge/Facebook-Corifeus-3b5998.svg)](https://www.facebook.com/corifeus.software)  [![Build Status](https://api.travis-ci.com/patrikx3/json2xls-worker-thread.svg?branch=master)](https://travis-ci.com/patrikx3/json2xls-worker-thread)
[![Uptime Robot ratio (30 days)](https://img.shields.io/uptimerobot/ratio/m780749701-41bcade28c1ea8154eda7cca.svg)](https://uptimerobot.patrikx3.com/)





# 📈 Convert JSON to Excel XLSX with offloading the constructing the data using a worker thread v2021.4.103



**Bugs are evident™ - MATRIX️**
    

### NodeJs LTS Version Requirement
```txt
>=12.13.0
```

### Built on NodeJs
```txt
v14.15.4
```

The ```async``` and ```await``` keywords are required. Only the latest LTS variant is supported.

Install NodeJs:
https://nodejs.org/en/download/package-manager/



# Description

                        
[//]: #@corifeus-header:end


Utility to convert json to an excel file, based on [Node-Excel-Export](https://github.com/functionscope/Node-Excel-Export) using a worker thread by not blocking the NodeJs event loop using `async` functions and options.

  
This is a totally fork of the [json2xls](https://github.com/rikkertkoppes/json2xls), but the XLSX constructing can be CPU intensive so we are offloading the XLSX constructing using a worker thread.

  
Of course, when using a worker thread, the execution is about 20-25ms longer, than when we are in the event loop, so the worker thread is valid when we are generating a big dataset.
 
# Installation

```bash
npm install p3x-json2xls-worker-thread
```

# Usage

Use to save as file:

```js
const json2xls = require('p3x-json2xls-worker-thread')
const fs = require('fs').promises

const json = {
    foo: 'bar',
    qux: 'moo',
    poo: 123,
    stux: new Date()
}
const executAsync = async() => {    
    try {
        // 
        let nodeExcelOptions = undefined
        
        /*
        The following options are supported:       
            - style: a styles xml file, see <https://github.com/functionscope/Node-Excel-Export>
            - fields: either an array or map containing field configuration:
                - array: a list of names of fields to be exported, in that order
                - object: a map of names of fields to be exported and the types of those fields. Supported types are 'number','string','bool'
        */
        if (ifSomeConditionIsTrue) {
            nodeExcelOptions = {
                fields: ['poo']
            }       
        }
        const options = {
            output: 'binary' /* default */ || 'base64',
            nodeExcel: nodeExcelOptions
        }       
        const xlsBinary = await json2xls(json, options)
        await fs.writeFile('data.xlsx', xlsBinary, 'binary');
    } catch(e) {
        // handle error
        console.error(e)
    }      
}
executAsync()
```

Or use as express middleware. It adds a convenience `xls` method to the response object to immediately output an excel as download.

```js
const json2xls = require('p3x-json2xls-worker-thread')

const jsonArr = [{
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
}];

app.use(json2xls.middleware);

app.get('/',function(req, res) {
    res.xls('data.xlsx', jsonArr);
});
```

It is possible to block the event loop by using the `sync` function eg.:
```js
const json2xls = require('p3x-json2xls-worker-thread')

const json = {
    foo: 'bar',
    qux: 'moo',
    poo: 123,
    stux: new Date()
}

const xlsBinary = json2xls.sync(json, {
    output: 'base64' // can be binary as well, just sugar...
})

console.log(xlsBinary)
```

[//]: #@corifeus-footer

---

🙏 This is an open-source project. Star this repository, if you like it, or even donate to maintain the servers and the development. Thank you so much!

Possible, this server, rarely, is down, please, hang on for 15-30 minutes and the server will be back up.

All my domains ([patrikx3.com](https://patrikx3.com) and [corifeus.com](https://corifeus.com)) could have minor errors, since I am developing in my free time. However, it is usually stable.

**Note about versioning:** Versions are cut in Major.Minor.Patch schema. Major is always the current year. Minor is either 4 (January - June) or 10 (July - December). Patch is incremental by every build. If there is a breaking change, it should be noted in the readme.


---

[**P3X-JSON2XLS-WORKER-THREAD**](https://corifeus.com/json2xls-worker-thread) Build v2021.4.103

[![Donate for Corifeus / P3X](https://img.shields.io/badge/Donate-Corifeus-003087.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QZVM4V6HVZJW6)  [![Contact Corifeus / P3X](https://img.shields.io/badge/Contact-P3X-ff9900.svg)](https://www.patrikx3.com/en/front/contact) [![Like Corifeus @ Facebook](https://img.shields.io/badge/LIKE-Corifeus-3b5998.svg)](https://www.facebook.com/corifeus.software)


## P3X Sponsor

[IntelliJ - The most intelligent Java IDE](https://www.jetbrains.com/?from=patrikx3)

[![JetBrains](https://cdn.corifeus.com/assets/svg/jetbrains-logo.svg)](https://www.jetbrains.com/?from=patrikx3)




[//]: #@corifeus-footer:end
