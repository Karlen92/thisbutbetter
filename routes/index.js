var express = require('express');
const request = require("request");
const axios = require('axios');
const cheerio = require('cheerio');
var proxy = require('express-http-proxy');
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
                // Get text
                /////////////////////////////////// STYLES  //////////////////////////////////////////////
                $("body").append("<style> .thisButBetterOutline {\n" +
                    "    outline: 2px dashed #658bff !important\n" +
                    "}</style>");
                ////////////////////////////////////    JS    /////////////////////////////////////////////
                $("body").append("<script type=\"text/javascript\" >var ThisButBetter = {};\n" +
                    "\n" +
                    "ThisButBetter.getElementPath = function(node){\n" +
                    "    const parts = [];\n" +
                    "    while (node.parentElement) {\n" +
                    "        var str = node.tagName;\n" +
                    "        if (node.id) {\n" +
                    "            str += `#${node.id}`;\n" +
                    "            parts.unshift(str);\n" +
                    "            break;\n" +
                    "        }\n" +
                    "        var siblingsArr = Array.prototype.slice.call(node.parentElement.childNodes);\n" +
                    "        var ind = siblingsArr.filter(n=> n.attributes != null).indexOf(node);\n" +
                    "        parts.unshift(str + `:nth-child(${ind + 1})`);\n" +
                    "        node = node.parentElement;\n" +
                    "    }\n" +
                    "    return parts.join(' > ');\n" +
                    "};\n" +
                    "\n" +
                    "ThisButBetter.hoverHandlerFactory = function(params){\n" +
                    "\n" +
                    "    return function(el){\n" +
                    "        const current = $('.' + params.outline).removeClass(params.outline);\n" +
                    "        $(el.target).addClass(params.outline);\n" +
                    "    };\n" +
                    "};\n" +
                    "\n" +
                    "ThisButBetter.clickHandlerFactory = function(params){\n" +
                    "    return function(ev){\n" +
                    "        var x = ev.pageX - $(ev.target).offset().left;\n" +
                    "        var y = ev.pageY - $(ev.target).offset().top;\n" +
                    "        var circleRadius = 30;\n" +
                    "        console.log(x);\n" +
                    "        console.log(y);\n" +
                    "        event.stopPropagation();\n" +
                    "        // var pos = $(ThisButBetter.getElementPath(ev.target)).position();\n" +
                    "        var pos = {\n" +
                    "            top: $(ev.target).offset().top + y - circleRadius/2,\n" +
                    "            left:$(ev.target).offset().left + x- circleRadius/2\n" +
                    "        };\n" +
                    "\n" +
                    "        $('body').append(\"<div style='z-index:9999;border-radius:15px;width:\" + circleRadius + \"px;height:\" + circleRadius + \"px;background-color:#53a267;position: absolute;top: \"+ pos.top + \"px;left: \" + pos.left +\"px'>\");\n" +
                    "    };\n" +
                    "};\n" +
                    "\n" +
                    "$(\"body *\").hover(ThisButBetter.hoverHandlerFactory({outline: 'thisButBetterOutline'}));\n" +
                    "\n" +
                    "$(\"body *\").click(ThisButBetter.clickHandlerFactory());\n</script>");
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

router.get('/*',  proxy('https://www.reactgeeks.com'));

router.post('/*',  proxy('https://www.reactgeeks.com'));

module.exports = router;
