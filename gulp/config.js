var path = require('path')

var projectRoot = exports.projectRoot = path.resolve(__dirname, '../')
var srcDir = exports.srcDir = path.join(projectRoot, 'src')
var bowerDir = exports.bowerDir = path.join(projectRoot, 'bower_components')

