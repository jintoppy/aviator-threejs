import Colors from '../constants/Colors';

class EnnemiesHolder {
    constructor(ennemiesPool, game){
        this.ennemiesPool = ennemiesPool;
        this.game = game;
        this.mesh = new THREE.Object3D();
        this.ennemiesInUse = [];
    }
    spawnEnnemies(){
        let nEnnemies = this.game.level;
        for (let i=0; i<nEnnemies; i++){
            let ennemy;
            if (this.ennemiesPool.length) {
                ennemy = this.ennemiesPool.pop();
            }else{
                ennemy = new Ennemy();
            }

            ennemy.angle = - (i*0.1);
            ennemy.distance = this.game.seaRadius + this.game.planeDefaultHeight + (-1 + Math.random() * 2) * (this.game.planeAmpHeight-20);
            ennemy.mesh.position.y = -this.game.seaRadius + Math.sin(ennemy.angle)*ennemy.distance;
            ennemy.mesh.position.x = Math.cos(ennemy.angle)*ennemy.distance;

            this.mesh.add(ennemy.mesh);
            this.ennemiesInUse.push(ennemy);
        }
    }
    rotateEnnemies(){
        for (let i=0; i<this.ennemiesInUse.length; i++){
            let ennemy = this.ennemiesInUse[i];
            ennemy.angle += this.game.speed*this.game.deltaTime*this.game.ennemiesSpeed;

            if (ennemy.angle > Math.PI*2) ennemy.angle -= Math.PI*2;

            ennemy.mesh.position.y = -this.game.seaRadius + Math.sin(ennemy.angle)*ennemy.distance;
            ennemy.mesh.position.x = Math.cos(ennemy.angle)*ennemy.distance;
            ennemy.mesh.rotation.z += Math.random()*.1;
            ennemy.mesh.rotation.y += Math.random()*.1;

            //let globalEnnemyPosition =  ennemy.mesh.localToWorld(new THREE.Vector3());
            let diffPos = this.game.airplane.mesh.position.clone().sub(ennemy.mesh.position.clone());
            let d = diffPos.length();
            if (d<this.game.ennemyDistanceTolerance){
            this.game.particlesHolder.spawnParticles(ennemy.mesh.position.clone(), 15, Colors.red, 3);

            this.ennemiesPool.unshift(this.ennemiesInUse.splice(i,1)[0]);
            this.mesh.remove(ennemy.mesh);
            this.game.planeCollisionSpeedX = 100 * diffPos.x / d;
            this.game.planeCollisionSpeedY = 100 * diffPos.y / d;
            this.game.ambientLight.ambientLight.intensity = 2;

            removeEnergy();
            i--;
            }else if (ennemy.angle > Math.PI){
            this.ennemiesPool.unshift(this.ennemiesInUse.splice(i,1)[0]);
            this.mesh.remove(ennemy.mesh);
            i--;
            }
        }
    }
}

export default EnnemiesHolder;