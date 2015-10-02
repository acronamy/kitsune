var fs = require('fs')

//if exists false then do mkdir and run cb
module.exports = function readDir(dir,cb,pre_state){
	fs.readdir(dir, function(err,res){
		if(err){
			fs.mkdir(dir,function(err){
				if(err) return false;
			})
			if(cb) cb(pre_state)
		}
	})
}
