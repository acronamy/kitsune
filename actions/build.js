//Based on load json settings, create directories and files required by kitsune, you can add more files via the load json files.
var fs = require('fs'),
		api = require("../developer/api/api_index.js"),
		__root = api.core.getRoot,
		path = require("path")

module.exports = function(changes){
	if(changes){//watch task
		install_components(changes)
	}
	make_install_dir(function(){
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

function install_components(changes){
	var mainStylIndex = path.join(__root,"kitsune.styl")//Update main file
	if(!changes) var install_dir = api.core.componentList
	else var install_dir = changes
	for(i in install_dir){
		require("./build/importList.js")(install_dir[i])//update style main index
		var __install_paths = path.join(__root,"components",install_dir[i])
		require("./build/mkDir.js")(__install_paths,populate_components)
	}
}

function populate_components(){
	fs.readdir(path.join(__root,"components"),function(err,res){
		for(i in res){
			var __full_path = path.join(__root,"components",res[i])
			read_dir_scheam(res[i], __full_path)
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
