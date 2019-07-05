const {detectFormula, isFormula} = require('../../src/pipelines/2-formula-detection')

function testDetectFormula(cb) {
    const input = [
        {name: 'A1', content: '5'},
        {name: 'A2', content: 'A1 5 * B1 +'},
        {name: 'B1', content: '6'}
    ]

    const expected = [
        {name: 'A1', content: '5', has_formula: false},
        {name: 'A2', content: 'A1 5 * B1 +', has_formula: true},
        {name: 'B1', content: '6', has_formula: false}
    ]

    detectFormula(input, (output) => {
        const success = expected.reduce((rs, c) => {
            return rs && (output.find((o) => o.name === c.name).has_formula === c.has_formula)
        }, true)

        cb(success)
    })
}

function testIsFormula(cb) {
    const formula = 'A1 5 * B1 +'
    const notFormula = '52'

    cb(isFormula(formula) && !isFormula(notFormula))
}

module.exports = {
    testDetectFormula,
    testIsFormula
}