var path = require("path"),
		__root = require("./getRoot.js")

module.exports = function(test){
	if(test) return require(path.join(__root,"load.json")).features[test]
	else return require(path.join(__root,"load.json")).features
}
