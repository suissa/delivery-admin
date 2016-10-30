const fs = require('fs')
const path = require('path')
const MODULES_PATH = './server/modules'

function getModules(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return (fs.statSync(path.join(srcpath, file)).isDirectory() && file.toLowerCase() !== 'app')
  })
}

module.exports = getModules(MODULES_PATH)
