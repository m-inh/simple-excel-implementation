const {prepareInput} = require("./pipelines/1-input-preparation");
const {detectFormula} = require("./pipelines/2-formula-detection");
const {detectCircular} = require("./pipelines/3-circular-detection");
const {resolveAllFormula} = require("./pipelines/4-formula-resolver");
const {format} = require("./pipelines/5-output-formater");

function promisify(func, ...params) {
    return new Promise((resolve) => {
        func(...params, resolve)
    })
}

async function main() {
    console.log('Please type input follow the structure\n')
    const cells = await promisify(prepareInput, process.stdin)
    const detectedFormula = await promisify(detectFormula, cells)
    const detectedCircular = await promisify(detectCircular, detectedFormula)
    const hasCircularDeps = !!detectedCircular.find(c => c.circular_with !== null)

    let output = ''
    if (!hasCircularDeps) {
        const resolvedFormula = await promisify(resolveAllFormula, detectedCircular)
        output = format(resolvedFormula)
    } else {
        output = format(detectedCircular)
    }

    console.log('-> output:')
    console.log(output)
}

module.exports = main