import ListNode from '../data-structures/linked-list/list-node';

export function swap(arr: any[], start: number, end: number) {
    const tmp = arr[start];
    arr[start] = arr[end];
    arr[end] = tmp;
}

export function compare(a: number, b: number): 1 | -1 {
    if (a > b) {
        return 1;
    }
    return -1;
}

export function getValuesFromList(list: ListNode | null): any[] {
    const values = [];
    while (list) {
        values.push(list.val);
        list = list.next;
    }
    return values;
}