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

export function midian3(n: number[], left = 0, right = n.length - 1): number {
    if (right - left < 2) {
        throw new Error('n has at least 3 elements')
    }
    const center = Math.floor((left + right) / 2)
    if (n[left] > n[center]) {
        swap(n, left, center)
    }
    if (n[left] > n[right]) {
        swap(n, left, right)
    }
    if (n[center] > n[right]) {
        swap(n, center, right)
    }
    swap(n, right - 1, center)
    return n[right - 1]
}
