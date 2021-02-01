/** @format */

export default function optMatrix(columns: number[]): number {
    const table: number[][] = []
    const {length} = columns
    if (length < 2) {
        return 0
    }
    if (length === 2) {
        return columns[0] * columns[1]
    }
    for (let i = 1; i < length; i++) {
        table[i] = []
        table[i][i] = 0
    }
    for (let k = 1; k < length; k++) {
        for (let left = 1; left < length - k; left++) {
            const right = left + k
            table[left][right] = Infinity
            for (let i = left; i < right; i++) {
                const count = table[left][i] + table[i + 1][right] + columns[left - 1] * columns[i] * columns[right]
                if (table[left][right] > count) {
                    table[left][right] = count
                }
            }
        }
    }
    return table[1][length - 1]
}
