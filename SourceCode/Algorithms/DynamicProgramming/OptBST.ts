/** @format */

export interface Word {
    character: string
    probability: number
}

export default function optBST(words: Word[]): number {
    const {length} = words
    const table: number[][] = []
    const costs: number[][] = []
    for (let i = 0; i < length; i++) {
        costs[i] = []
        table[i] = []
        costs[i][i] = words[i].probability
        table[i][i] = words[i].probability
        for (let j = i + 1; j < length; j++) {
            costs[i][j] = costs[i][j - 1] + words[j].probability
        }
    }
    for (let k = 1; k < length; k++) {
        for (let left = 0; left < length - k; left++) {
            const right = left + k
            table[left][right] = Infinity
            for (let root = left; root <= right; root++) {
                const leftCost = root === left ? 0 : table[left][root - 1]
                const rightCost = root === right ? 0 : table[root + 1][right]
                const cost = leftCost + rightCost + costs[left][right]
                if (table[left][right] > cost) {
                    table[left][right] = Number(cost.toFixed(3))
                }
            }
        }
    }
    return table[0][length - 1]
}
