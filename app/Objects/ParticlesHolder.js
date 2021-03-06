import Particle from './Particle';

class ParticlesHolder {
    constructor(particlesPool){
        this.particlesPool = particlesPool;
        this.mesh = new THREE.Object3D();
        this.particlesInUse = [];
    }
    spawnParticles(pos, density, color, scale){
        let nPArticles = density;
        for (let i=0; i<nPArticles; i++){
            let particle;
            if (this.particlesPool.length) {
                particle = this.particlesPool.pop();
            }else{
                particle = new Particle();
            }
            this.mesh.add(particle.mesh);
            particle.mesh.visible = true;
            let _this = this;
            particle.mesh.position.y = pos.y;
            particle.mesh.position.x = pos.x;
            particle.explode(pos,color, scale);
        }
    }
}

export default ParticlesHolder;