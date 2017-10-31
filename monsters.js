
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

var levelClearSound = new Howl(
    {
        src: ['./sound/multimedia_game_musical_success_complete_orchestral_horns_001.mp3'], 
        preload: true,
        onend: function(){
            levelClear();
        }
    });



var hitPower = 10;
var totalPlayerHitPoints = 500;
var score = 0;

function getRandomInt(min, max) {
   return Math.round(Math.random() * (max - min)) + min;
}

function levelClear(){

    window.location.replace('index.html');

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
        var gameData = getGameData();

        gameData.playerHitPoints = totalPlayerHitPoints;
        saveGameData(gameData);
        $('.playerStatus').html('Hit Points: ' + totalPlayerHitPoints + '<br/>Levels Complete: ' + gameData.level);
        
        if (totalPlayerHitPoints <= 0){
            deathScream.play();



            levelClear();
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

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
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
            monstersKilled++;
            $(element).stop();
            $(element).remove();
            
            hittingMonster = false;
            
            if (monstersKilled >= monsterMax){
                monsterCount = 0;

                var gameData = getGameData();

                gameData.level++;
                gameData.playerHitPoints = totalPlayerHitPoints;
                var coords = getParameterByName('coords');

                gameData.completedLocations.push({coords: coords});
 
                saveGameData(gameData);
                levelClearSound.play();
                
            }
        }    
    }
}

var monsterMax = 5;
var monsterCount = 0;
var interval = null;
var monstersKilled = 0;

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

    if (screenfull.enabled) {
        screenfull.request();
    }
    var gameData = getGameData();
    
    monsterMax = gameData.level + 1
    generateMonsters(generateMonster, monsterMax);
    
    totalPlayerHitPoints = gameData.playerHitPoints;
    $('.playerStatus').html('Hit Points: ' + totalPlayerHitPoints + '<br/>Levels Complete: ' + gameData.level);

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


