var path = require("path"),
		__root = require("./getRoot.js")

module.exports = function(key){
	if(key) return require(path.join(__root,"load.json")).path[key].replace(".",__root)
	else console.log("Please select a key from load json, path key")
}
