$(function(){
    $('#startGame').click(function(e){
        clearGameData();

        window.location.href = 'map.html';
    });

    $('#continueGame').click(function(e){
        window.location.href = 'map.html';
    });
})