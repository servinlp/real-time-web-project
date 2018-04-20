let socket

fetch( 'https://slack.com/api/rtm.connect?token=xoxp-13771535971-309888486722-349326280212-925fe6101525b0ee43b98cf1f652e293' )
	.then( res => res.json() )
	.then( res => {

		console.log( res )
		socket = io.connect( res.url )

		socket.on( 'message', data => {

			console.log( data )

		} )

		socket.on( 'message.im', data => {

			console.log( data )

		} )
		
	} )
	.catch( err => console.log( err ) )

export default socket