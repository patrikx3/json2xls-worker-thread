[//]: #@corifeus-header

  [![NPM](https://img.shields.io/npm/v/p3x-json2xls-worker-thread.svg)](https://www.npmjs.com/package/p3x-json2xls-worker-thread)  [![Donate for PatrikX3 / P3X](https://img.shields.io/badge/Donate-PatrikX3-003087.svg)](https://paypal.me/patrikx3) [![Contact Corifeus / P3X](https://img.shields.io/badge/Contact-P3X-ff9900.svg)](https://www.patrikx3.com/en/front/contact) [![Corifeus @ Facebook](https://img.shields.io/badge/Facebook-Corifeus-3b5998.svg)](https://www.facebook.com/corifeus.software)  [![Uptime ratio (90 days)](https://network.corifeus.com/public/api/uptime-shield/31ad7a5c194347c33e5445dbaf8.svg)](https://network.corifeus.com/status/31ad7a5c194347c33e5445dbaf8)





# 📈 Convert JSON to Excel XLSX with offloading the constructing the data using a worker thread v2026.4.123


  
🌌 **Bugs are evident™ - MATRIX️**  
🚧 **This project is under active development!**  
📢 **We welcome your feedback and contributions.**  
    



### NodeJS LTS is supported

### 🛠️ Built on NodeJs version

```txt
v24.14.1
```





# 📝 Description

                        
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

# Corifeus Network

AI-powered network & email toolkit — free, no signup.

**Web** · [network.corifeus.com](https://network.corifeus.com)  **MCP** · [`npm i -g p3x-network-mcp`](https://www.npmjs.com/package/p3x-network-mcp)

- **AI Network Assistant** — ask in plain language, get a full domain health report
- **Network Audit** — DNS, SSL, security headers, DNSBL, BGP, IPv6, geolocation in one call
- **Diagnostics** — DNS lookup & global propagation, WHOIS, reverse DNS, HTTP check, my-IP
- **Mail Tester** — live SPF/DKIM/DMARC + spam score + AI fix suggestions, results emailed (localized)
- **Monitoring** — TCP / HTTP / Ping with alerts and public status pages
- **MCP server** — 17 tools exposed to Claude Code, Codex, Cursor, any MCP client
- **Install** — `claude mcp add p3x-network -- npx p3x-network-mcp`
- **Try** — *"audit example.com"*, *"why do my emails land in spam? test me@example.com"*
- **Source** — [patrikx3/network](https://github.com/patrikx3/network) · [patrikx3/network-mcp](https://github.com/patrikx3/network-mcp)
- **Contact** — [patrikx3.com](https://www.patrikx3.com/en/front/contact) · [donate](https://paypal.me/patrikx3)

---

## ❤️ Support Our Open-Source Project  
If you appreciate our work, consider ⭐ starring this repository or 💰 making a donation to support server maintenance and ongoing development. Your support means the world to us—thank you!  

---

### 🌍 About My Domains  
All my domains, including [patrikx3.com](https://patrikx3.com), [corifeus.eu](https://corifeus.eu), and [corifeus.com](https://corifeus.com), are developed in my spare time. While you may encounter minor errors, the sites are generally stable and fully functional.  

---

### 📈 Versioning Policy  
**Version Structure:** We follow a **Major.Minor.Patch** versioning scheme:  
- **Major:** 📅 Corresponds to the current year.  
- **Minor:** 🌓 Set as 4 for releases from January to June, and 10 for July to December.  
- **Patch:** 🔧 Incremental, updated with each build.  

**🚨 Important Changes:** Any breaking changes are prominently noted in the readme to keep you informed.


[**P3X-JSON2XLS-WORKER-THREAD**](https://corifeus.com/json2xls-worker-thread) Build v2026.4.123

 [![NPM](https://img.shields.io/npm/v/p3x-json2xls-worker-thread.svg)](https://www.npmjs.com/package/p3x-json2xls-worker-thread)  [![Donate for PatrikX3 / P3X](https://img.shields.io/badge/Donate-PatrikX3-003087.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QZVM4V6HVZJW6)  [![Contact Corifeus / P3X](https://img.shields.io/badge/Contact-P3X-ff9900.svg)](https://www.patrikx3.com/en/front/contact) [![Like Corifeus @ Facebook](https://img.shields.io/badge/LIKE-Corifeus-3b5998.svg)](https://www.facebook.com/corifeus.software)





[//]: #@corifeus-footer:end
