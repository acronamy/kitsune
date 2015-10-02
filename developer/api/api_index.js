var fs = require('fs'),
		path = require('path'),
		exportable = {}

//add a folder to the api and it all js files will be added to be required, folders are the api key names.

var res = fs.readdirSync(__dirname)
for(i in res){
	if(!/\./g.test(res[i])) nextRecurse(res[i])
}
function nextRecurse(dir){
	var content = fs.readdirSync(__dirname,dir)
	for(i in content){
		var clean_content = content[i].replace(/\s/g,"_")
		if(!/\./g.test(clean_content)){
			exportable[clean_content] = {}
			//read next level
			add_script(content[i],clean_content)
		}
	}
}

function add_script(scripts,namespace){
	var $ = fs.readdirSync(path.join(__dirname,scripts))
	for(i in $){
		exportable[namespace][$[i].split(".")[0]] = require(path.join(__dirname,scripts,$[i]))
	}
}
module.exports = exportable
