

window.onload=function(){

    var music=document.getElementById('music');
    var music_btn=document.getElementById('music_bg');


    music_btn.addEventListener("click",function(event){
        if(music.paused){
            music.play();
           $('#music_bg .move').addClass('play');
        }else{
            music.pause();
            $('#music_bg .move').removeClass('play');
        };
    },false)

    $('#index .modeOne').click(function(){
        if($(window).width()<=769){
            $('#music_bg').css({"top":"0","right":"10px","bottom":"0","left":"auto","margin":"auto"});
        }

    });




}