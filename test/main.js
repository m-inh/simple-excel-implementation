const {testAllPipeline, testAllPipelineCircularDependency} = require("./pipelines/all-pipeline");
const {testFromFile, testFromFileFail} = require('./pipelines/1-input-preparation')
const {testDetectFormula, testIsFormula} = require('./pipelines/2-formula-detection')
const {testDetectCircular} = require('./pipelines/3-circular-detection')
const {testResolveAllFormula, testResolveFormula} = require('./pipelines/4-formula-resolver')
const {testFormat, testFormatWithCircular} = require('./pipelines/5-output-formater')

function main() {
    const successMsg = 'success 🎉'
    const failMsg = 'fail 🙊'

    testFromFile((success) => {
        console.log('1-prepare-input, testFromFile:', success ? successMsg : failMsg)
    })

    testFromFileFail((success) => {
        console.log('1-prepare-input, testFromFileFail:', success ? failMsg : successMsg)
    })

    testDetectFormula((success) => {
        console.log('2-formula-detection, testDetectFormula:', success ? successMsg : failMsg)
    })

    testIsFormula((success) => {
        console.log('2-formula-detection, testIsFormula:', success ? successMsg : failMsg)
    })

    testDetectCircular((success) => {
        console.log('3-circular-detection, detectCircular:', success ? successMsg : failMsg)
    })

    testResolveAllFormula((success) => {
        console.log('4-formula-resolver, testResolveAllFormula:', success ? successMsg : failMsg)
    })

    testResolveFormula((success) => {
        console.log('4-formula-resolver, testResolveFormula:', success ? successMsg : failMsg)
    })

    testFormat((success) => {
        console.log('5-output-formatter, testFormat:', success ? successMsg : failMsg)
    })

    testFormatWithCircular((success) => {
        console.log('5-output-formatter, testFormatWithCircular:', success ? successMsg : failMsg)
    })

    testAllPipeline()
        .then(success => {
            console.log('all-pipeline, testAllPipeline:', success ? successMsg : failMsg)
        })

    testAllPipelineCircularDependency()
        .then(success => {
            console.log('all-pipeline, testAllPipelineCircularDependency:', success ? successMsg : failMsg)
        })
}

module.exports = main