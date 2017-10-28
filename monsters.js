
var monsterMetaDataArray = 
    [
        { 
            name: 'Zombie',
            src: './assets/gifs/purple-bat-flying-t.gif',
            sound: new Howl(
                {
                    src: ['./sound/soundbits_ScreamsShouts2_Monsters_Monster_Roar_Growl_159.mp3'], preload: true 
                }),
            gotcha: new Howl(
                {
                    src: ['./sound/zapsplat_human_bite_potato_chips_crisps_many_x3.mp3'], preload: true
                }),
            hitpoints: 30,
            scorePoints: 1
        },
        { 
            name: 'Bats',
            src: './assets/gifs/monster-walking.gif',
            sound: new Howl(
                {
                    src: ['./sound/soundbits_Screams&Shouts_monster_male_clean_021.mp3'], preload: true 
                }),
            gotcha: new Howl(
                {
                    src: ['./sound/zapsplat_human_bite_potato_chips_crisps_many_x3.mp3'], preload: true
                }),
            hitpoints: 50,
            scorePoints: 3
        },
        {
            name: 'Boss',
            src: './assets/gifs/malrothv.gif',
            sound: new Howl(
                {
                    src: ['./sound/soundbits_ScreamsShouts_monster_processed_051.mp3'], preload: true 
                }),
            gotcha: new Howl(
                {
                    src: ['./sound/zapsplat_human_bite_potato_chips_crisps_many_x3.mp3'], preload: true
                }),
            hitpoints: 70,
            scorePoints: 5
        },
    ];

var missSound = new Howl(
                {
                    src: ['./sound/zapsplat_foley_stick_bendy_whoosh_air_fast_001_12681.mp3'], 
                    preload: true 
                });

var hitSound = new Howl(
                {
                    src: ['./sound/zapsplat_horror_axe_chop_impact_person_fleshy_wound_guts_002_14320.mp3'], 
                    preload: true 
                });
var deathScream = new Howl(
                {
                    src: ['./sound/soundbits_ScreamsShouts2_Child_Shout_026.mp3'], 
                    preload: true 
                });

var hitPower = 10;
var totalPlayerHitPoints = 500;
var score = 0;

function getRandomInt(min, max) {
   return Math.round(Math.random() * (max - min)) + min;
}

function makeMonstersAppear(){
    
    var monsterIndex = getRandomInt(0, monsterMetaDataArray.length - 1);
    
    var monsterMetaData = monsterMetaDataArray[monsterIndex];
    
    var monsterImg = $($('#monster')[0]);
    
    var src = monsterMetaData.src;
    
    var newMonsterImg = $('<img/>');
    
    newMonsterImg[0].src = src;
    
    newMonsterImg.attr('data-id', 1);
    newMonsterImg.attr('data-type', monsterMetaData.name);
    newMonsterImg.attr('data-hitpoints', monsterMetaData.hitpoints);
    newMonsterImg.attr('data-scorepoints', monsterMetaData.scorePoints);
    
    $('body').append(newMonsterImg);
    
    var fullMonsterHeight = newMonsterImg.height();
    var fullMonsterWidth = newMonsterImg.width();
    
    newMonsterImg.height(newMonsterImg.height() * .25);
    
    monsterMetaData.sound.play();
    
    newMonsterImg.hide();
    
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    
    var permissableMinX = 0;
    var permissableMaxX = windowWidth - fullMonsterWidth;
    
    var permissableMinY = 0;
    var permissableMaxY = windowHeight - fullMonsterHeight;
    
    var randomX = getRandomInt(permissableMinX, permissableMaxX);
    var randomY = getRandomInt(permissableMinY, permissableMaxY);
    
    var coords = {top: randomY, left: randomX};
    
    newMonsterImg.offset(coords);
    
    newMonsterImg.fadeIn(1000);
    
    var properties = {

        height: '50%'
    };

    newMonsterImg.animate(properties, 2000, "swing", function(){
        monsterMetaData.gotcha.play();
        
        totalPlayerHitPoints = totalPlayerHitPoints - 50;
        console.log('Player Hit Points: ' + totalPlayerHitPoints);
        $('.playerStatus').text(totalPlayerHitPoints);
        
        if (totalPlayerHitPoints <= 0){
            deathScream.play();
        }

    });
    
    return newMonsterImg;
}

