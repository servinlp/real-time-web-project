import { playerArea } from './init_canvases.js'

let sse

function initilizeSSE() {

	sse = new EventSource( '/sse' )

	sse.addEventListener( 'open', sseOpen )
	sse.addEventListener( 'error', sseError )

	sse.addEventListener( 'slack-message', receiveMessage )

	window.addEventListener( 'beforeunload', () => {

		sse.close()

	} )

}

function receiveMessage( e ) {

	const message = JSON.parse( e.data ),
		scoreEl = document.querySelector( '.score span' ),
		currentScore = parseInt( scoreEl.textContent ),
		highEl = document.querySelector( '.highscore' ),
		highScoreEl = document.querySelector( '.highscore span' ),
		currentHighScore = parseInt( highScoreEl.textContent )

	console.log( message )

	scoreEl.textContent = currentScore + 1

	if ( currentScore + 1 > currentHighScore ) {

		highEl.classList.add( 'new-highscore' )
		highScoreEl.textContent = currentHighScore + 1

	}

	playerArea.renderMessage( message )

}

function sseOpen( e ) {

	console.log( 'sseOpen', e )

	const server = document.querySelector( '.error.server' )

	server.classList.remove( 'show' )

}

function sseError( e ) {

	console.log( 'sseError', e )

	if ( e.target.readyState === 2 ) {

		const server = document.querySelector( '.error.server' )

		server.classList.add( 'show' )

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