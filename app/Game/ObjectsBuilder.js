import AirPlane from '../Objects/AirPlane';
import Sea from '../Objects/Sea';
import Sky from '../Objects/Sky';
import CoinsHolder from '../Objects/CoinsHolder';
import Ennemy from '../Objects/Ennemy';
import EnnemiesHolder from '../Objects/EnnemiesHolder';
import Particle from '../Objects/Particle';
import ParticlesHolder from '../Objects/ParticlesHolder';

export const createPlane = (scene, game) => {
    let airplane = new AirPlane(game);
    airplane.mesh.scale.set(.25,.25,.25);
    airplane.mesh.position.y = game.planeDefaultHeight;
    scene.add(airplane.mesh);
    return airplane;
}

export const createSea = (scene, game) => {
  let sea = new Sea(game);
  sea.mesh.position.y = -game.seaRadius;
  scene.add(sea.mesh);
  return sea;
}


export const createSky = (scene, game) => {
  let sky = new Sky(game);
  sky.mesh.position.y = -game.seaRadius;
  scene.add(sky.mesh);
  return sky;
}

export const createCoins = (scene) => {
  let coinsHolder = new CoinsHolder(20);
  scene.add(coinsHolder.mesh)
}

export const createEnnemies = (scene) => {
  let ennemiesPool = [];
  for (let i=0; i<10; i++){
    let ennemy = new Ennemy();
    ennemiesPool.push(ennemy);
  }
  let ennemiesHolder = new EnnemiesHolder();
  //ennemiesHolder.mesh.position.y = -game.seaRadius;
  scene.add(ennemiesHolder.mesh)
}

export const createParticles = (scene) => {
  let particlesPool = [];
  for (let i=0; i<10; i++){
    let particle = new Particle();
    particlesPool.push(particle);
  }
  let particlesHolder = new ParticlesHolder();
  //ennemiesHolder.mesh.position.y = -game.seaRadius;
  scene.add(particlesHolder.mesh)
}

