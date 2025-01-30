import "./index.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function createSphere(x, y, z) {
  const geometry = new THREE.SphereGeometry(0.5);
  const material = new THREE.MeshPhongMaterial({
    color: Math.random() * 0xffffff,
  });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.x = x;
  sphere.position.y = y;
  sphere.position.z = z;
  scene.add(sphere);
}

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onMouseMove(event) {
  event.preventDefault();
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onClick(event) {
  event.preventDefault();
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObject(cube);
  createSphere(
    intersects[0].point.x,
    intersects[0].point.y,
    intersects[0].point.z
  );
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 1;

const geometry = new THREE.BoxGeometry(10, 10, 10);
const texture = new THREE.TextureLoader().load("public/textures/cube.jpg");
texture.colorSpace = THREE.SRGBColorSpace;
texture.magFilter = THREE.NearestFilter;
const material = new THREE.MeshLambertMaterial({
  map: texture,
  side: THREE.DoubleSide,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.lookAt((0, 0, 0));
camera.position.set(25, 1, 1);

const dirLight = new THREE.DirectionalLight(0xffffff, 3);
dirLight.position.set(-1, 2, 4);
const ambLight = new THREE.AmbientLight(0x404040);
scene.add(dirLight);
scene.add(ambLight);

function animate() {
  controls.update();
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

document.getElementById("root").appendChild(renderer.domElement);
window.addEventListener("pointermove", onMouseMove);
window.addEventListener("resize", onWindowResize);
window.addEventListener("click", onClick);
