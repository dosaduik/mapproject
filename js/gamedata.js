function getGameData(){
    
    var gameData = Cookies.getJSON('gameData')
    
    if (!gameData){
        gameData = {};
    }

    if (!gameData.level)
    {
        gameData.level = 0;
    }
    
    if (!gameData.playerHitPoints)
    {
        gameData.playerHitPoints = 500;
    }

    if (!gameData.completedLocations)
    {
        gameData.completedLocations = []               
    }

    return gameData;
}

function saveGameData(gameData){
    Cookies.set('gameData', JSON.stringify(gameData), { expires: 3650 });
}

function clearGameData(){
    Cookies.set('gameData', '');
}