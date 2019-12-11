export default class ListNode {
    public val: any;
    public next: ListNode | null;
    constructor(val?: any) {
        this.val = val;
        this.next = null;
    }
}