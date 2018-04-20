const room_name = 'game'

function handleSockets( socket, io ) {

	console.log( 'Connected' )

	socket.on( 'join_room', () => {

		socket.join( room_name )
		
		if ( io.sockets.adapter.rooms[ room_name ].length === 1 ) {

			socket.emit( 'wait_for_another_player' )

		} else {

			socket.emit( 'ready_to_play' )
			socket.broadcast.to( room_name ).emit( 'found_a_player' )

		}

	} )

}

module.exports = handleSockets 