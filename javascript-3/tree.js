import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import {tree as createTree} from '../javascript-1/tree.js'
import _ from 'lodash'

const readdir = promisify(fs.readdir);

const tree = async (dir, depth) => {
  const countResult =  { directoriesCount: 0, filesCount: 0, }
  const treeResult = { name: dir, items: [], }

  async function traverse(dirPath, currentDepth, obj = defaultItem) {
    if (currentDepth > depth) {
      return;
    }

    const entries = await readdir(dirPath, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name)
      const isDirectory = entry.isDirectory()

      if (isDirectory) {
        countResult.directoriesCount += 1
        const subResult = await traverse(fullPath, currentDepth + 1,  {name: entry.name, items: []})
        obj.items.push(subResult)
      } else {
        countResult.filesCount += 1
        obj.items.push({name: entry.name})
      }
      obj.items = _.compact(obj.items)
    }

    return obj
  }

  await traverse(dir, 0, treeResult)

  return {
    count: countResult,
    tree: treeResult,
  }
}

(async () => {
  const depthKeys = ['--depth', '-d']
  const dir = process.argv[2]

  if (process.argv[3] && !depthKeys.includes(process.argv[3])) {
    console.error(`Disallowed key: ${process.argv[3]}`)
    console.error(`Allowed keys: ${depthKeys.join(', ')}`)
    return
  }

  if (!process.argv[4]) {
    console.error(`Depth required. `)
    console.error(`Example: node tree.js ./ -d 4 `)
    return
  }

  const depth = parseInt(process.argv[4], 10)
  const result = await tree(dir, depth)
  console.log(createTree(result.tree))
  console.log(`Directories: ${result.count.directoriesCount}, files: ${result.count.filesCount}`)
})()