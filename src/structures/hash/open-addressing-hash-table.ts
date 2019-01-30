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
    public insert (value: number | string) {
        let index = this.hash(value);
        let collisionNum = 0;
        while (typeof this.tableList[index] !== 'undefined') {
            collisionNum += 1;
            index += Math.pow(collisionNum, 2);
            if (index >= this.tableSize) {
                index -= this.tableSize;
            }
        }
        this.tableList[index] = value;
    }
    public find (value: number | string): number {
        let index = this.hash(value);
        let collisionNum = 0;
        while (this.tableList[index] !== value) {
            if (typeof this.tableList[index] === 'undefined') {
                return -1;
            }
            collisionNum += 1;
            index += Math.pow(collisionNum, 2);
            if (index >= this.tableSize) {
                index -= this.tableSize;
            }
        }
        return index;
    }
    public delete (value: number | string) {
        const index = this.find(value);
        if (index >= 0) {
            this.tableList[index] = void 0;
        }
    }
}