module.exports = function(chainy){
	"use strict";
	var regex = /chainy-plugin-/
	var plugins = {}
	var packageData = require(process.cwd()+'/package.json')
	Object.keys(packageData.dependencies).concat(Object.keys(packageData.devDependencies))
		.forEach(function(dependencyName){
			var match = regex.exec(dependencyName)
			if ( match ) {
				var pluginName = match.input.replace(regex, '')
				plugins[pluginName] = true
			}
	})
	var pluginsNames = Object.keys(plugins)
	chainy.require(pluginsNames)
}
module.exports.extensionType = 'custom'