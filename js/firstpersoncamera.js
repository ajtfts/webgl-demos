let scene, camera, renderer,
	ambience,
	geometry, material, cube,
	mousex = 0, mousey = 0

const keyState = {},
	  stats = new Stats(),
	  X_AXIS = new THREE.Vector3(1, 0, 0)
	  Y_AXIS = new THREE.Vector3(0, 1, 0)

function rotateAroundWorldAxis(object, axis, radians) {
	let rotWorldMatrix = new THREE.Matrix4()
	rotWorldMatrix.makeRotationAxis(axis.normalize(), radians)
	rotWorldMatrix.multiply(object.matrix)
	object.matrix = rotWorldMatrix
	object.rotation.setFromRotationMatrix(object.matrix)
}

function updatePosition(e) {
	rotateAroundWorldAxis(camera, Y_AXIS, -e.movementX/1000)
	camera.rotateX(-e.movementY/1000)
	console.log(camera.matrix)
}

function lockChangeAlert() {
	if (document.pointerLockElement === renderer.domElement) {
		document.addEventListener("mousemove", updatePosition, false)
	} else {
		document.removeEventListener("mousemove", updatePosition, false)
	}
}

function init() {
	scene = new THREE.Scene()
	camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 1000)

	renderer = new THREE.WebGLRenderer()
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)
	
	renderer.domElement.onclick = () => {
		renderer.domElement.requestPointerLock()
	}

	document.addEventListener("keydown", e => keyState[e.code] = true)
	document.addEventListener("keyup", e => keyState[e.code] = false)
	document.addEventListener("pointerlockchange", lockChangeAlert, false)
	window.addEventListener("resize", () => {
		renderer.setSize(window.innerWidth, window.innerHeight)
		renderer.setViewport(0, 0, window.innerWidth, window.innerHeight)
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
	})

	stats.showPanel(0)
	document.body.appendChild(stats.dom)

	geometry = new THREE.BoxGeometry(1, 1, 1)
	material = new THREE.MeshLambertMaterial( {
		color: 0x00ff00,
	} )
	cube = new THREE.Mesh(geometry, material)
	scene.add(cube)

	ambience = new THREE.AmbientLight(0x101010)
	scene.add(ambience)

	directionalLight = new THREE.DirectionalLight(0xffffff, 0.3)
	scene.add(directionalLight)

	camera.position.z = 5
}

function render() {
	requestAnimationFrame(render)
	stats.begin()

	if (keyState["KeyW"]) {
		camera.translateZ(-.05)
	}
	if (keyState["KeyS"]) {
		camera.translateZ(.05)
	}
	if (keyState["KeyA"]) {
		camera.translateX(-.05)
	}
	if (keyState["KeyD"]) {
		camera.translateX(.05)
	}
	if (keyState["KeyQ"]) {
		rotateAroundWorldAxis(camera, Y_AXIS, .03)
	}
	if (keyState["KeyE"]) {
		rotateAroundWorldAxis(camera, Y_AXIS, -.03)
	}
	if (keyState["ControlLeft"]) {
		camera.position.y -= .05
	}
	if (keyState["Space"]) {
		camera.position.y += .05
	}
	if (keyState["ArrowLeft"]) {
		rotateAroundWorldAxis(camera, Y_AXIS, 0.01)
	}
	if (keyState["ArrowRight"]) {
		rotateAroundWorldAxis(camera, Y_AXIS, -0.01)
	}
	if (keyState["ArrowDown"]) {
		camera.rotateX(-.01)
	}
	if (keyState["ArrowUp"]) {
		camera.rotateX(0.01)
	}



	renderer.render(scene, camera)
	stats.end()
}
	
if (Detector.webgl) {
	init()
	render()
} else {
	let warning = Detector.getWebGLErrorMessage()
	document.getElementById('container').appendChild(warning)
}
