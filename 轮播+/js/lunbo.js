$(document).ready(function () {
    var piclist = $("#picbox .piclist");
    var pics = $("#picbox .piclist").find("li").length;
    var width = $("#picbox").find("img")[0].width;
    var circle = $("#circle").find("li");
    var pre = $("#picbox .pre");
    var next = $("#picbox .next");
    var timer = null;
    var fu=$("#fu").find("li");
    var i = 0;
    $(circle[i]).addClass("selected").siblings().removeClass();
    $(fu[i]).show(1000).siblings().hide();
    function lunbo() {
        i++;
        if (i == pics) {
            i = 0
        };
        piclist.stop(true, true).animate({
            left: -i * width
        }, 1000);
        $(fu[i]).show(1000).siblings().hide();
        $(circle[i]).addClass("selected").siblings().removeClass();
    }
    timer = setInterval(function () {
        lunbo();
    }, 3000);
    circle.mouseover(function () {
        clearInterval(timer);
        i = $(this).index() - 1;
        lunbo();
    });
    circle.mouseout(function () {
        timer = setInterval(function () {
            lunbo();
        }, 3000);
    });
    pre.click(function () {
        clearInterval(timer);
        if(i==0){i=4}else{
            --i;
        }
        piclist.stop(true).animate({
            left: -i * width
        }, 1000);
        $(circle[i]).addClass("selected").siblings().removeClass();
        timer = setInterval(function () {
        lunbo();
    }, 3000);
    });
    next.click(function () {
        clearInterval(timer);
        if(i==4){i=0}else{
            ++i;
        }
        piclist.stop(true).animate({
            left: -i * width
        }, 1000);
        $(circle[i]).addClass("selected").siblings().removeClass();
        timer = setInterval(function () {
        lunbo();
    }, 3000);
    });
})
//祝大家新年快乐^o^