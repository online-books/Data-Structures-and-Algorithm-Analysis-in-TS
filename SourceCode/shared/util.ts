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