class Scene {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        
        this.init();
        this.createGeometry();
        this.animate();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.camera.position.z = 5;

        window.addEventListener('resize', () => {
            this.onResize();
        });
    }

    createGeometry() {
        // Create different geometry for each scene
        if (this.canvas.id === 'hero-canvas') {
            this.createHeroGeometry();
        } else if (this.canvas.id === 'about-canvas') {
            this.createAboutGeometry();
        } else if (this.canvas.id === 'showcase-canvas') {
            this.createShowcaseGeometry();
        }
    }

    createHeroGeometry() {
        const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
        const material = new THREE.MeshPhongMaterial({
            color: 0x4A90E2,
            wireframe: true
        });
        this.mesh = new THREE.Mesh(geometry, material);
        
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 1, 1);
        
        this.scene.add(this.mesh);
        this.scene.add(light);
    }

    createAboutGeometry() {
        const geometry = new THREE.IcosahedronGeometry(1, 0);
        const material = new THREE.MeshPhongMaterial({
            color: 0xFF3366,
            wireframe: true
        });
        this.mesh = new THREE.Mesh(geometry, material);
        
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 1, 1);
        
        this.scene.add(this.mesh);
        this.scene.add(light);
    }

    createShowcaseGeometry() {
        const geometry = new THREE.OctahedronGeometry(1, 0);
        const material = new THREE.MeshPhongMaterial({
            color: 0x4A90E2,
            wireframe: true
        });
        this.mesh = new THREE.Mesh(geometry, material);
        
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 1, 1);
        
        this.scene.add(this.mesh);
        this.scene.add(light);
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (this.mesh) {
            this.mesh.rotation.x += 0.01;
            this.mesh.rotation.y += 0.01;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize scenes when the page loads
window.addEventListener('load', () => {
    const heroScene = new Scene('hero-canvas');
    const aboutScene = new Scene('about-canvas');
    const showcaseScene = new Scene('showcase-canvas');
    
    // Update loader progress as scenes initialize
    let progress = 0;
    const updateProgress = () => {
        progress += 33.33;
        loader.update(progress);
    };

    updateProgress(); // Hero scene loaded
    updateProgress(); // About scene loaded
    updateProgress(); // Showcase scene loaded
});
