var stylus = require("stylus"),
		api = require("../developer/api/api_index.js"),
		path = require("path"),
		fs = require('fs'),
		libs = require('./stylus-libs.js'),
		color = require('colors')

module.exports = function(cb){


fs.readFile(path.join(api.core.getPath("kitsune_style")), 'utf8',function(err,res){
	if(err) write_kitsune()
	stylus(res)
		.use(libs.koutoSwiss())
		.render(init_kitsune)
})

function write_kitsune(){
	require("./build/mkFile.js")(path.join(api.core.getPath("kitsune_style")))
}

function init_kitsune(err,css){
	if(err) console.log(color.grey("Bad Kitsune, very bad kitsune!"),"\n\n",err,"\n")
	write_css(css)
}

function write_css(css){
	fs.writeFile(path.join(api.core.getPath("dist"),"style","compressed","kitsune.min.css"),css,function(err){
		if(err) console.log(err)
	})
	if(cb) cb()
}

}
