/** @format */

export default class DisjointSet {
    private list: number[]
    constructor(size: number) {
        this.list = new Array(size).fill(-1)
    }
    public find(index: number): number {
        const {list} = this
        if (list[index] > 0) {
            const rootIndex = this.find(list[index])
            list[index] = rootIndex
            return rootIndex
        }
        return index
    }
    public union(rootIndex1: number, rootIndex2: number): void {
        const {list} = this
        if (list[rootIndex1] <= list[rootIndex2]) {
            list[rootIndex2] = rootIndex1
        } else {
            this.union(rootIndex2, rootIndex1)
            return
        }
        list[rootIndex1] -= 1
    }
}
