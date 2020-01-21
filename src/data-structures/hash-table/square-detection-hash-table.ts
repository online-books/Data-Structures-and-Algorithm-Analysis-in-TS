import OpenAdressingHashTable from './open-addressing-hash-table';

// 平方探测法之哈希表
export default class SquareDetectionHashTable extends OpenAdressingHashTable {
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
}