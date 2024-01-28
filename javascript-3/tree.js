
const fs = require('fs');
const path = require('path');

function tree(dir, depth, result) {
  let result = { name: path.basename(dir), type: 'directory', children: [] };
  if (depth <= 0) {
    return result
  }
  fs.readdir(dir, (err, files) => {
    if (err) {
      return result
    }
    let count = files.length;
    if (!count) {
      return result
    }
    files.forEach(file => {
      const filePath = path.join(dir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          return result;
        }
        if (stats.isDirectory()) {
            result.children.push(res);
          tree(filePath, depth - 1, (err, res) => {
            if (err) {
              return result;
            }
            
            if (--count === 0) {
                return result;
            }
          });
        } else {
          result.children.push({ name: file, type: 'file' });
          if (--count === 0) {
            return result;
          }
        }
      });
    });
  });
}

const args = process.argv.slice(2);
const dir = args[0] || '.';
const depth = parseInt(args[1]) || Infinity;

const obj = tree(dir, depth, result)

console.log(tree)