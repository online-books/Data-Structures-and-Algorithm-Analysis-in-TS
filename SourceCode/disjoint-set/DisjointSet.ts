/** @format */

export default class DisjointSet {
    private list: number[]
    constructor(size: number) {
        this.list = new Array(size).fill(-1)
    }
    public find(index: number): number {
        this.checkRange(index)
        const {list} = this
        const parentIndex = list[index]
        if (parentIndex > 0) {
            const rootIndex = this.find(parentIndex)
            list[parentIndex] = rootIndex
            return rootIndex
        }
        return parentIndex
    }
    public union(rootIndex1: number, rootIndex2: number): void {
        this.checkRange(rootIndex1)
        this.checkRange(rootIndex2)
        const {list} = this
        const treeSize1 = list[rootIndex1]
        const treeSize2 = list[rootIndex2]
        if (treeSize1 >= 0) {
            return this.union(treeSize1, rootIndex2)
        }
        if (treeSize2 >= 0) {
            return this.union(rootIndex1, treeSize2)
        }
        if (treeSize1 > treeSize2) {
            return this.union(rootIndex2, rootIndex1)
        }
        list[rootIndex1] = treeSize1 - 1
        list[rootIndex2] = rootIndex1
    }
    private checkRange(index: number) {
        if (index < 0 || index >= this.list.length) {
            throw Error('index is invalid')
        }
    }
}
