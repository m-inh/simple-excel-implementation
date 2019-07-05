const fs = require('fs')
const path = require('path')

const {prepareInput} = require("../../src/pipelines/1-input-preparation");
const {detectFormula} = require("../../src/pipelines/2-formula-detection");
const {detectCircular} = require("../../src/pipelines/3-circular-detection");
const {resolveAllFormula} = require("../../src/pipelines/4-formula-resolver");
const {format} = require("../../src/pipelines/5-output-formater");

function promisify(func, ...params) {
    return new Promise((resolve) => {
        func(...params, resolve)
    })
}

async function testAllPipeline() {
    const inputFileStream = fs.createReadStream(path.join(__dirname, '../input.txt'))

    const expected = 'A1\n5\nA2\n31\nB1\n6'

    const cells = await promisify(prepareInput, inputFileStream)
    const detectedFormula = await promisify(detectFormula, cells)
    const detectedCircular = await promisify(detectCircular, detectedFormula)
    const resolvedFormula = await promisify(resolveAllFormula, detectedCircular)
    const output = format(resolvedFormula)

    return expected === output
}

async function testAllPipelineCircularDependency() {
    const inputFileStream = fs.createReadStream(path.join(__dirname, '../circular-dependency-input.txt'))

    const expected = 'Circular dependency between A1 and A2 detected'

    const cells = await promisify(prepareInput, inputFileStream)
    const detectedFormula = await promisify(detectFormula, cells)
    const detectedCircular = await promisify(detectCircular, detectedFormula)
    const output = format(detectedCircular)

    return expected === output
}

module.exports = {
    testAllPipeline,
    testAllPipelineCircularDependency
}