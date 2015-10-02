var fs = require('fs')


//write a blank file
module.exports = function(fullPath,cb){
	fs.writeFile(fullPath,"","utf8",function(err){
		if(err) console.log(err)
		if(cb) cb()
	})
}
