$(function(){

    $(document).ready(function(){/*页面加载完全后进入选择模式页面*/
        $('#loading').addClass('hide');
        $('#index').removeClass('hide');

        if($(window).width()<=769){/*屏幕宽度小于769时，box的初始高度*/
            $('#box').css("height",$('#box').width()/100*$(window).width());
        }
    });
/*----------------------------响应式兼容-----------------------------------*/
    var isMobile = {  /*判断是否为移动设备*/
        Android: function() {
            return navigator.userAgent.match(/Android/i) ? true: false;
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i) ? true: false;
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true: false;
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i) ? true: false;
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
        }
    };

    /*var isChrome = navigator.userAgent.toLowerCase().match(/chrome/);*/  /*判断chorme*/
    (function(){/*设置游戏框内高度与宽度一致*/
        changeBox=function(){
            if(isMobile.any()){
                $('#box').css("height",$('#box').width()/100*$(window).width());
            }else if($(window).width()>769){
                $('#box').css("height",$('#box').width());
            }
            else if($(window).width()<=769){
                    $('#box').css("height",$('#box').width());
            }
        }
        changeBox();
        $(window).resize(function(){/*每次改变屏幕分辨率执行*/
            changeBox();
        });

    })();

    /*-------------统计分数划分等级----------------*/

    var grad=["瞎子", "色盲", "色郎", "色狼", "色鬼", "色魔", "超级色魔", "变态色魔", "孤独求色", "衣冠禽色"];
    var getGrad=function(){
        if($('#goal').text()<26){return grad[0]+'Lv'+$('#goal').text()}
        else if($('#goal').text()<45){return grad[1]+'Lv'+$('#goal').text()}
        else if($('#goal').text()<50){return grad[2]+'Lv'+$('#goal').text()}
        else if($('#goal').text()<58){return grad[3]+'Lv'+$('#goal').text()}
        else if($('#goal').text()<66){return grad[4]+'Lv'+$('#goal').text()}
        else if($('#goal').text()<72){return grad[5]+'Lv'+$('#goal').text()}
        else if($('#goal').text()<80){return grad[6]+'Lv'+$('#goal').text()}
        else if($('#goal').text()<85){return grad[7]+'Lv'+$('#goal').text()}
        else if($('#goal').text()>=85){return grad[8]+'Lv'+$('#goal').text()}
    };



    /*--------------------------------页面跳转-----------------------------------*/


    (function(){
        $('#index .modeOne').click(function(){
            $('#index').addClass('hide');
            $('#room').removeClass('hide');
            Countdown();
        });


        var timer =61;/*游戏60s倒计时*/
        var countdown_time=null;
        function Countdown() {
            if (timer >= 1) {
                timer -= 1;
                countdown_time=setTimeout(function() {
                    Countdown();
                    $('#room .time').html(timer)
                }, 1000);
            }

            else if(timer==0){
                $('#room').addClass('hide');
                $('#popup').removeClass('hide');
                $('#popup .stop').addClass('hide');
                clearTimeout(countdown_time);
                $('#grad').html(getGrad());
            }
        };


        $('#room .btn_stop').click(function(){  /*游戏暂停*/
            $('#room').addClass('hide');
            $('#popup').removeClass('hide');
            $('#popup .ending').addClass('hide');
            clearTimeout(countdown_time);
        });

        $('#popup .stop .continue').click(function(){/*游戏继续*/
            $('#popup').addClass('hide');
            $('#room').removeClass('hide');
            $('#popup .ending').removeClass('hide');
            Countdown();
            timer+=1;
        });

        $('#popup .again').click(function(){/*重新开始*/

            $('#popup').addClass('hide');
            $('#room').removeClass('hide');
            $('#popup .ending').removeClass('hide');
            clearTimeout(countdown_time);
            $('#goal').html(0);
            $('#room .time').html(60)
                timer=61;
                Countdown();
        })

        $('#popup .moreGame').click(function(){/*更多游戏*/
            window.open('http://www.4399.com');
        })


    })();

    /*------------------------------------游戏部分--------------------------------------------*/
    (function(){
        var level_arr=['lv2','lv3','lv4','lv5','lv6','lv7','lv8','lv9','lv10'];
        var color_arr={
            color1:{normal:'#3b168f',special:'#ae89ff'},
            color2:{normal:'#326c68',special:'#96d0cc'},
            color3:{normal:'#462a36',special:'#5f434f'},
            color4:{normal:'#3ab4a8',special:'#80faee'},
            color5:{normal:'#317f5f',special:'#77c5a5'},
            color6:{normal:'#53533f',special:'#a8a894'},
            color7:{normal:'#122f5a',special:'#5875a0'},
            color8:{normal:'#c6adb7',special:'#fde4ee'},
            color9:{normal:'#3db010',special:'#83f656'},
            color10:{normal:'#a7b474',special:'#edfaba'},
            color11:{normal:'#9fd22e',special:'#b8eb47'}
    }
        var photo_arr={
            normal:'black1.png',special:'black2.png'
        }


        var level=0;
        startGame(level_arr[0]);
       function startGame(clsName){/*创建span格子*/
           var number=jQuery.inArray(clsName,level_arr);/*找到到leverl索引值*/
           var spanNum=(number+2)*(number+2)/*计算这个level的span格子个数*/
           var colorNum=getRandom(11);

            $('#box span').remove();/*清空原先所有span*/
           for(var i=0;i<spanNum;i++){
                $('#box').append("<span></span>")
           }
           function getRandom(n){/*产生随机数*/
              return Math.floor(Math.random()*n+1);
           }
           $('#box span').css("background-color",color_arr["color"+colorNum].normal).addClass('normal');
           $('#box span').eq(getRandom(spanNum)-1).css("background-color",color_arr["color"+colorNum].special).removeClass('normal').addClass('special');


           /*--------游戏点击事件--------*/
           $('#box span.special').click(function(){
               var goal=function(){
                   a=parseInt($('#goal').text())+1;
                   if(a<10){
                       return '0'+a;
                   }else{
                       return a;
                   }
               }
               if(level==8){
                   level=8;
               }else {
                   level++;
               }
               $('#box').removeClass().addClass(level_arr[level]);
               startGame(level_arr[level]);
               $('#goal').html(goal());
           });
       };

        $('#popup .again').click(function(){
            level=0;
            startGame(level_arr[level]);
            $('#box').removeClass().addClass(level_arr[level]);
        })

    })();




})