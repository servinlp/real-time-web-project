import initilizeSSE from './sse.js'

let socket

if ( start ) {

	initilizeSSE()

}

if ( codeUrl ) {

	fetch( codeUrl )
		.then( res => res.json() )
		.then( res => {

			console.log( res )

		} )
		.catch( err => console.log( err ) )

	initilizeSSE()

}

export default socket