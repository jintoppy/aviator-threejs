import Coin from './Coin';

class CoinsHolder {
    constructor(nCoins){
        this.mesh = new THREE.Object3D();
        this.coinsInUse = [];
        this.coinsPool = [];
        for (let i=0; i<nCoins; i++){
            let coin = new Coin();
            this.coinsPool.push(coin);
        }
    }
    spawnCoins(){
        let nCoins = 1 + Math.floor(Math.random()*10);
        let d = game.seaRadius + game.planeDefaultHeight + (-1 + Math.random() * 2) * (game.planeAmpHeight-20);
        let amplitude = 10 + Math.round(Math.random()*10);
        for (let i=0; i<nCoins; i++){
            let coin;
            if (this.coinsPool.length) {
            coin = this.coinsPool.pop();
            }else{
            coin = new Coin();
            }
            this.mesh.add(coin.mesh);
            this.coinsInUse.push(coin);
            coin.angle = - (i*0.02);
            coin.distance = d + Math.cos(i*.5)*amplitude;
            coin.mesh.position.y = -game.seaRadius + Math.sin(coin.angle)*coin.distance;
            coin.mesh.position.x = Math.cos(coin.angle)*coin.distance;
        }
    }
    rotateCoins(){
        for (let i=0; i<this.coinsInUse.length; i++){
            let coin = this.coinsInUse[i];
            if (coin.exploding) continue;
            coin.angle += game.speed*deltaTime*game.coinsSpeed;
            if (coin.angle>Math.PI*2) coin.angle -= Math.PI*2;
            coin.mesh.position.y = -game.seaRadius + Math.sin(coin.angle)*coin.distance;
            coin.mesh.position.x = Math.cos(coin.angle)*coin.distance;
            coin.mesh.rotation.z += Math.random()*.1;
            coin.mesh.rotation.y += Math.random()*.1;

            //let globalCoinPosition =  coin.mesh.localToWorld(new THREE.Vector3());
            let diffPos = airplane.mesh.position.clone().sub(coin.mesh.position.clone());
            let d = diffPos.length();
            if (d<game.coinDistanceTolerance){
            this.coinsPool.unshift(this.coinsInUse.splice(i,1)[0]);
            this.mesh.remove(coin.mesh);
            particlesHolder.spawnParticles(coin.mesh.position.clone(), 5, 0x009999, .8);
            addEnergy();
            i--;
            }else if (coin.angle > Math.PI){
            this.coinsPool.unshift(this.coinsInUse.splice(i,1)[0]);
            this.mesh.remove(coin.mesh);
            i--;
            }
        }
    }
}

export default CoinsHolder;