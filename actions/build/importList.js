var path = require("path"),
		api = require("../../developer/api/api_index.js"),
		fs = require("fs")

var mainStyleIndexPath = api.core.getPath("kitsune_style")

//"@import '../components/'"
var tmpArr = []

module.exports = function(component){
	var componentPath = "@import '"+path.join("components",component,component+"_main.styl")+"'"
			tmpArr.push(componentPath)
			var len = tmpArr.length,
			formatted = tmpArr.join("\n")
	fs.readFile(mainStyleIndexPath,"utf8",function(err,res){
		if(err) console.log(err)
		fs.writeFile(mainStyleIndexPath,formatted,function(err){
			if(err) console.log(err)
			else require('../locals.js')()
		})
	})
}
