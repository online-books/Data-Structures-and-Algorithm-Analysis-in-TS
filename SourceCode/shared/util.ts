/** @format */

export function compareFn(decrease = true) {
    return (a: number, b: number): -1 | 1 => {
        if (decrease) {
            if (a > b) {
                return -1
            }
            return 1
        } else {
            if (a > b) {
                return 1
            }
            return -1
        }
    }
}

export function generateRandomKeys(characters: string, keyLength: number, num: number): string[] {
    if (keyLength >= characters.length) {
        throw new Error(`The key length has to be at most ${characters.length}`)
    }
    const keys: string[] = []
    for (let i = 0; i < num; i++) {
        let key = ''
        for (let j = 0; j < keyLength; j++) {
            const index = Math.floor(Math.random() * characters.length)
            key += characters[index]
        }
        keys.push(key)
    }
    return keys
}

export function swap(n: any[], from: number, to: number): void {
    const temp = n[to]
    n[to] = n[from]
    n[from] = temp
}

export function midian3(n: number[], start = 0, end = n.length - 1): number {
    if (end < 2) {
        throw new Error('n has at least 3 elements')
    }
    const middle = Math.floor((start + end) / 2)
    if (n[start] > n[middle]) {
        swap(n, start, middle)
    }
    if (n[start] > n[end]) {
        swap(n, start, end)
    }
    if (n[middle] > n[end]) {
        swap(n, middle, end)
    }
    swap(n, end - 1, middle)
    return n[end - 1]
}
