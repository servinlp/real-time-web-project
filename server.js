const express = 	require( 'express' ),
	session = 		require( 'express-session' ),
	ejs = 			require( 'ejs' ),
	bodyParser = 	require( 'body-parser' ),
	fetch = 		require( 'node-fetch' ),
	SSE = 			require( 'express-sse' ),
	messageSSE = 	new SSE( [] ),
	handleSockets = require( './lib/socket' ),
	dotenv = 		require('dotenv').config(),
	app = 			express(),
	http = 			require( 'http' ).Server( app ),
	io = 			require( 'socket.io' )( http ),
	PORT = 			8000,
	path = process.env.NODE_ENV === 'production' ? 'http://slack-app.maddev.nl/' : `http://localhost:${ PORT }`

app.use( express.static( 'public' ) )
app.set( 'views', './views' )
app.set( 'view engine', 'ejs' )

app.use( session( {
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false }
} ) )

app.use( bodyParser.urlencoded( { extended: false } ) )
app.use( bodyParser.json() )

app.get( '*', ( req, res, next ) => {

	res.locals.path = path

	next()

} )
app.get( '/', ( req, res ) => {

	console.log( 'get /' )
	console.log( req.query )
	console.log( req.session )

	if ( req.session.code ) {

		res.locals.start = true
		res.locals.showButton = false

	} else if ( req.query.code ) {

		req.session.code = req.query.code
		res.locals.codeUrl = `https://slack.com/api/oauth.access?client_id=${ process.env.CLIENT }&client_secret=${ process.env.CLIENT_SECRET }&code=${ req.query.code }&redirect_uri=${ path }`
		res.locals.showButton = false

	} else {

		res.locals.client_id = process.env.CLIENT
		res.locals.showButton = true

	}

	res.render( 'index' )

} )

app.get( '/sse', ( req, res ) => {

	console.log( '/sse' )
	messageSSE.init( req, res )

} )

app.post( '/events', ( req, res ) => {

	console.log( req.body )

	if ( req.body.challenge ) {

		res.send( req.body.challenge )

	} else {

		messageSSE.send( req.body.event, 'slack-message' )

	}

} )

io.on( 'connection', socket => {

	handleSockets( socket, io )

} )

http.listen( PORT, () => {

	console.log( `On http://localhost:${ PORT }` )

} )