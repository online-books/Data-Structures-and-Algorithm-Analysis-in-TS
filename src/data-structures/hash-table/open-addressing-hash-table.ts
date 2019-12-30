import HashTable from './hash-table';
/**
 * 平方探测法构建开放寻址哈希表
 */
export default class OpenAdressingHashTable extends HashTable {
    private tableList: any[];
    constructor(size: number) {
        super(size);
        this.tableList = new Array(size);
    }
    public insert(value: string) {
        const index = this.find(value);
        if (this.tableList[index] === undefined) {
            this.tableList[index] = value;
        }
    }
    public find(value: string): number {
        let index = this.hash(value);
        let collisionNum = 0;
        while (this.tableList[index] !== value && this.tableList[index] !== undefined) {
            index += 2 * ++collisionNum - 1;
            if (index >= this.tableSize) {
                index -= this.tableSize;
            }
        }
        return index;
    }
    public delete(value: string) {
        const index = this.find(value);
        this.tableList[index] = undefined;
    }
}