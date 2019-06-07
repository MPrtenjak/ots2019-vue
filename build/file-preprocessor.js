const fs = require('fs')
const path = require('path')

module.exports = filePreprocessor

const pathSeparator = new RegExp('\\' + path.sep, 'g')
const htmlReg = new RegExp(/<template>([^]*)<\/template>/m)
const jsReg = new RegExp(/<script>([^]*)<\/script>/m)
const fileSortReg = new RegExp(/(\d+)/)
const commentsReg = new RegExp(/\/\*\*([^]*)\*\*\/([^]*)/m)
const commentsCaptReg = new RegExp(/caption:(.*)/)
const commentsDescReg = new RegExp(/description:(.*)/)
const slideTextReg = new RegExp(/slide-text-start([^]+)slide-text-end/)
const htmlCommentsReg = new RegExp('<!--([^]*)-->([\n\r])*', 'gm');

function getFileContent(file) {
  return fs.readFileSync(file, {encoding: 'utf8'})
}

function processComments(comments) {
  let caption = null
  let description = null
  let slideText = null

  if (comments) {
    comments = comments[1]
    caption = commentsCaptReg.exec(comments)
    description = commentsDescReg.exec(comments)
    slideText = slideTextReg.exec(comments)

    if (caption) caption = caption[1].trim()
    if (description) description = description[1].trim()
    if (slideText) slideText = slideText[1].split('\r\n').filter((line) => line)
  }

  return { caption, description, slideText }
}

function processFile(ext, fileName, fileContent) {
  function clearHTMLComents(content) {
    return content.replace(htmlCommentsReg, '')
  }

  function processJSFile() {
    let comments = commentsReg.exec(fileContent)

    return {
      html: null,
      js: (comments) ? comments[2] : fileContent,
      ...processComments(comments)
    }
  }

  function processVueFile() {
    let html = htmlReg.exec(fileContent)
    let js = jsReg.exec(fileContent)
    let comments = commentsReg.exec(fileContent)

    return {
      html: (html) ? html[1] : null,
      js: (js) ? js[1] : null,
      fileName,
      ...processComments(comments)
    }
  }

  function processHTMLFile() {
    let comments = commentsReg.exec(fileContent)

    return {
      html: clearHTMLComents(fileContent),
      js: null,
      ...processComments(comments)
    }
  }

  if (ext === 'html') return processHTMLFile()
  if (ext === 'js') return processJSFile()
  return processVueFile()
}
function getFolderInfo (folder) {
  if (folder == 'html') return { sort: 10, caption: 'HTML' }
  if (folder == 'java-script') return { sort: 20, caption: 'JavaScript' }
  if (folder == 'vue') return { sort: 30, caption: 'VUE' }

  return  { sort: 1000, caption: 'UNKNOWN!' }
}

function filePreprocessor() {
  return function({ baseDir, file }) {
    const baseDirFolders = baseDir.split('\\')
    baseDirFolders.pop()
    const baseLen = baseDirFolders.join('\\').length

    const baseName = file.substring(baseLen).replace(pathSeparator, '/')
    const fileExt = baseName.split('.')
    const folders = baseName.split('\/')

    const ext = fileExt[1]
    var link = null
    if (ext === 'vue') link = fileExt[0]
    if (ext === 'html') link = baseName.substring(1)

    const folder = folders[folders.length - 2]
    const fileName = folders[folders.length - 1]

    const fileContent = getFileContent(file)
    const fileInfo = processFile(ext, fileName, fileContent)
    const sort = fileSortReg.exec(fileName)
    fileInfo.caption = fileInfo.caption || fileName

    const folderInfo = getFolderInfo(folder)

    const retValue = {
      folder,
      folderCaption: folderInfo.caption,
      folderSort: folderInfo.sort,
      baseName,
      link,
      ext,
      sort: (sort) ? (1) * sort[1] : 100,

      ...fileInfo
    }

    return retValue
  }
}
