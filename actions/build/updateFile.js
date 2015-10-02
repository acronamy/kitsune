var fs = require('fs')

//update existing
module.exports = function(fullPath,content,cb){
	fs.writeFile(fullPath,content,"utf8",function(err){
		if(err) console.log(err)
		if(cb) cb()
	})
}
