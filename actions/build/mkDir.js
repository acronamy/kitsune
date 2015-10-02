var fs = require('fs')

module.exports = function readDir(dir,cb){
	fs.readdir(dir, function(err,res){
		if(err){
			fs.mkdir(dir,function(err){
				if(err) return false; //well I know this doesnt do anything but theres an error that doesnt cause us any problems but crashes the server so lets just return nothing, to async, which is pointless but hey. While we are on the subject, I would have used promises but has problems with looping, I have solved this issue before in another project but hey nvm.
			})
			if(cb) cb()
		}
	})
}
