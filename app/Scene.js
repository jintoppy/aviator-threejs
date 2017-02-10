class Scene {
    constructor(game){
        this.HEIGHT = window.innerHeight;
        this.WIDTH = window.innerWidth;

        console.log(THREE.Scene);
        this.scene = new THREE.Scene();
        let aspectRatio = this.WIDTH / this.HEIGHT;
        let fieldOfView = 50;
        let nearPlane = .1;
        let farPlane = 10000;
        this.camera = new THREE.PerspectiveCamera(
            fieldOfView,
            aspectRatio,
            nearPlane,
            farPlane
            );
        this.scene.fog = new THREE.Fog(0xf7d9aa, 100,950);
        this.camera.position.x = 0;
        this.camera.position.z = 200;
        this.camera.position.y = game.planeDefaultHeight;
        //camera.lookAt(new THREE.Vector3(0, 400, 0));

        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(this.WIDTH, this.HEIGHT);

        this.renderer.shadowMap.enabled = true;

        let container = document.getElementById('world');
        container.appendChild(this.renderer.domElement);

        this.createLights();

        window.addEventListener('resize', this.handleWindowResize, false);

        /*
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.minPolarAngle = -Math.PI / 2;
        controls.maxPolarAngle = Math.PI ;

        //controls.noZoom = true;
        //controls.noPan = true;
        //*/
    }
    handleWindowResize() {
        this.HEIGHT = window.innerHeight;
        this.WIDTH = window.innerWidth;
        this.renderer.setSize(this.WIDTH, this.HEIGHT);
        this.camera.aspect = this.WIDTH / this.HEIGHT;
        this.camera.updateProjectionMatrix();    
    }

    createLights() {

        this.hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)

        this.ambientLight = new THREE.AmbientLight(0xdc8874, .5);

        this.shadowLight = new THREE.DirectionalLight(0xffffff, .9);
        this.shadowLight.position.set(150, 350, 350);
        this.shadowLight.castShadow = true;
        this.shadowLight.shadow.camera.left = -400;
        this.shadowLight.shadow.camera.right = 400;
        this.shadowLight.shadow.camera.top = 400;
        this.shadowLight.shadow.camera.bottom = -400;
        this.shadowLight.shadow.camera.near = 1;
        this.shadowLight.shadow.camera.far = 1000;
        this.shadowLight.shadow.mapSize.width = 4096;
        this.shadowLight.shadow.mapSize.height = 4096;

        let  ch = new THREE.CameraHelper(this.shadowLight.shadow.camera);

        //scene.add(ch);
        this.scene.add(this.hemisphereLight);
        this.scene.add(this.shadowLight);
        this.scene.add(this.ambientLight);

    }

}



export default Scene;