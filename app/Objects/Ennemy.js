import Colors from '../constants/Colors';

class Enemy {
    constructor(){
        var geom = new THREE.TetrahedronGeometry(8,2);
        var mat = new THREE.MeshPhongMaterial({
            color:Colors.red,
            shininess:0,
            specular:0xffffff,
            shading:THREE.FlatShading
        });
        this.mesh = new THREE.Mesh(geom,mat);
        this.mesh.castShadow = true;
        this.angle = 0;
        this.dist = 0;
    }
}

export default Enemy;