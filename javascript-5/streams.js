import fs from 'fs'
import readLine from 'readline'
import _ from 'lodash'

const inputFilePath = process.argv[2]

const spaceRegex = /\s+/
const wordsRegex = /[^a-zA-Z]/g

const readStream = fs.createReadStream(inputFilePath);

const readLineInterface = readLine.createInterface({
    input: readStream,
})

const wordsMap = {}

readLineInterface.on('line', (line) => {
    const words = line.split(spaceRegex)
    const filteredWords = words.map(word => word.replace(wordsRegex, ''))
   
    filteredWords.forEach(filterdWord => {
        if (wordsMap[filterdWord]) {
            wordsMap[filterdWord] += 1
        }
        if (!wordsMap[filterdWord]) {
            wordsMap[filterdWord] = 1
        }
    })
})

readLineInterface.on('close', () => {
    
    const result = _(wordsMap)
        .toPairs()
        .sortBy(0)
        .fromPairs()
        .values()
        .value()

    console.log(result)
})


