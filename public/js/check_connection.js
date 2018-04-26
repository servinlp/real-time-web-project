
function checkConnection() {

	ping()

}

function ping() {

	fetch( '/ping' )
		.then( res => res.text() )
		.then( res => {

			const you = document.querySelector( '.error.you' )

			you.classList.remove( 'show' )

			ping()

		} )
		.catch( err => {

			const you = document.querySelector( '.error.you' )

			you.classList.add( 'show' )

			ping()

		} )

}

export default checkConnection