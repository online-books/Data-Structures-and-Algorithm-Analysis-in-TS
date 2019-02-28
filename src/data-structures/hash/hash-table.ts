export default class HashTable {
    protected tableSize: number;
    constructor(size: number) {
        this.tableSize = size;
    }
    protected hash (value: number | string): number {
        if (typeof value === 'string') {
            let code = 0;
            for (let i = 0; i < value.length; i++) {
                code += value.codePointAt(i) as number;
            }
            return code % this.tableSize;
        }
        return value % this.tableSize;
    }
}