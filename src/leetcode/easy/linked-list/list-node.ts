export default class ListNode {
    public next: null | ListNode;
    constructor(public val: any) {
        this.val = val;
        this.next = null;
    }
}