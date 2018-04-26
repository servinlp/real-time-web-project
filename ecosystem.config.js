module.exports = {
	apps : [{
	  name        : "Slack app",
	  script      : "./server.js",
	  watch       : true,
	//   ignore_watch: [ './public' ],
	  env: {
		"NODE_ENV": "development",
	  },
	  env_production : {
		 "NODE_ENV": "production"
	  }
	}]
  }
  