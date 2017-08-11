$(document).ready(function () {
    img();
    var dataImg={"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"0.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"}]}
    window.onscroll=function(){
        if(scrollside()){
            $.each(dataImg.data,function(index,value){
                var box=$("<div>").addClass("box").appendTo($("#contain"));
                var content=$("<div>").addClass("content").appendTo(box);
                $("<img>").attr("src",$(value).attr("src")).appendTo(content);
            });
            img();
        }
    }
});
function img() {
    var box = $(".box");
    var imgwidth = box.eq(0).width();
    var lie = Math.floor($(window).width() / imgwidth);
    var heightarr = [];
    box.each(function (index, value) {
        var boxheight = box.eq(index).height();
        if (index < lie) {
            heightarr[index] = boxheight;
        } else {
            var minheight = Math.min.apply(null, heightarr);
            var minheightindex = $.inArray(minheight, heightarr);
            $(value).css({
                position: "absolute",
                top: minheight,
                left: box.eq(minheightindex).position().left
            });
            heightarr[minheightindex] += box.eq(index).height();
        }
    });
};
function scrollside(){
    var box=$(".box");
    var lastheight=box.last().get(0).offsetTop+ Math.floor(box.last().height()/2);
    var documentHeight=$(document).width();
    var scrollHeight=$(window).scrollTop();
    return(lastheight<scrollHeight+documentHeight)?true:false;
};
