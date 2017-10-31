$(function(){
    $('#startGame').click(function(e){
        clearGameData();

        window.location.href = 'map.html';
    });

    $('#continueGame').click(function(e){
        window.location.href = 'map.html';
    });

    $('#restoreHp').click(function(e){

        var gamedata = getGameData();

        gamedata.playerHitPoints = 500;

        saveGameData(gamedata);

        window.location.href = 'map.html';
    });
})