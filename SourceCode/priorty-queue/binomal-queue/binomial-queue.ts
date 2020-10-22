import BinomialTree from './binomial-tree';
/**
 * 二项队列
 * 是堆序树的集合，堆序树中的每一棵都是有约束形式，叫做二项树。
 * 每一个高度上至多存在一棵二项树
 * 高度为k的二项树Bk通过将一棵二项树B(k-1)附接到另一颗二项树B(k-1)的根上而构成
 */

export default class BinomialQueue {
    public forest: BinomialTree[] = [];
    public findMin(): BinomialTree | null {
        const index = this.findMinTreeIndex();
        if (index === -1) {
            return null;
        }
        return this.forest[index];
    }
    public merge(binQueue: BinomialQueue) {
        this.forest = this.mergeForest(this.forest, binQueue.forest);
    }
    public deleteMin(): void {
        const index = this.findMinTreeIndex();
        if (index === -1) {
            return;
        }
        const [tree] = this.forest.splice(index, 1);
        const children = [];
        let childTree: BinomialTree | null = tree.firstChild;
        while (childTree) {
            children.push(childTree);
            const nextChild = childTree.nextSibling;
            childTree.nextSibling = null;
            childTree = nextChild;
        }
        this.forest = this.mergeForest(children, this.forest);
    }
    public insert(val: number): void {
        const binTree = new BinomialTree(val);
        this.forest = this.mergeForest(this.forest, [binTree]);
    }
    private findMinTreeIndex(): number {
        const {
            forest
        } = this;
        const {
            length
        } = forest;
        if (!length) {
            return -1;
        }
        let index = 0;
        let minTree: BinomialTree | null = forest[index] || null;
        for (let i = 1; i < length; i++) {
            const tree = forest[i];
            if (!minTree) {
                minTree = tree;
                index = i;
                continue;
            }
            if (tree && tree.val < minTree.val) {
                minTree = tree;
                index = i;
            }
        }
        return index;
    }
    private mergeForest(forest1: BinomialTree[], forest2: BinomialTree[]): BinomialTree[] {
        const {
            length: len1
        } = forest1;
        const {
            length: len2
        } = forest2;
        if (!len1) {
            return forest2;
        }
        if (!len2) {
            return forest1;
        }
        let carray!: BinomialTree;
        const newForest: BinomialTree[] = [];
        for (let i = 0, j = Math.max(len1, len2); i <= j; i++) {
            const t1 = forest1[i];
            const t2 = forest2[i];
            const num = Number(!!t1) + 2 * Number(!!t2) + 4 * Number(!!carray);
            switch (num) {
                case 0: { // 没有树
                    break;
                }
                case 1: { // 只有forest1存在
                    newForest[i] = t1;
                    break;
                }
                case 2: { // 只有forest2存在
                    newForest[i] = t2;
                    break;
                }
                case 3: { // 只有forest1和forest2存在
                    carray = this.mergeTree(t1, t2);
                    break;
                }
                case 4: { // 只有carry存在
                    newForest[i] = carray!;
                    break;
                }
                case 5: { // 只有carry和forest1存在
                    carray = this.mergeTree(t1, carray);
                    break;
                }
                case 6: { // 只有carry和forest2存在
                    carray = this.mergeTree(t2, carray);
                    break;
                }
                case 7: { // carry、forest1、forest2都存在
                    newForest[i] = carray;
                    carray = this.mergeTree(t1, t2);
                    break;
                }
            }
        }
        return newForest;
    }
    private mergeTree(t1: BinomialTree, t2: BinomialTree): BinomialTree {
        if (t1.val > t2.val) {
            return this.mergeTree(t2, t1);
        }
        t2.nextSibling = t1.firstChild;
        t1.firstChild = t2;
        return t1;
    }
}