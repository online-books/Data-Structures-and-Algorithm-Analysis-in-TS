import BinaryTreeNode from "@src/data-structures/tree/binary-tree-node";
import BinaryHeap from "@src/data-structures/priority-queue/binary-heap";

export function huffmanCode(s: string): BinaryTreeNode {
  const dict: { [propName: string]: number } = {};
  for (let i = 0; i < s.length; i++) {
    let count = dict[s[i]];
    if (!count) {
      count = 0;
    } else {
      dict[s[i]] = count + 1;
    }
  }
  const nodes = Object.keys(dict).map((key) => ({
    node: new BinaryTreeNode(key),
    value: dict[key],
  }));
  console.log(nodes);
  const heap = BinaryHeap.create(nodes);
  let processed = nodes.length;
  while (processed > 1) {
    const min = heap.deleteMin();
    const secMin = heap.deleteMin();
    const node = new BinaryTreeNode(0);
    node.left = min.node;
    node.right = secMin.node;
    heap.insert({
      node,
      value: min.value + secMin.value,
    });
    processed -= 1;
  }
  return heap.deleteMin().node;
}
