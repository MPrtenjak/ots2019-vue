// https://ourcodeworld.com/articles/read/420/how-to-read-recursively-a-directory-in-node-js
const fs = require('fs')
const path = require('path')

module.exports = filewalker

function filewalker(level, baseDir, currentDir, tester, done) {
  let results = [];

  fs.readdir(currentDir, function(err, list) {
      if (err) return done(err);

      let pending = list.length;

      if (!pending) return done(null, results);

      list.forEach(function(file) {
          file = path.resolve(currentDir, file);

          fs.stat(file, function(err, stat){
              // If directory, execute a recursive call
              if (stat && stat.isDirectory()) {
                  // Add directory to array [comment if you need to remove the directories from the array]
                  filewalker(level + 1, baseDir, file, tester, function(err, res){
                      results = results.concat(res);
                      if (!--pending) done(null, results);
                  });
              } else {
                if (tester({ level, file })) results.push({ baseDir, file });

                if (!--pending) done(null, results);
              }
          });
      });
  });
};
