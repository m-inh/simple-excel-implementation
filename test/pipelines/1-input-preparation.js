const fs = require('fs')
const path = require('path')

const {prepareInput} = require('../../src/pipelines/1-input-preparation')

function testFromFile(cb) {
    const inputFileStream = fs.createReadStream(path.join(__dirname, '../input.txt'))

    const expectedOutput = [
        {name: 'A1', content: '5'},
        {name: 'A2', content: 'A1 5 * B1 +'},
        {name: 'B1', content: '6'}
    ]

    prepareInput(inputFileStream, (cells) => {
        const success = cells.reduce((result, c, i) => {
            return result && !!expectedOutput.find(o => o.name === c.name && o.content === c.content)
        }, true)

        cb(success)
    })
}

// expected !== reality
function testFromFileFail(cb) {
    const inputFileStream = fs.createReadStream(path.join(__dirname, '../input.txt'))

    const expectedOutput = [
        {name: 'A1', content: '5'},
        {name: 'A2', content: 'A1 5 * B1'},
        {name: 'B1', content: '6'}
    ]

    prepareInput(inputFileStream, (cells) => {
        const success = cells.reduce((result, c, i) => {
            return result && !!expectedOutput.find(o => o.name === c.name && o.content === c.content)
        }, true)

        cb(success)
    })
}

module.exports = {
    testFromFile,
    testFromFileFail
}