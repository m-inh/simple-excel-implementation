const {detectCircular} = require('../../src/pipelines/3-circular-detection')

function testDetectCircular(cb) {
    const input = [
        {name: 'A1', content: 'A2', has_formula: true},
        {name: 'A2', content: 'A1', has_formula: true}
    ]

    const expected = [
        {name: 'A1', content: 'A2', has_formula: true, circular_with: 'A2'},
        {name: 'A2', content: 'A1', has_formula: true, circular_with: 'A1'}
    ]

    detectCircular(input, (output) => {
        const success = expected.reduce((rs, c) => {
            return rs && (output.find((o) => o.name === c.name).circular_with === c.circular_with)
        }, true)

        cb(success)
    })
}

module.exports = {
    testDetectCircular
}