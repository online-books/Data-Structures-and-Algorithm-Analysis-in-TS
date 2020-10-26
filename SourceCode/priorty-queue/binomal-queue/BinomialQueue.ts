import BinomialTree from './BinomialTree';

export default class BinomialQueue<T> {
    public forest: BinomialTree<T>[] = [];
    public findMin(): BinomialTree<T> | null {
        const index = this.findMinTreeIndex();
        if (index === -1) {
            return null;
        }
        return this.forest[index];
    }
    public merge(binQueue: BinomialQueue<T>) {
        this.forest = this.mergeForest(this.forest, binQueue.forest);
    }
    public deleteMin(): void {
        const index = this.findMinTreeIndex();
        if (index === -1) {
            return;
        }
        const [tree] = this.forest.splice(index, 1);
        const children = [];
        let childTree: BinomialTree<T> | null = tree.firstChild;
        while (childTree) {
            children.push(childTree);
            const nextChild = childTree.nextSibling;
            childTree.nextSibling = null;
            childTree = nextChild;
        }
        this.forest = this.mergeForest(children, this.forest);
    }
    public insert(element: T): void {
        const binTree = new BinomialTree(element);
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
        let minTree: BinomialTree<T> | null = forest[index] || null;
        for (let i = 1; i < length; i++) {
            const tree = forest[i];
            if (!minTree) {
                minTree = tree;
                index = i;
                continue;
            }
            if (tree && tree.element < minTree.element) {
                minTree = tree;
                index = i;
            }
        }
        return index;
    }
    private mergeForest(forest1: BinomialTree<T>[], forest2: BinomialTree<T>[]): BinomialTree<T>[] {
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
        let carray!: BinomialTree<T>;
        const newForest: BinomialTree<T>[] = [];
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
    private mergeTree(t1: BinomialTree<T>, t2: BinomialTree<T>): BinomialTree<T> {
        if (t1.element > t2.element) {
            return this.mergeTree(t2, t1);
        }
        t2.nextSibling = t1.firstChild;
        t1.firstChild = t2;
        return t1;
    }
}