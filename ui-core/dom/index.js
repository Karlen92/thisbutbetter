var ThisButBetter = {};

ThisButBetter.getElementPath = function(node){
    const parts = [];
    while (node.parentElement) {
        var str = node.tagName;
        if (node.id) {
            str += `#${node.id}`;
            parts.unshift(str);
            break;
        }
        var siblingsArr = Array.prototype.slice.call(node.parentElement.childNodes);
        var ind = siblingsArr.filter(n=> n.attributes != null).indexOf(node);
        parts.unshift(str + `:nth-child(${ind + 1})`);
        node = node.parentElement;
    }
    return parts.join(' > ');
};

ThisButBetter.hoverHandlerFactory = function(params){

    return function(el){
        const current = $('.betterBorder').removeClass(params.outline);
        $(el.target).addClass(params.outline);
    };
};

ThisButBetter.clickHandlerFactory = function(params){
    return function(ev){
        var x = ev.pageX - $(ev.target).offset().left;
        var y = ev.pageY - $(ev.target).offset().top;
        var circleRadius = 30;
        console.log(x);
        console.log(y);
        event.stopPropagation();
        // var pos = $(ThisButBetter.getElementPath(ev.target)).position();
        var pos = {
            top: $(ev.target).offset().top + y - circleRadius/2,
            left:$(ev.target).offset().left + x- circleRadius/2
        };

        $('body').append("<div style='z-index:9999;border-radius:15px;width:" + circleRadius + "px;height:" + circleRadius + "px;background-color:#53a267;position: absolute;top: "+ pos.top + "px;left: " + pos.left +"px'>");
    };
};

$("body *").hover(ThisButBetter.hoverHandlerFactory({outline: 'thisButBetterOutline'}));

$("body *").click(ThisButBetter.clickHandlerFactory());
