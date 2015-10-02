var path = require("path"),
		__root = require("./getRoot.js")

module.exports = require(path.join(__root,"load.json")).convention_schema.component

