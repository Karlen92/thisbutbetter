var express = require('express');
const request = require("request");
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  debugger
  res.sendFile('index.html');

   // https://www.reactgeeks.com/
});

/* GET home page. */
router.get('/proxy', async function(req, res, next) {
        try {
            const response = await axios.get('https://www.reactgeeks.com/');
            if (response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html);
                debugger;
                // Get text
                $("body").append("<script > alert('This but better script is working')</script>");
                console.log("------- with axios module -------")
                console.log($.text());
                // Get HTML
                //console.log($.html());
                res.set('Content-Type', 'text/html');
                res.send($.html());
            }
        }catch(err){
            throw new Error(err);
        }
    // https://www.reactgeeks.com/
});


module.exports = router;
