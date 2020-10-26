export default class BinomialTree<T>{
    public element: T;
    public order: number;
    public firstChild: BinomialTree<T> | null = null;
    public nextSibling: BinomialTree<T> | null = null;
    constructor(element: T) {
        this.element = element;
    }
}