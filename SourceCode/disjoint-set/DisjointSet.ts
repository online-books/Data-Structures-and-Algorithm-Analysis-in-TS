/** @format */

export default class DisjointSet {
    private data: number[]
    constructor(len: number) {
        this.data = new Array(len).fill(-1)
    }
    public find(index: number): number {
        const {data} = this
        this.checkRange(index)
        const parentIndex = data[index]
        if (parentIndex > 0) {
            const rootIndex = this.find(parentIndex)
            data[index] = rootIndex
            return rootIndex
        }
        return index
    }
    public union(rootIndex1: number, rootIndex2: number): number {
        const {data} = this
        this.checkRange(rootIndex1)
        this.checkRange(rootIndex2)
        const treeSize1 = data[rootIndex1]
        const treeSize2 = data[rootIndex2]
        if (treeSize1 > treeSize2) {
            return this.union(rootIndex2, rootIndex1)
        }
        data[rootIndex1] = treeSize1 - 1
        data[rootIndex2] = rootIndex1
        return treeSize1 - 1
    }
    private checkRange(index: number) {
        const {data} = this
        if (index >= data.length || index < 0) {
            throw new RangeError('out of range')
        }
    }
}
