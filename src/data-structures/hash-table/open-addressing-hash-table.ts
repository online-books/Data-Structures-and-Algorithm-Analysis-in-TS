import HashTable from './hash-table';

// 开放寻址法哈希表
export default abstract class OpenAdressingHashTable extends HashTable {
    protected tableList: any[];
    constructor(size: number) {
        super(size);
        this.tableList = new Array(size);
    }
    public insert(value: string): number {
        const index = this.find(value);
        if (this.tableList[index] === undefined) {
            this.tableList[index] = value;
        }
        return index;
    }

    public delete(value: string) {
        const index = this.find(value);
        this.tableList[index] = undefined;
    }

    abstract find(value: string): number
}