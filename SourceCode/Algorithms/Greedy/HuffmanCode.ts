/** @format */

import BinaryTreeNode from '@/Tree/BinarySearchTree/BinaryTreeNode'
import BinaryHeap from '@/PriorityQueue/BinaryHeap'

export function huffmanCode(s: string): BinaryTreeNode<string> {
    const dict: {[propName: string]: number} = {}
    for (let i = 0; i < s.length; i++) {
        const val = s[i]
        let count = dict[val]
        if (!count) {
            count = 0
        }
        dict[val] = count + 1
    }
    const nodes = Object.keys(dict).map(key => new BinaryTreeNode(dict[key], key))
    const heap = new BinaryHeap(nodes)
    while (heap.size > 1) {
        const node1 = heap.deleteMin()
        const node2 = heap.deleteMin()
        const node = new BinaryTreeNode(node1.key + node2.key, '')
        node.left = node1
        node.right = node2
        heap.insert(node)
    }
    return heap.deleteMin()
}
