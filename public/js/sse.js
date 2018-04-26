import { playerArea } from './init_canvases.js'

let sse

function initilizeSSE() {

	sse = new EventSource( '/sse' )

	sse.addEventListener( 'open', sseOpen )
	sse.addEventListener( 'error', sseError )

	sse.addEventListener( 'slack-message', receiveMessage )

	window.addEventListener( 'beforeunload', () => {

		console.log( 'close' )
		sse.close()

	} )

}

function receiveMessage( e ) {

	console.log( 'receiveMessage', e )

	const message = JSON.parse( e.data ),
		scoreEl = document.querySelector( '.score span' ),
		currentScore = parseInt( scoreEl.textContent )

	console.log( message )

	scoreEl.textContent = currentScore + 1

	playerArea.renderMessage( message )

}

function sseOpen( e ) {

	console.log( 'sseOpen', e )

}

function sseError( e ) {

	console.log( 'sseError', e )

	if ( e.target.readyState === 2 ) {

		setTimeout( () => {

			console.log( 'reconnecting' )
			initilizeSSE()

		}, 2000 )

	}

}

export default initilizeSSE
export {
	sse
}