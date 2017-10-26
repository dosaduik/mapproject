var monster = new Howl({

        src: ['./sound/soundbits_Screams&Shouts_monster_male_clean_021.mp3'],

        preload: true
    });

function getRandomInt(min, max) {
   return Math.round(Math.random() * (max - min + 1)) + min;
 }

function makeMonsterAppear(){
    var monsterImg = $($('#monster')[0]);
    
    var src = monsterImg.attr('src');
    
    var newMonsterImg = $('<img/>');
    
    newMonsterImg[0].src = './assets/gifs/monster-walking.gif';
    
    newMonsterImg.attr('data-id', 1);
    newMonsterImg.attr('data-type', 'monster');

    
    $('body').append(newMonsterImg);
    
    var fullHeight = newMonsterImg.height();
    var fullWidth = newMonsterImg.width();
    
    newMonsterImg.height(newMonsterImg.height() * .25);
    
    monster.play();
    
    newMonsterImg.hide();
    
    var windowWidth = $(window).width();
    var windowHeight = $(window).height()
    
    var randomX = getRandomInt(0, windowWidth);
    var randomY = getRandomInt(0, windowHeight);
    
    var coords = {top: randomY, left: randomX};
    
    newMonsterImg.offset(coords);
    
    newMonsterImg.fadeIn(1000);
    
    var properties = {

        height: '100%'
    };

    newMonsterImg.animate(properties, 3000, "swing", function(){
    //            alert('done');
    });
}

$(function(){
    makeMonsterAppear();
    
    $(window).click(function(e){
        console.log( "pageX: " + event.pageX + ", pageY: " + event.pageY );
        
    });
    
    var mc = new Hammer(window);

    // listen to events...
    mc.on("swipe", function(ev) {
        var e = ev;
    });
    
});

