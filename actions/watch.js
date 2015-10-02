var watcher = require("chokidar"),
		api = require("../developer/api/api_index.js"),
		__root = api.core.getRoot,
		path = require("path"),
		fs = require("fs"),
		color = require("colors"),
		mainJson = require(path.join(__root,"package.json")),
		font_components = api.core.componentSchema.font_components,
		cp = require('ncp').ncp

cp.limit = 16;

var load_settings = path.join(__root,"load.json")

module.exports = function(){
	var features = require(load_settings).features
	console.log("==================")
	for(i in features){
		console.log(color.grey(i+":"),features[i])
	}
	console.log("==================")
	console.log(color.cyan(mainJson.name,"is keeping an eye on things!"))
	watcher.watch(load_settings)
		.on('change',watch_load_json)
	watcher.watch(api.core.getPath("src"))
		.on('change',watch_files)

	for(i in font_components){
		var font_component_path = path.join(__root,"components",font_components[i])
		watcher.watch(font_component_path)
			.on("add",update_fonts)
	}

}

function watch_load_json(event, path){
	//new component
	fs.readFile(load_settings,"utf8",function(err,res){
		if(err) console.log(err)
		var changed_json = JSON.parse(res).component_list
		require("./build.js")(changed_json)
	})
}

function watch_files(path,evt){
	if(path.split(".").pop()=="styl") require('./locals.js')(function(){
		console.log(color.yellow("Compile changes >",path.split("/").pop()))
	})
}

function update_fonts(font_path,evt){
	if(font_path.split(".").pop()=='ttf'){
		var namespace = path.resolve(font_path,"../").split("/").pop(),
				dest = path.join(api.core.getPath("dist"),"style","compressed","fonts",namespace),
				src = path.resolve(font_path,"../")

		fs.readdir(dest,function(err,res){
			cp(src,dest,function(err){
				if(err) console.log(err)
				else console.log(color.yellow("Copying font "+namespace+" > to dist"))
			})
		})

	}
}
