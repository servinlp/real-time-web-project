import socket from './socket_connection.js'

function joinRoomButton() {

	const button = document.querySelector( 'button' )

	button.addEventListener( 'click', joinRoom )

}

function joinRoom() {

	socket.emit( 'join_room' )

}

// socket.on( 'wait_for_another_player', () => {

// 	const button = document.querySelector( 'button' ),
// 		p = document.querySelector( 'p' )

// 	button.classList.add( 'hide' )
// 	p.classList.add( 'show' )
	
// } )

export default joinRoomButton