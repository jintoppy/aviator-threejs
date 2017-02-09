import AirPlane from '../Objects/AirPlane';
import Sea from '../Objects/Sea';
import Sky from '../Objects/Sky';
import CoinsHolder from '../Objects/CoinsHolder';
import Ennemy from '../Objects/Ennemy';
import EnnemiesHolder from '../Objects/EnnemiesHolder';
import Particle from '../Objects/Particle';
import ParticlesHolder from '../Objects/ParticlesHolder';

export const createPlane = (scene) => {
    airplane = new AirPlane();
    airplane.mesh.scale.set(.25,.25,.25);
    airplane.mesh.position.y = game.planeDefaultHeight;
    scene.add(airplane.mesh);
}

export const createSea = (scene) => {
  sea = new Sea();
  sea.mesh.position.y = -game.seaRadius;
  scene.add(sea.mesh);
}


export const createSky = (scene) => {
  sky = new Sky();
  sky.mesh.position.y = -game.seaRadius;
  scene.add(sky.mesh);
}

export const createCoins = () => {

  coinsHolder = new CoinsHolder(20);
  scene.add(coinsHolder.mesh)
}

export const createEnnemies = () => {
  for (let i=0; i<10; i++){
    let ennemy = new Ennemy();
    ennemiesPool.push(ennemy);
  }
  ennemiesHolder = new EnnemiesHolder();
  //ennemiesHolder.mesh.position.y = -game.seaRadius;
  scene.add(ennemiesHolder.mesh)
}

export const createParticles = () => {
  for (let i=0; i<10; i++){
    let particle = new Particle();
    particlesPool.push(particle);
  }
  particlesHolder = new ParticlesHolder();
  //ennemiesHolder.mesh.position.y = -game.seaRadius;
  scene.add(particlesHolder.mesh)
}

