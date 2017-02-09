import THREE from 'three';

class EnnemiesHolder {
    constructor(){
        this.mesh = new THREE.Object3D();
        this.ennemiesInUse = [];
    }
    spawnEnnemies(){
        let nEnnemies = game.level;
        for (let i=0; i<nEnnemies; i++){
            let ennemy;
            if (ennemiesPool.length) {
            ennemy = ennemiesPool.pop();
            }else{
            ennemy = new Ennemy();
            }

            ennemy.angle = - (i*0.1);
            ennemy.distance = game.seaRadius + game.planeDefaultHeight + (-1 + Math.random() * 2) * (game.planeAmpHeight-20);
            ennemy.mesh.position.y = -game.seaRadius + Math.sin(ennemy.angle)*ennemy.distance;
            ennemy.mesh.position.x = Math.cos(ennemy.angle)*ennemy.distance;

            this.mesh.add(ennemy.mesh);
            this.ennemiesInUse.push(ennemy);
        }
    }
    rotateEnnemies(){
        for (let i=0; i<this.ennemiesInUse.length; i++){
            let ennemy = this.ennemiesInUse[i];
            ennemy.angle += game.speed*deltaTime*game.ennemiesSpeed;

            if (ennemy.angle > Math.PI*2) ennemy.angle -= Math.PI*2;

            ennemy.mesh.position.y = -game.seaRadius + Math.sin(ennemy.angle)*ennemy.distance;
            ennemy.mesh.position.x = Math.cos(ennemy.angle)*ennemy.distance;
            ennemy.mesh.rotation.z += Math.random()*.1;
            ennemy.mesh.rotation.y += Math.random()*.1;

            //let globalEnnemyPosition =  ennemy.mesh.localToWorld(new THREE.Vector3());
            let diffPos = airplane.mesh.position.clone().sub(ennemy.mesh.position.clone());
            let d = diffPos.length();
            if (d<game.ennemyDistanceTolerance){
            particlesHolder.spawnParticles(ennemy.mesh.position.clone(), 15, Colors.red, 3);

            ennemiesPool.unshift(this.ennemiesInUse.splice(i,1)[0]);
            this.mesh.remove(ennemy.mesh);
            game.planeCollisionSpeedX = 100 * diffPos.x / d;
            game.planeCollisionSpeedY = 100 * diffPos.y / d;
            ambientLight.intensity = 2;

            removeEnergy();
            i--;
            }else if (ennemy.angle > Math.PI){
            ennemiesPool.unshift(this.ennemiesInUse.splice(i,1)[0]);
            this.mesh.remove(ennemy.mesh);
            i--;
            }
        }
    }
}

export default EnnemiesHolder;