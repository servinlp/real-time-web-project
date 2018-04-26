
class Player {

	constructor() {

		this.playerObject = new THREE.Object3D()
		this.clicks = {}
		this.velocity = [
			90, // Rotation
			0  // Front
		]
		this.speedLimit = 0.5

		this.buildPlayer()
		
		document.addEventListener( 'keydown', this.startClick.bind( this ) )
		document.addEventListener( 'keyup', this.stopClick.bind( this ) )

		window.requestAnimationFrame( this.animate.bind( this ) )

	}

	buildPlayer() {

		const container = new THREE.Object3D(),

			containerBoxGeometry = new THREE.BoxGeometry( 5, 12, 5 ),
			containerBoxMaterial = new THREE.MeshBasicMaterial( { transparent: true, opacity: 0, wireframe: false } ),
			containerBox = new THREE.Mesh( containerBoxGeometry, containerBoxMaterial ),

			bodyGeometry = new THREE.BoxGeometry( 3, 5, 1 ),
			bodyMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: false } ),
			body = new THREE.Mesh( bodyGeometry, bodyMaterial ),

			frontGeometry = new THREE.BoxGeometry( 2, 2, 2 ),
			frontMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: false } ),
			front = new THREE.Mesh( frontGeometry, frontMaterial ),

			leftWingGeometry = new THREE.BoxGeometry( 1, 2, 1 ),
			leftWingMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: false } ),
			leftWing = new THREE.Mesh( leftWingGeometry, leftWingMaterial ),

			rightWingGeometry = new THREE.BoxGeometry( 1, 2, 1 ),
			rightWingMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: false } ),
			rightWing = new THREE.Mesh( rightWingGeometry, rightWingMaterial ),

			canonGeometry = new THREE.BoxGeometry( 0.4, 3, 0.4 ),
			canonMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: false } ),
			canon = new THREE.Mesh( canonGeometry, canonMaterial )

		front.translateY( 3.5 )
		leftWing.translateX( -2 )
		rightWing.translateX( 2 )
		canon.translateY( 5.9 )

		containerBox.name = 'containerBox'

		container.add( containerBox )
		container.add( body )
		container.add( front )
		container.add( leftWing )
		container.add( rightWing )
		container.add( canon )

		container.rotation.z = ( Math.PI / 180 ) * -90

		this.playerObject.add( container )

	}

	animate() {

		this.handleClicks()

		let angle = ( Math.PI / 180 ) * this.velocity[ 0 ]

		this.playerObject.rotation.z = angle
		this.playerObject.position.x += Math.cos( angle ) * this.velocity[ 1 ]
		this.playerObject.position.y += Math.sin( angle ) * this.velocity[ 1 ]

		window.requestAnimationFrame( this.animate.bind( this ) )

	}

	handleClicks() {

		if ( this.clicks.ArrowUp && this.velocity[ 1 ] !== this.speedLimit ) {

			this.velocity[ 1 ] += 0.008

		}

		if ( !this.clicks.ArrowUp && this.velocity[ 1 ] >= 0 ) {

			this.velocity[ 1 ] -= 0.015

		}

		if ( this.clicks.ArrowDown && this.velocity[ 1 ] !== this.speedLimit ) {

			this.velocity[ 1 ] -= 0.015

		}

		if ( !this.clicks.ArrowDown && this.velocity[ 1 ] ) {

			this.velocity[ 1 ] += 0.008

		}

		if ( this.clicks.ArrowLeft ) {

			this.velocity[ 0 ] += 2

		}

		if ( this.clicks.ArrowRight ) {

			this.velocity[ 0 ] -= 2

		}

	}

	startClick( e ) {

		this.clicks[ e.key ] = true

	}

	stopClick( e ) {

		this.clicks[ e.key ] = false

	}

}

export default Player