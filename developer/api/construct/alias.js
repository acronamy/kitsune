module.exports = function(pre_compile,schema){
	var prepModel = schema.split("}"),
			insertNamespace = prepModel[0] = pre_compile,
			compile = prepModel.join("")
	return compile
}
