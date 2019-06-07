const path = require('path')

module.exports = {
  get: () => {
    let pathName = path.dirname(__filename)
    const vuePagesPathName = path.normalize(path.join(pathName, '../pages/vue'))

    const staticPathName = path.normalize(path.join(pathName, '../static'))
    const htmlPagesPathName = path.normalize(path.join(staticPathName, '/slides'))

    const assetsPathName = path.normalize(path.join(pathName, '../assets'))
    const outputFileName = path.normalize(path.join(assetsPathName, '/pages.json'))

    return { vuePagesPathName, htmlPagesPathName, outputFileName }
  }
}
