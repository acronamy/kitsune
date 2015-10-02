//Based on load json settings, create directories and files required by kitsune, you can add more files via the load json files.
var fs = require('fs'),
		api = require("../developer/api/api_index.js"),
		__root = api.core.getRoot,
		path = require("path"),
		color = require("colors")

module.exports = function(changes){
	if(changes){//watch task, did changes happen?
		install_components(changes)
	}
	make_install_dir(function(){//run make install then run locals
		require('./locals.js')()
	})
}

function make_install_dir(cb){
	var install_dir = api.core.installSchema
	for(i in install_dir){
		var __install_paths = path.join(__root,install_dir[i])
		require("./build/mkDir.js")(__install_paths,install_components)
	}
	cb()
}

function install_components(changes){//if changes happen do this
	var mainStylIndex = path.join(__root,"kitsune.styl")//Update main styl index file
	if(!changes) var install_dir = api.core.componentList
	else var install_dir = changes
	//install dir will equate to an array of components that will all be passed

	//read components before we do anything
	var component_initial = fs.readdirSync(path.join(__root,"components"))

	for(i in install_dir){
		//for each component in this array
		require("./build/importList.js")(install_dir[i])//update style main index

		//path to write if doesnt exist already
		var __install_paths = path.join(__root,"components",install_dir[i])
		require("./build/mkDir.js")(__install_paths,populate_components,component_initial)//make a dir and populate with components
	}
}

function populate_components(pre_state){
	fs.readdir(path.join(__root,"components"),function(err,res){
		for(i in res){
			//compair
			var __full_path = path.join(__root,"components",res[i])
			if(pre_state.indexOf(res[i]) === -1) read_dir_scheam(res[i], __full_path)
		}
	})
}

function read_dir_scheam(component,filePath){
	var fileSchema = api.core.componentSchema.files
	for(i in fileSchema){
		var filename = api.construct.alias(component,fileSchema[i]),
				__full_path = path.join(filePath,filename)
		require("./build/mkFile.js")(__full_path, function(){
			create_sub_dir(filePath)
		})
	}
}

function create_sub_dir(filePath){
	var component_folders = api.core.componentSchema.folders
	for(i in component_folders){
		require("./build/mkDir.js")(path.join(filePath,component_folders[i]))
	}
}
