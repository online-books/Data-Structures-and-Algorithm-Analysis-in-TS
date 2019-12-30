import ListNode from '../linked-list/list-node';
import SinleList from '../linked-list/single-list';
import HashTable from './hash-table';
// 分离链接法构建哈希表
export default class SeparateChainingHashTable extends HashTable {
    private tableList: SinleList[];
    constructor(size: number) {
        super(size);
        this.tableList = new Array(size).fill(new SinleList());
    }
    public insert(value: string) {
        const index = this.hash(value);
        const list = this.tableList[index];
        const node = list.find(value);
        if (node) {
            return;
        }
        list.insert(value);
    }
    public find(value: string): ListNode | null {
        const index = this.hash(value);
        const list = this.tableList[index];
        return list.find(value);
    }
    public delete(value: string) {
        const index = this.hash(value);
        this.tableList[index].delete(value);
    }
}