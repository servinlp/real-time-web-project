import initCanvases from './init_canvases.js'
import connectToSlack from './connect_slack.js'

( function() {

	initCanvases()
	// connectToSlack()

	const highScoreEl = document.querySelector( '.highscore span' )

	if ( window.localStorage.getItem( 'highScore' ) ) {

		highScoreEl.textContent = window.localStorage.getItem( 'highScore' )

	} else {

		highScoreEl.textContent = '0'

	}

	var stats = new Stats();
	stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
	document.body.appendChild( stats.dom );

	function animate() {

		stats.begin();

		// monitored code goes here

		stats.end();

		requestAnimationFrame( animate );

	}

	requestAnimationFrame( animate );

} )()