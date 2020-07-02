export default class BinomialTree {
    public val: number;
    public order: number;
    public firstChild: BinomialTree | null = null;
    public nextSibling: BinomialTree | null = null;
    constructor(val: number) {
        this.val = val;
    }
}