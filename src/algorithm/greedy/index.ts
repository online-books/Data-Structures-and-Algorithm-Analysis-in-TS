import BinaryTreeNode from "@src/data-structures/tree/binary-tree-node";
import BinaryHeap from "@src/data-structures/priority-queue/binary-heap";
import { compareDecrease } from "@src/share/utils";

export function huffmanCode(s: string): BinaryTreeNode {
  const dict: { [propName: string]: number } = {};
  for (let i = 0; i < s.length; i++) {
    const val = s[i];
    let count = dict[val];
    if (!count) {
      count = 0;
    }
    dict[val] = count + 1;
  }
  const nodes = Object.keys(dict).map((key) => ({
    node: new BinaryTreeNode(key),
    value: dict[key],
  }));
  const heap = BinaryHeap.create(nodes);
  let processed = nodes.length;
  while (processed > 1) {
    const min = heap.deleteMin();
    const secMin = heap.deleteMin();
    const node = new BinaryTreeNode(min.value + secMin.value);
    node.left = min.node;
    node.right = secMin.node;
    heap.insert({
      node,
      value: node.val,
    });
    processed -= 1;
  }
  return heap.deleteMin().node;
}

class Box {
  private used: number = 0;
  constructor(private capacity: number) {
    this.capacity = capacity;
  }
  public get remain() {
    return this.capacity - this.used;
  }
  public fill(size: number) {
    if (size < 0) {
      throw RangeError("size can not be negative");
    }
    this.used += size;
  }
}

export function binPackingProblemWithFirstFit(
  goods: number[],
  boxCap: number
): number {
  const boxes: Box[] = [];
  let cost = 0;
  while (goods.length) {
    const current = goods.shift()!;
    let filled = false;
    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      if (current <= box.remain) {
        box.fill(current);
        filled = true;
        break;
      }
    }
    if (!filled) {
      const box = new Box(boxCap);
      box.fill(current);
      boxes.push(box);
      cost += 1;
    }
  }
  return cost;
}

export function binPackingProblemWithBestFit(
  goods: number[],
  boxCap: number
): number {
  const boxes: Box[] = [];
  let cost = 0;
  while (goods.length) {
    const current = goods.shift()!;
    let minRemain = boxCap;
    let minIndex = -1;
    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      if (box.remain > current) {
        if (box.remain - current < minRemain) {
          minRemain = box.remain - current;
          minIndex = i;
        }
      }
    }
    if (minIndex === -1) {
      const box = new Box(boxCap);
      box.fill(current);
      boxes.push(box);
      cost += 1;
    } else {
      boxes[minIndex].fill(current);
    }
  }
  return cost;
}

export function binPackingProblemWithFirstFitDecreasing(
  goods: number[],
  boxCap: number
): number {
  const sortedGoods = goods.sort(compareDecrease);
  return binPackingProblemWithFirstFit(sortedGoods, boxCap);
}
