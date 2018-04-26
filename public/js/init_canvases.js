import socket from './socket_connection.js'
import Player from './player.js'
import { sse } from './sse.js'

let playerArea

class PlayerArea {

	constructor() {

		this.scene = new THREE.Scene()
		this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
		this.renderer = new THREE.WebGLRenderer()
		this.canvas = this.renderer.domElement
		// this.controls = new THREE.OrbitControls( this.camera )
		this.raycaster = new THREE.Raycaster()
		this.raycasterObjects = []

		// this.controls.enableKeys = false

		this.camera.position.z = 100

		this.renderer.setSize( window.innerWidth, window.innerHeight )
		this.renderer.setPixelRatio( window.devicePixelRatio )
		this.player = new Player()
		this.playerContainerBox = this.player.playerObject.getObjectByName( 'containerBox' )

		this.scene.add( this.player.playerObject )

		window.addEventListener( 'resize', this.resize.bind( this ) )

		document.body.appendChild( this.canvas )

		const axes = new THREE.AxesHelper( 5 )
		this.scene.add( axes )

		const hemisphereLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 )
		this.scene.add( hemisphereLight )

		this.renderer.animate( this.animate.bind( this ) )

		const fontLoader = new THREE.FontLoader()

		fontLoader.load( '/helvetiker_regular.typeface.json', font => {

			this.font = font

		} )

		this.fontMaterials = [
			new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } ), // front
			new THREE.MeshPhongMaterial( { color: 0xffffff } ) // side
		]

		console.log( 'player', this.player.playerObject )
		console.log( 'playerBox', this.playerContainerBox )

	}

	animate() {

		const v = this.playerContainerBox.geometry.vertices

		for ( let i = 0; i < v.length; i++ ) {

			const tempMatrix = new THREE.Matrix4()

			tempMatrix.identity().extractRotation( this.player.playerObject.matrixWorld )
			this.raycaster.ray.origin.setFromMatrixPosition( this.player.playerObject.matrixWorld )
			this.raycaster.ray.direction.set( v[ i ].x, v[ i ].y, v[ i ].z ).applyMatrix4( tempMatrix )

			const intersects = this.raycaster.intersectObjects( this.raycasterObjects )

			if ( intersects.length > 0 ) {

				const gameOver = document.querySelector( '.game-over' )
				gameOver.style.display = 'block'

				sse.close()
				this.renderer.animate( null )

			}

		}

		this.renderer.render( this.scene, this.camera )

	}

	resize() {

		this.renderer.setSize( window.innerWidth, window.innerHeight )
		this.renderer.setPixelRatio( window.devicePixelRatio )

		this.camera.aspect = window.innerWidth / window.innerHeight
		this.camera.updateProjectionMatrix()

	}

	renderMessage( messageObj ) {

		const scene = this.scene, raycasterObjects = this.raycasterObjects,
			geometry = new THREE.TextGeometry( messageObj.text, {
				font: this.font,
				size: 5,
				height: 2,
				curveSegments: 10,
				bevelEnabled: false,
				bevelThickness: 1,
				bevelSize: 2,
				bevelSegments: 2
			} ),
			mesh = new THREE.Mesh( geometry, this.fontMaterials ),
			pos = {
				x: this.getRandomNumberBetweenX( 100, 100 ),
				y: this.getRandomNumberBetweenX( 100, 100 )
			},
			reverse = {
				x: pos.x > 0 ? -pos.x : Math.abs( pos.x ),
				y: pos.y > 0 ? -pos.y : Math.abs( pos.y )
			},
			length = Math.sqrt( ( pos.x*pos.x ) + (pos.y*pos.y) ),
			corner = Math.sin( length / pos.y )

		console.log( 'length', length )
		console.log( length / pos.y )
		console.log( 'corner', corner )

		mesh.position.x = pos.x
		mesh.position.y = pos.y

		mesh.rotation.z = corner

		this.raycasterObjects.push( mesh )
		this.scene.add( mesh )

		TweenMax.to( mesh.position, 2, {
			x: reverse.x,
			y: reverse.y,
			ease: Strong.easeInOut,
			onComplete() {
				
				scene.remove( mesh )
				raycasterObjects.splice( raycasterObjects.indexOf( mesh ), 1 )
				console.log( 'remove', raycasterObjects )

			}
		} )

	}

	getRandomNumberBetweenX( min, max ){

		return min + ( Math.floor( Math.random() * ( max + 99 ) ) - 99 )
		
	}
	
}


function initCanvases() {

	playerArea = new PlayerArea()

	console.log( 'PlayerArea', playerArea )

}

export default initCanvases
export {
	PlayerArea,
	playerArea
}