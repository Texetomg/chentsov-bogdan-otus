import fs from 'fs'
import _ from 'lodash'
import { Transform } from 'stream'

const inputFilePath = process.argv[2]
const outputFilePath = 'output'
const spaceRegex = /\s+/
const wordsRegex = /[^a-zA-Z]/g

const readStream = fs.createReadStream(inputFilePath);
const writeStream = fs.createWriteStream(outputFilePath)

const countWordsTransform = new Transform({
    transform(chunk, encoding, callback) {
        const wordsMap = {}
        const words = chunk.toString().split(spaceRegex)
        const filteredWords = words.map(word => word.replace(wordsRegex, ''))
    
        filteredWords.forEach(filterdWord => {
            if (wordsMap[filterdWord]) {
                wordsMap[filterdWord] += 1
            }
            if (!wordsMap[filterdWord]) {
                wordsMap[filterdWord] = 1
            }
        })

        const result = _(wordsMap)
            .toPairs()
            .sortBy(0)
            .fromPairs()
            .values()
            .value()
            .toString()

        callback(null, result)
    }
})

readStream
    .pipe(countWordsTransform)
    .pipe(writeStream)


