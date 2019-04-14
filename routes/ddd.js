// var express = require('express');
// const request = require("request");
// const axios = require('axios');
// const cheerio = require('cheerio');
// const fs = require('fs');
//
// const { injectJavascript, injectCss } = require('../utils');
// var router = express.Router();
//
// /* GET home page. */
// router.get('/', function(req, res, next) {
//     debugger
//     res.sendFile('index.html');
//
//     // https://www.reactgeeks.com/
// });
//
//
// // app.use('/proxy', proxy('https://www.reactgeeks.com', {
// //     userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
// //         debugger
// //         data = JSON.parse(proxyResData.toString('utf8'));
// //         //TODO intercept only html content type requests
// //         const contentType = response.headers['content-type'];
// //         let $ = injectJavascript(data);
// //         data.newProperty = 'exciting data';
// //
// //         return JSON.stringify(data);
// //     }
// // }));
//
//
// /* GET home page. */
// router.get('/proxy', async function(req, res, next) {
//     try {
//         const response = await axios.get('https://www.reactgeeks.com/');
//         if (response.status === 200) {
//             const data = response.data;
//             const contentType = response.headers['content-type'];
//             let $ = injectJavascript(data);
//             //$ = injectCss(($));
//             res.set('Content-Type', 'text/html');
//             res.send($.html());
//         }
//     }catch(err){
//         throw new Error(err);
//     }
//     // https://www.reactgeeks.com/
// });
//
// /* GET home page. */
// router.get('/*', async function(req, res, next) {
//     try {
//         debugger
//         console.log(req.params);
//         const response = await axios.get('https://www.reactgeeks.com' + req.originalUrl);
//         if (response.status === 200) {
//             const data = response.data;
//             const contentType = response.headers['content-type'];
//             if(contentType === 'text/html'){
//                 res.set('Content-Type', contentType);
//                 let $ = injectJavascript(data);
//                 res.send($.html());
//             }else{
//                 //res.set('Content-Type', contentType);
//                 res.send(data);
//             }
//         }
//     }catch(err){
//         debugger;
//         throw new Error(err);
//     }
//     // https://www.reactgeeks.com/
// });
//
//
//
// module.exports = router;
