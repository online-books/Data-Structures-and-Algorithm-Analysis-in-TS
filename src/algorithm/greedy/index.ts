import BinaryTreeNode from "@src/data-structures/tree/binary-tree-node";
import BinaryHeap from "@src/data-structures/priority-queue/binary-heap";

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
