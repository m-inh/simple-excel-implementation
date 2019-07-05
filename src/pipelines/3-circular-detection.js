function detectCircular(cells, cb) {
    cb(cells.map((c) => {
        return {
            ...c,
            circular_with: getCircularWith(c.content, c.name, c.content, cells)
        }
    }))
}

function isCellName(text) {
    const pattern = /[a-zA-Z]/g
    return pattern.test(text)
}

function getCircularWith(content, root, cWith, cells) {
    if (!isCellName(content)) {
        return null
    } else {
        const cellNames = content.split(' ').filter(cn => isCellName(cn))
        return cellNames.reduce((acc, cn, i) => {
            return acc ? acc : (cn === root ? cWith : getCircularWith(cells.find(c => c.name === cn).content, root, cWith, cells))
        }, null)
    }
}

module.exports = {
    detectCircular,
    getCircularWith
}