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


export function generateRandomKeys(characters: string, keyLength: number, num: number,) {
    if (keyLength >= characters.length) {
        throw new Error(`The key length has to be at most ${characters.length}`);
    }
    const keys: string[] = [];
    for (let i = 0; i < num; i++) {
        let key = '';
        for (let j = 0; j < keyLength; j++) {
            const index = Math.floor(Math.random() * characters.length);
            key += characters[index]
        }
        keys.push(key)
    }
    return keys;
}
