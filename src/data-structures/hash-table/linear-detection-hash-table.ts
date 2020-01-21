import OpenAdressingHashTable from './open-addressing-hash-table';

// 线性探测法之哈希表
export default class LinearDetectionHashTable extends OpenAdressingHashTable {
    public find(value: string): number {
        let index = this.hash(value);
        while (this.tableList[index] !== value && this.tableList[index] !== undefined) {
            index += 1;
            if (index >= this.tableSize) {
                index -= this.tableSize;
            }
        }
        return index;
    }
}