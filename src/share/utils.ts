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

export function swapChildNode(treeNode: { left: any; right: any }) {
  const { left, right } = treeNode;
  treeNode.left = right;
  treeNode.right = left;
}

export function isOdd(n: number): boolean {
  if (!Number.isInteger(n)) {
    return false;
  }
  if (n < 0) {
    return false;
  }
  if (n === 1) {
    return true;
  }
  return n % 2 === 1;
}
