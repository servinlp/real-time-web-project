import socket from './socket_connection.js'
import Player from './player.js'

let playerAreaOne, playerAreaTwo

class PlayerArea {

	constructor() {

		this.scene = new THREE.Scene()
		this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
		this.renderer = new THREE.WebGLRenderer()
		this.canvas = this.renderer.domElement
		this.controls = new THREE.OrbitControls( this.camera )
		this.controls.enableKeys = false

		this.camera.position.z = 100

		this.renderer.setSize( window.innerWidth, window.innerHeight )
		this.renderer.setPixelRatio( window.devicePixelRatio )
		this.player = new Player()

		this.scene.add( this.player.playerObject )

		window.addEventListener( 'resize', this.resize.bind( this ) )

		document.body.appendChild( this.canvas )

		const axes = new THREE.AxesHelper( 5 )
		this.scene.add( axes )

		const hemisphereLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 )
		this.scene.add( hemisphereLight )

		this.renderer.animate( this.animate.bind( this ) )

	}

	animate() {

		this.renderer.render( this.scene, this.camera )

	}

	resize() {

		this.renderer.setSize( window.innerWidth, window.innerHeight )
		this.renderer.setPixelRatio( window.devicePixelRatio )

		this.camera.aspect = window.innerWidth / window.innerHeight
		this.camera.updateProjectionMatrix()

	}
	
}


function initCanvases() {

	playerAreaOne = new PlayerArea()

	console.log( 'PlayerArea', playerAreaOne )

}

// socket.on( 'ready_to_play', () => {

// 	const button = document.querySelector( 'button' )
// 	button.classList.add( 'hide' )

// 	playerAreaTwo = new PlayerArea()

// } )

// socket.on( 'found_a_player', () => {

// 	const p = document.querySelector( 'p' )
// 	p.classList.remove( 'show' )

// 	playerAreaTwo = new PlayerArea()

// } )

export default initCanvases
export {
	PlayerArea,
	playerAreaOne, 
	playerAreaTwo
}