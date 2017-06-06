
			let scene, camera, renderer,
				keyState = {},
				ambience,
				geometry, material, cube,
				stats = new Stats()
	
			function init() {
				scene = new THREE.Scene()
				camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

				renderer = new THREE.WebGLRenderer()
				renderer.setSize(window.innerWidth, window.innerHeight)
				document.body.appendChild(renderer.domElement)

				window.addEventListener("keydown", e => keyState[e.code] = true)
				window.addEventListener("keyup", e => keyState[e.code] = false)
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
				if (keyState["ArrowUp"]) {
					cube.rotation.x += 0.02
				}
				if (keyState["ArrowDown"]) {
					cube.rotation.x -= 0.02
				}
				if (keyState["ArrowLeft"]) {
					cube.rotation.y += 0.02
				}
				if (keyState["ArrowRight"]) {
					cube.rotation.y -= 0.02
				}
				cube.rotation.x = Math.max(-1.3, Math.min(cube.rotation.x, 1.6))
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
