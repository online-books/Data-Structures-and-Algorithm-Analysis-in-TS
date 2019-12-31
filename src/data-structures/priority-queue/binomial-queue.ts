import BinomialTree from './binomial-tree';
/**
 * 二项队列
 * 是堆序树的集合，堆序树中的每一棵都是有约束形式，叫做二项树。
 * 每一个高度上至多存在一棵二项树
 * 高度为k的二项树Bk通过将一棵二项树B(k-1)附接到另一颗二项树B(k-1)的根上而构成
 */

export default class BinomialQueue {
    public forest: BinomialTree[] = [];
    constructor() {
    }
    public findMin(): BinomialTree {

    }
    public merge() {

    }
}