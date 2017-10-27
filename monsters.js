
var monsterMetaDataArray = 
    [
        { 
            name: 'Zombie',
            src: './assets/gifs/purple-bat-flying-t.gif',
            sound: new Howl(
                {
                    src: ['./sound/soundbits_ScreamsShouts2_Monsters_Monster_Roar_Growl_159.mp3'], preload: true 
                }),
            hitpoints: 30
        },
        { 
            name: 'Bats',
            src: './assets/gifs/monster-walking.gif',
            sound: new Howl(
                {
                    src: ['./sound/soundbits_Screams&Shouts_monster_male_clean_021.mp3'], preload: true 
                }),
            hitpoints: 50
        },
        {
            name: 'Boss',
            src: './assets/gifs/malrothv.gif',
            sound: new Howl(
                {
                    src: ['./sound/soundbits_SotD 2013-10-22 (Monster).mp3'], preload: true 
                }),
            hitpoints: 100
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

function getRandomInt(min, max) {
   return Math.round(Math.random() * (max - min)) + min;
 }

function makeMonsterAppear(){
    
    var monsterIndex = getRandomInt(0, monsterMetaDataArray.length - 1);
    console.log(monsterIndex);
    
    var monsterMetaData = monsterMetaDataArray[monsterIndex];
    
    var monsterImg = $($('#monster')[0]);
    
    var src = monsterMetaData.src; //monsterImg.attr('src');
    
    var newMonsterImg = $('<img/>');
    
    newMonsterImg[0].src = src; //'./assets/gifs/monster-walking.gif';
    
    newMonsterImg.attr('data-id', 1);
    newMonsterImg.attr('data-type', monsterMetaData.name);
    newMonsterImg.attr('data-hitpoints', monsterMetaData.hitpoints);
    
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
    //            alert('done');
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

function hitMonster(e){

    var ev = e;

    hitSound.play();
    $(this).remove();

    var monsterImgEl =  makeMonsterAppear();
    $(monsterImgEl[0]).on('mousemove', hitMonster);
}

$(function(){
//    for(var i = 0; i < 5; i++)
//    {
        //setTimeout(
      var monsterImgEl =  makeMonsterAppear();
                //, 1000);
//    }
    
    $(window).click(function(e){
        console.log( "pageX: " + event.pageX + ", pageY: " + event.pageY );
        
    });
    
    $(monsterImgEl[0]).on('mousemove', hitMonster);
    
    document.addEventListener('touchmove', function(e) {
//        e.preventDefault();
        var touch = e.touches[0];
        var element = document.elementFromPoint(touch.pageX, touch.pageY);
        
        if (hasAttr(element, 'data-hitpoints')){
            hitSound.play();
            $(element).remove();
            
            var monsterImgEl =  makeMonsterAppear();
            $(monsterImgEl[0]).on('mousemove', hitMonster);

        }
        
        console.log(touch.pageX + " - " + touch.pageY);
    }, false);
    
//    var mc = new Hammer(window);
//    
//    //var mc = new Hammer(monsterImgEl[0]);
//   // add a "PAN" recognizer to it (all directions)
//    mc.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) );
//  
//    
//    // tie in the handler that will be called
//    mc.on("panmove", handleDrag);
    
    //mc.on("swipe", handleDrag);


    // listen to events...
//    mc.on("swipe", function(ev) {
//        var e = ev;
//    });
    
    var lastPosX = 0;
    var lastPosY = 0;
    var isDragging = false;
    function handleDrag(ev) {

        // for convience, let's get a reference to our object
        var elem = ev.target;

        // DRAG STARTED
        // here, let's snag the current position
        // and keep track of the fact that we're dragging
        if ( ! isDragging ) {
            isDragging = true;
            lastPosX = elem.offsetLeft;
            lastPosY = elem.offsetTop;

        }

        // we simply need to determine where the x,y of this
        // object is relative to where it's "last" known position is
        // NOTE: 
        //    deltaX and deltaY are cumulative
        // Thus we need to always calculate 'real x and y' relative
        // to the "lastPosX/Y"
        var posX = ev.deltaX + lastPosX;
        var posY = ev.deltaY + lastPosY;
        
        var element = document.elementFromPoint(posX, posY);
        
        if (hasAttr(element, 'data-hitpoints')){
            //hitSound.play();
            $(element).remove();
        }else{
            //missSound.play();
        }

        // DRAG ENDED
        // this is where we simply forget we are dragging
        if (ev.isFinal) {
            isDragging = false;

        }
    }
    
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

    
});

