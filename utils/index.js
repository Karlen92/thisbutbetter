const cheerio = require('cheerio');

function injectJavascript(html){
        const $ = cheerio.load(html);
        $("body").append("<script type=\"text/javascript\" > console.log('This but better script is working')</script>");
        return $;

}

function injectCss(html){
    const $ = cheerio.load(html);
    $("body").append("<link type=\"text/stylesheet\" > .thisbutbetter { color:red } </link>");
    return $;
}


module.exports = {
    injectJavascript,
    injectCss
};