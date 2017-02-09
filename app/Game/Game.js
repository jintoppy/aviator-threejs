import Events from './Events';
import * as builder from './ObjectsBuilder';

class Game {
    constructor(){
        fieldDistance = document.getElementById("distValue");
        energyBar = document.getElementById("energyBar");
        replayMessage = document.getElementById("replayMessage");
        fieldLevel = document.getElementById("levelValue");
        levelCircle = document.getElementById("levelCircleStroke");

        resetGame();
        createScene();

        builder.createLights();
        builder.createPlane();
        builder.createSea();
        builder.createSky();
        builder.createCoins();
        builder.createEnnemies();
        builder.createParticles();

        new Events();     

        loop();   
    }
}

export default Game;