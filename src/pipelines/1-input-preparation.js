const readline = require('readline')

function prepareInput(inputStream, cb) {
    const rl = readline.createInterface({
        input: inputStream
    })

    const cells = []
    let lineToRead = null
    let i = 0

    rl.on('line', (line) => {
        if (lineToRead === null) {
            lineToRead = parseInt(line) * 2
            return
        }

        if (i % 2 === 0) {
            // read cell name
            const cell = {name: line}
            cells.push(cell)
        } else {
            // read cell content
            const cell = cells[cells.length - 1]
            cell.content = line
        }

        i++

        if (i === lineToRead) {
            rl.close()
        }
    })

    rl.on('close', () => {
        cb(cells)
    })
}

module.exports = {
    prepareInput
}