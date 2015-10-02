//\\//\\//\\//\\//\\
//	Dependencies	\\
//\\//\\//\\//\\//\\
var	path = require('path'),
		api = require(path.join(__dirname,"developer","api","api_index.js"))

//\\//\\//\\//\\//\\
//	Build					\\
//\\//\\//\\//\\//\\
//Should I build your project for you?
if(api.core.features("build")) require("./actions/build.js")()

//\\//\\//\\//\\//\\
//	Watch					\\
//\\//\\//\\//\\//\\
//Should I watch for changes in the load json and also compile src to dist?
if(api.core.features("watch")) require("./actions/watch.js")()

//\\//\\//\\//\\//\\
//	Dev Server		\\
//\\//\\//\\//\\//\\
//Are you developing me, should I start the dev server on port of your choosing?
if(api.core.features("dev_server")) require("./developer/server/index.js")(8080)

//console.log(api)
