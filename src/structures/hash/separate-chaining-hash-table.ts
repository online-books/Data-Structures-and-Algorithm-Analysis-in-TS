import List from '../linked-list/list';
import Node from '../linked-list/node';
import HashTable from './hash-table';

export default class SeparateChainingHashTable extends HashTable{
    private tableList: List[];
    constructor(size: number) {
        super(size);
        this.tableList = new Array(size).fill(new List());
    }
    public insert (value: number | string) {
        const index = this.hash(value);
        const list = this.tableList[index];
        const node = list.find(value);
        if (node) {
            return;
        }
        list.insert(value);
    }
    public find (value: number | string): Node | null {
        const index = this.hash(value);
        const list = this.tableList[index];
        if (!list.size) {
            return null;
        }
        const node = list.find(value);
        return node;
    }
    public delete (value: number | string) {
        const index = this.hash(value);
        this.tableList[index].delete(value);
    }
}