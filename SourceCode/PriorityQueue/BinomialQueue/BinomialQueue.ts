/** @format */

import BinomialTree from './BinomialTree'

export default class BinomialQueue<T> {
    public size = 0
    public forest: Array<BinomialTree<T> | null> = []
    public getMin(): T | null {
        const index = this.findMinTreeIndex()
        if (index === -1) {
            return null
        }
        return this.forest[index]!.element
    }
    public merge(binQueue: BinomialQueue<T>): void {
        this.size += binQueue.size
        this.mergeForest(binQueue.forest)
        binQueue.size = 0
    }
    public deleteMin(): T | null {
        const index = this.findMinTreeIndex()
        if (index === -1) {
            return null
        }
        this.size -= 1
        const [tree] = this.forest.splice(index, 1)
        const children = []
        let childTree: BinomialTree<T> | null = tree!.firstChild
        while (childTree) {
            children.push(childTree)
            const nextChild = childTree.nextSibling
            childTree.nextSibling = null
            childTree = nextChild
        }
        this.mergeForest(children)
        return tree!.element
    }
    public insert(element: T): void {
        this.size += 1
        const binTree = new BinomialTree(element)
        this.mergeForest([binTree])
    }
    private findMinTreeIndex(): number {
        const {forest} = this
        const {length} = forest
        if (!length) {
            return -1
        }
        let index = 0
        let minTree: BinomialTree<T> | null = forest[index] || null
        for (let i = 1; i < length; i++) {
            const tree = forest[i]
            if (!tree) {
                continue
            } else {
                if (!minTree || tree.element < minTree.element) {
                    minTree = tree
                    index = i
                }
            }
        }
        return index
    }
    private mergeForest(forest: Array<BinomialTree<T> | null>) {
        let carray: BinomialTree<T> | null = null
        for (let i = 0, j = 1; j <= this.size; j *= 2, i++) {
            const tree1 = this.forest[i]
            const tree2 = forest[i]
            const num = Number(!!tree1) + 2 * Number(!!tree2) + 4 * Number(!!carray)
            switch (num) {
                case 0: {
                    // ?????????
                    break
                }
                case 1: {
                    // ??????tree1??????
                    break
                }
                case 2: {
                    // ??????tree2??????
                    this.forest[i] = tree2
                    break
                }
                case 3: {
                    // ??????tree1???tree2??????
                    carray = this.mergeBinomialTrees(tree1!, tree2!)
                    this.forest[i] = null
                    break
                }
                case 4: {
                    // ??????carry??????
                    this.forest[i] = carray!
                    carray = null
                    break
                }
                case 5: {
                    // ??????carry???tree1??????
                    carray = this.mergeBinomialTrees(tree1!, carray!)
                    this.forest[i] = null
                    break
                }
                case 6: {
                    // ??????carry???tree2??????
                    carray = this.mergeBinomialTrees(tree2!, carray!)
                    break
                }
                case 7: {
                    // carry???tree1???tree2?????????
                    this.forest[i] = carray
                    carray = this.mergeBinomialTrees(tree1!, tree2!)
                    break
                }
            }
        }
        forest.length = 0
    }
    private mergeBinomialTrees(t1: BinomialTree<T>, t2: BinomialTree<T>): BinomialTree<T> {
        if (t1.element > t2.element) {
            return this.mergeBinomialTrees(t2, t1)
        }
        t2.nextSibling = t1.firstChild
        t1.firstChild = t2
        return t1
    }
}
