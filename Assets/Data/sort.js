/** @format */

const fs = require('fs')
const path = require('path')

function generateRandomNumberArray(min, max) {
    const count = max - min + 1
    const n = []
    const random = Math.random()
    const minIndex = Math.floor(random * count)
    const maxIndex = Math.floor((1 - random) * count)
    for (let i = 0; i < count; i++) {
        const value = min + Math.floor(Math.random() * count)
        n[i] = value
    }
    n[minIndex] = min
    n[maxIndex] = max
    return n
}

const data = generateRandomNumberArray(1, 1e5)

fs.writeFileSync(
    path.resolve(__dirname, 'sort.json'),
    JSON.stringify({
        data,
    }),
    'utf-8',
)
