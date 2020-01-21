export default abstract class HashTable {
    protected tableSize: number;
    constructor(size: number) {
        this.tableSize = size;
    }

    abstract find(value: string): void;

    abstract insert(value: string): void;

    abstract delete(value: string): void;

    protected hash(str: string): number {
        let hashVal = 0;
        for (let i = 0, j = str.length; i < j; i++) {
            const point = str.codePointAt(i) as number;
            hashVal = (hashVal << 5) + point;
        }
        return hashVal % this.tableSize;
    }
}