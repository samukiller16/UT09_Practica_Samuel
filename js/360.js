var scene, camera, renderer;

function init() {
  // Configuración de la escena
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // Configuración del renderizador
  var canvas = document.getElementById("imagen360");
  renderer = new THREE.WebGLRenderer({ canvas: canvas });
  // Cargar la imagen 360º
  var loader = new THREE.TextureLoader();
  var texture = loader.load("./img/img360.jpg");

  // Configurar el material de la esfera para la imagen 360º
  var geometry = new THREE.SphereGeometry(500, 60, 40);
  var material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });
  var sphere = new THREE.Mesh(geometry, material);

  scene.add(sphere);

  // Ajustar la posición de la cámara
  camera.position.set(0, 0, 0);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // Manejo de eventos para la rotación
  var isDragging = false,
    previousMousePosition = { x: 0, y: 0 };

  renderer.domElement.addEventListener("mousedown", (event) => {
    isDragging = true;
  });

  renderer.domElement.addEventListener("mouseup", (event) => {
    isDragging = false;
  });

  renderer.domElement.addEventListener("mousemove", (event) => {
    var deltaMove = {
      x: event.offsetX - previousMousePosition.x,
      y: event.offsetY - previousMousePosition.y,
    };

    if (isDragging) {
      var deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(
          toRadians(deltaMove.y * 0.5),
          toRadians(deltaMove.x * 0.5),
          0,
          "XYZ"
        )
      );

      camera.quaternion.multiplyQuaternions(
        deltaRotationQuaternion,
        camera.quaternion
      );
    }

    previousMousePosition = {
      x: event.offsetX,
      y: event.offsetY,
    };
  });
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function toRadians(angle) {
  return angle * (Math.PI / 180);
}

// Manejo de eventos
window.addEventListener("resize", onWindowResize, false);

// Inicia la configuración
init();
animate();
