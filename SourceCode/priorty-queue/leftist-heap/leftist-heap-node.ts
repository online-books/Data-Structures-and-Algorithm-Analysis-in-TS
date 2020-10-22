export default class LeftistHeapNode {
    public left: LeftistHeapNode | null = null;
    public right: LeftistHeapNode | null = null;
    public npl: number = 0;
    constructor(public val: number) {
        this.val = val;
    }
}