const fs = require('fs');
const express = require('express');
const request = require("request");
const axios = require('axios');
const cheerio = require('cheerio');
var proxy = require('express-http-proxy');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.sendFile('index.html');

   // https://www.reactgeeks.com/
});

const database = {
    'geeks':"https://www.reactgeeks.com/",
    'hnoon':"https://hackernoon.com/",

}

/* GET home page. */
router.get('/proxy/*/end', async function(req, res, next) {
        try {
            const response = await axios.get(database[req.params[0].replace("/",'')]);
            if (response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html);
                //Try using react
                const jsContent=fs.readFileSync("../ui-core/dom/index.js", "utf8");
                const cssContent=fs.readFileSync("../ui-core/styles/index.css", "utf8");
                // Get text
                /************************ Injections  ************************/
                $("body")
                    .append("<style>" + cssContent + "</style>")
                    .append("<script type=\"text/javascript\" > " + jsContent + "</script>");

                /********************** Injections end  **********************/
                res.set('Content-Type', 'text/html');
                res.send($.html());
            }
        }catch(err){
            throw new Error(err);
        }
    // https://www.reactgeeks.com/
});

router.get('/proxy/*/end/*',  proxy('https://www.reactgeeks.com/', {
    proxyReqPathResolver: function (req) {
        var parts = req.url.split('/end');
        var queryString = parts[1];
        var updatedPath = parts[0].replace(/test/, 'tent');
        return parts[1];
    }
}));

router.post('/*',  proxy('https://www.reactgeeks.com'));

module.exports = router;