function hasAttr(element, attrName){
    var attr = $(element).attr(attrName);

    // For some browsers, `attr` is undefined; for others,
    // `attr` is false.  Check for both.
    if (typeof attr !== typeof undefined && attr !== false) {
        return true;
    }
    
    return false;
}


var hittingMonster = false;
function hitMonster(element){
    if (!hittingMonster)
    {
        console.log('Hitting Monster');
        hittingMonster = true;
        
        var hitPointsVal = $(element).attr('data-hitpoints');
        console.log(hitPointsVal);
        var hitPoints = parseInt(hitPointsVal);
        console.log(hitPoints);
        hitPoints = hitPoints - hitPower;
        $(element).attr('data-hitpoints', hitPoints);

        hitSound.play();

        if (hitPoints <=0)
        {
            console.log('Killed Monster')
            $(element).stop();
            $(element).remove();
            
            hittingMonster = false;
            
            if (monsterCount >= monsterMax){
                setTimeout(function(){
                    window.location.replace('index.html');
                }, 5000);
            }
        }    
    }
}

var monsterMax = 5;
var monsterCount = 0;
var interval = null;

function generateMonster(){
    if (monsterCount <= monsterMax){
       
        makeMonstersAppear();
        monsterCount++;


    }else{
        clearInterval(interval)
    }
}

function generateMonsters(callback, times)
{
    var internalCallback = function(tick, counter) {
        return function() {
            if (--tick >= 0) {
                var intervalTime = getRandomInt(400, 5000);
                window.setTimeout(internalCallback, intervalTime);
                callback();
                
            }
        }
    }(times, 0);

    var intervalTime = getRandomInt(400, 2000);
    window.setTimeout(internalCallback, intervalTime);
};

$(function(){

    generateMonsters(generateMonster, 5);
    
    
    $('.playerStatus').text(totalPlayerHitPoints);

    $(window).on('mousemove', function(e){
        e.preventDefault();
        var element = document.elementFromPoint(e.pageX, e.pageY);
        
        if (hasAttr(element, 'data-hitpoints')){
            hitMonster(element);
        }else{
            hittingMonster = false;
        }
        
        console.log(element.nodeName);
    });
    
    document.addEventListener('touchmove', function(e){
        e.preventDefault();
        var touch = e.touches[0];
        var element = document.elementFromPoint(touch.pageX, touch.pageY);
        
        if (hasAttr(element, 'data-hitpoints')){
            hitMonster(element);
        }else{
            hittingMonster = false;
        }
    }, false);
});

function lineIntersect(x1,y1,x2,y2, x3,y3,x4,y4) {
    var x=((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
    var y=((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
    if (isNaN(x)||isNaN(y)) {
        return false;
    } else {
        if (x1>=x2) {
            if (!(x2<=x&&x<=x1)) {return false;}
        } else {
            if (!(x1<=x&&x<=x2)) {return false;}
        }
        if (y1>=y2) {
            if (!(y2<=y&&y<=y1)) {return false;}
        } else {
            if (!(y1<=y&&y<=y2)) {return false;}
        }
        if (x3>=x4) {
            if (!(x4<=x&&x<=x3)) {return false;}
        } else {
            if (!(x3<=x&&x<=x4)) {return false;}
        }
        if (y3>=y4) {
            if (!(y4<=y&&y<=y3)) {return false;}
        } else {
            if (!(y3<=y&&y<=y4)) {return false;}
        }
    }
    return true;
}

