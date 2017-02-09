import Events from './Events';
import * as builder from './ObjectsBuilder';
import Scene from '../Scene';
import Utils from '../Utils';

class Game {
    constructor(){
        this.mousePos = { x: 0, y: 0 };
        this.fieldDistance = document.getElementById("distValue");
        this.energyBar = document.getElementById("energyBar");
        this.replayMessage = document.getElementById("replayMessage");
        this.fieldLevel = document.getElementById("levelValue");
        this.levelCircle = document.getElementById("levelCircleStroke");

        this.newTime = new Date().getTime();
        this.oldTime = new Date().getTime();
        this.deltaTime = 0;

        this.reset();
        this.sceneObj = new Scene(this.game);

        this.airplane = builder.createPlane(this.sceneObj.scene, this.game);
        builder.createSea(this.sceneObj.scene, this.game);
        builder.createSky(this.sceneObj.scene, this.game);
        builder.createCoins(this.sceneObj.scene);
        builder.createEnnemies(this.sceneObj.scene);
        builder.createParticles(this.sceneObj.scene);

        new Events();     

        this.loop();
    }

    reset() {
        this.game = {
          speed:0,
          initSpeed:.00035,
          baseSpeed:.00035,
          targetBaseSpeed:.00035,
          incrementSpeedByTime:.0000025,
          incrementSpeedByLevel:.000005,
          distanceForSpeedUpdate:100,
          speedLastUpdate:0,

          distance:0,
          ratioSpeedDistance:50,
          energy:100,
          ratioSpeedEnergy:3,

          level:1,
          levelLastUpdate:0,
          distanceForLevelUpdate:1000,

          planeDefaultHeight:100,
          planeAmpHeight:80,
          planeAmpWidth:75,
          planeMoveSensivity:0.005,
          planeRotXSensivity:0.0008,
          planeRotZSensivity:0.0004,
          planeFallSpeed:.001,
          planeMinSpeed:1.2,
          planeMaxSpeed:1.6,
          planeSpeed:0,
          planeCollisionDisplacementX:0,
          planeCollisionSpeedX:0,

          planeCollisionDisplacementY:0,
          planeCollisionSpeedY:0,

          seaRadius:600,
          seaLength:800,
          //seaRotationSpeed:0.006,
          wavesMinAmp : 5,
          wavesMaxAmp : 20,
          wavesMinSpeed : 0.001,
          wavesMaxSpeed : 0.003,

          cameraFarPos:500,
          cameraNearPos:150,
          cameraSensivity:0.002,

          coinDistanceTolerance:15,
          coinValue:3,
          coinsSpeed:.5,
          coinLastSpawn:0,
          distanceForCoinsSpawn:100,

          ennemyDistanceTolerance:10,
          ennemyValue:10,
          ennemiesSpeed:.6,
          ennemyLastSpawn:0,
          distanceForEnnemiesSpawn:50,
          status : "playing",
         };
        this.fieldLevel.innerHTML = Math.floor(this.game.level);
    }

    loop(){
        this.newTime = new Date().getTime();
        this.deltaTime = this.newTime-this.oldTime;
        this.oldTime = this.newTime;

        if (this.game.status=="playing"){

            // Add energy coins every 100m;
            if (Math.floor(this.game.distance)%this.game.distanceForCoinsSpawn == 0 && Math.floor(this.game.distance) > this.game.coinLastSpawn){
                this.game.coinLastSpawn = Math.floor(this.game.distance);
                coinsHolder.spawnCoins();
            }

            if (Math.floor(this.game.distance)%this.game.distanceForSpeedUpdate == 0 && Math.floor(this.game.distance) > this.game.speedLastUpdate){
                this.game.speedLastUpdate = Math.floor(this.game.distance);
                this.game.targetBaseSpeed += this.game.incrementSpeedByTime*this.deltaTime;
            }


            if (Math.floor(this.game.distance)%this.game.distanceForEnnemiesSpawn == 0 && Math.floor(this.game.distance) > this.game.ennemyLastSpawn){
                this.game.ennemyLastSpawn = Math.floor(this.game.distance);
                ennemiesHolder.spawnEnnemies();
            }

            if (Math.floor(this.game.distance)%this.game.distanceForLevelUpdate == 0 && Math.floor(this.game.distance) > this.game.levelLastUpdate){
                this.game.levelLastUpdate = Math.floor(game.distance);
                this.game.level++;
                fieldLevel.innerHTML = Math.floor(this.game.level);

                this.game.targetBaseSpeed = this.game.initSpeed + this.game.incrementSpeedByLevel*this.game.level
            }


            this.updatePlane();
            this.updateDistance();
            this.updateEnergy();
            this.game.baseSpeed += (this.game.targetBaseSpeed - this.game.baseSpeed) * this.deltaTime * 0.02;
            this.game.speed = this.game.baseSpeed * this.game.planeSpeed;

        }else if(this.game.status=="gameover"){
            this.game.speed *= .99;
            airplane.mesh.rotation.z += (-Math.PI/2 - airplane.mesh.rotation.z)*.0002*this.deltaTime;
            airplane.mesh.rotation.x += 0.0003*this.deltaTime;
            this.game.planeFallSpeed *= 1.05;
            airplane.mesh.position.y -= this.game.planeFallSpeed*this.deltaTime;

            if (airplane.mesh.position.y <-200){
            this.showReplay();
            this.game.status = "waitingReplay";

            }
        }else if (this.game.status=="waitingReplay"){

        }


        airplane.propeller.rotation.x +=.2 + this.game.planeSpeed * deltaTime*.005;
        sea.mesh.rotation.z += this.game.speed*deltaTime;//*game.seaRotationSpeed;

        if ( sea.mesh.rotation.z > 2*Math.PI)  sea.mesh.rotation.z -= 2*Math.PI;

        ambientLight.intensity += (.5 - ambientLight.intensity)*deltaTime*0.005;

        coinsHolder.rotateCoins();
        ennemiesHolder.rotateEnnemies();

        sky.moveClouds();
        sea.moveWaves();

        renderer.render(scene, camera);
        requestAnimationFrame(loop);
    }

