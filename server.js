const express = require( 'express' ),
	ejs = require( 'ejs' ),
	bodyParser = require( 'body-parser' ),
	fetch = require( 'node-fetch' ),
	handleSockets = require( './lib/socket' ),
	dotenv = require('dotenv').config(),
	app = express(),
	http = require( 'http' ).Server( app ),
	io = require( 'socket.io' )( http ),
	PORT = 8000

app.use( express.static( 'public' ) )
app.set( 'views', './views' )
app.set( 'view engine', 'ejs' )

app.use( bodyParser.urlencoded( { extended: false } ) )
app.use( bodyParser.json() )

app.get( '/', ( req, res ) => {

	console.log( 'get /' )

	if ( req.query.code ) {

		const url = `https://slack.com/api/oauth.access?client_id=${ process.env.CLIENT }&client_secret=${ process.env.CLIENT_SECRET }&code=${ req.query.code }`

		console.log( url )

		fetch( url )
			.then( result => result.json() )
			.then( result => {

				console.log( result )
				res.render( 'index' )

			} )
			.catch( err => {

				console.log( err )
				res.render( 'index' )

			} )

	} else {

		res.render( 'index' )

	}

} )

app.post( '/events', ( req, res ) => {

	console.log( req.body )
	res.send( req.body.challenge )

} )

io.on( 'connection', socket => {

	handleSockets( socket, io )

} )

http.listen( PORT, () => {

	console.log( `On http://localhost:${ PORT }` )

} )