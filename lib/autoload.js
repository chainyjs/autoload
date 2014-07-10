"use strict";
module.exports = function(chainy){
	if ( chainy.autoloaded === true )  return
	chainy.autoloaded = true

	var regex = /chainy-plugin-/
	var plugins = {}
	var packageData = null

	// hopefully doing the require like this will enable browserify support
	try {
		packageData = require(process.cwd()+'/package.json')
	} catch (err) {
		return  // ignore, the user probably hasn't setup package.json yet
	}

	var deps =
		Object.keys(packageData.dependencies || {}).concat(Object.keys(packageData.devDependencies || {}))

	deps.forEach(function(dependencyName){
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