    updateDistance(){
        this.game.distance += this.game.speed*deltaTime*this.game.ratioSpeedDistance;
        fieldDistance.innerHTML = Math.floor(this.game.distance);
        var d = 502*(1-(this.game.distance%this.game.distanceForLevelUpdate)/this.game.distanceForLevelUpdate);
        levelCircle.setAttribute("stroke-dashoffset", d);

    }

    updateEnergy(){
        this.game.energy -= this.game.speed*deltaTime*this.game.ratioSpeedEnergy;
        this.game.energy = Math.max(0, this.game.energy);
        energyBar.style.right = (100-this.game.energy)+"%";
        energyBar.style.backgroundColor = (this.game.energy<50)? "#f25346" : "#68c3c0";

        if (this.game.energy<30){
            energyBar.style.animationName = "blinking";
        }else{
            energyBar.style.animationName = "none";
        }

        if (this.game.energy <1){
            this.game.status = "gameover";
        }
    }
    addEnergy(){
        this.game.energy += this.game.coinValue;
        this.game.energy = Math.min(this.game.energy, 100);
    }

    removeEnergy(){
        this.game.energy -= this.game.ennemyValue;
        this.game.energy = Math.max(0, this.game.energy);
    }
    showReplay(){
       replayMessage.style.display="block";
    }
    hideReplay(){
        replayMessage.style.display="none";
    }

    updatePlane(){
        this.game.planeSpeed = Utils. normalize(this.mousePos.x,-.5,.5,this.game.planeMinSpeed, this.game.planeMaxSpeed);
        var targetY = Utils. normalize(this.mousePos.y,-.75,.75,this.game.planeDefaultHeight-this.game.planeAmpHeight, this.game.planeDefaultHeight+this.game.planeAmpHeight);
        var targetX = Utils. normalize(this.mousePos.x,-1,1,-this.game.planeAmpWidth*.7, -this.game.planeAmpWidth);

        this.game.planeCollisionDisplacementX += this.game.planeCollisionSpeedX;
        targetX += this.game.planeCollisionDisplacementX;


        this.game.planeCollisionDisplacementY += this.game.planeCollisionSpeedY;
        targetY += this.game.planeCollisionDisplacementY;

        this.airplane.mesh.position.y += (targetY-this.airplane.mesh.position.y)*this.deltaTime*this.game.planeMoveSensivity;
        this.airplane.mesh.position.x += (targetX-this.airplane.mesh.position.x)*this.deltaTime*this.game.planeMoveSensivity;

        this.airplane.mesh.rotation.z = (targetY-this.airplane.mesh.position.y)*this.deltaTime*this.game.planeRotXSensivity;
        this.airplane.mesh.rotation.x = (this.airplane.mesh.position.y-targetY)*this.deltaTime*this.game.planeRotZSensivity;
        var targetCameraZ = Utils. normalize(this.game.planeSpeed, this.game.planeMinSpeed, this.game.planeMaxSpeed, this.game.cameraNearPos, this.game.cameraFarPos);
        this.sceneObj.camera.fov = Utils. normalize(this.mousePos.x,-1,1,40, 80);
        this.sceneObj.camera.updateProjectionMatrix ()
        this.sceneObj.camera.position.y += (this.airplane.mesh.position.y - this.sceneObj.camera.position.y)*this.deltaTime*this.game.cameraSensivity;

        this.game.planeCollisionSpeedX += (0-this.game.planeCollisionSpeedX)*this.deltaTime * 0.03;
        this.game.planeCollisionDisplacementX += (0-this.game.planeCollisionDisplacementX)*this.deltaTime *0.01;
        this.game.planeCollisionSpeedY += (0-this.game.planeCollisionSpeedY)*this.deltaTime * 0.03;
        this.game.planeCollisionDisplacementY += (0-this.game.planeCollisionDisplacementY)*this.deltaTime *0.01;

        this.airplane.pilot.updateHairs();
    }

}

export default Game;