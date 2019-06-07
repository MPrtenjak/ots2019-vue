const fs = require('fs')
const path = require('path')
const _ = require('underscore')

const settings = require('./settings')
const fileWalker = require('./file-walker')
const filePreprocessor = require('./file-preprocessor')

function isValidFile({file}) {
  const ext = path.extname(file)
  return ((ext === '.vue') || (ext === '.js') || (ext === '.html'))
}

function process_group_sort_files(files) {
  const fp = filePreprocessor();

  const pages = _.chain(files)
    .map(file => fp(file))
    .sortBy((file) => file.sort)
    .sortBy((file) => file.folderSort)
    .map((page, idx) => { page.index = idx; return page })
    .toArray()
    .value()

  const folders = _.chain(pages)
    .groupBy(page => page.folderSort)
    .mapObject(group => _.sortBy(group, 'sort'))
    .mapObject((group, key) => { return {
      id: key,
      pages: _.map(group, 'index'),
      folder: group[0].folder,
      caption: group[0].folderCaption
    }})
    .toArray()
    .value()

  return { pages, folders }
}

function run() {
  const sett = settings.get()

  fileWalker(0, sett.vuePagesPathName, sett.vuePagesPathName, isValidFile, (err, files1) => {
    if (err) { console.log('ERROR: ', err); return }

    fileWalker(0, sett.htmlPagesPathName, sett.htmlPagesPathName, isValidFile, (err, files2) => {
      if (err) { console.log('ERROR: ', err); return }

      const files = files1.concat(files2)
      const groupedResults = process_group_sort_files(files)

      fs.writeFile(sett.outputFileName, JSON.stringify(groupedResults), 'utf8', function (err) {
        if (err) { console.log(err);}
      })
    })
  })
}

run()