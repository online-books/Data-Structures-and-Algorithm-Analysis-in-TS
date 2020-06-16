import { SkipListNode } from "./skip-list-node";

export default class SkipList {
  private MAX_LEVEL = 5;
  private level: number;
  private root: SkipListNode;
  constructor() {
    this.level = 0;
    this.root = new SkipListNode(0, null);
  }
  public find(key: number): any {
    const [node] = this.findNode(key);
    if (node) {
      return node.val;
    }
    return null;
  }
  public insert(key: number, val: any) {
    const [node, updatedNodes] = this.findNode(key);
    if (node) {
      node.val = val;
      return;
    }
    const level = this.getLevel();
    while (level > this.level) {
      this.level += 1;
      updatedNodes.push(this.root);
    }
    const newNode = new SkipListNode(key, val);
    updatedNodes.slice(0, level).forEach((updatedNode, index) => {
      if (updatedNode.level > index) {
        newNode.forward.push(updatedNode.forward[index]);
      }
      if (updatedNode.level < index + 1) {
        updatedNode.forward.push(newNode);
      } else {
        updatedNode.forward[index] = newNode;
      }
    });
  }
  public delete(key: number): void {
    const [node, updatedNodes] = this.findNode(key);
    if (node) {
      updatedNodes.forEach((updateNode, index) => {
        if (updateNode.level > index && updateNode.forward[index].key === key) {
          if (node.level > index) {
            updateNode.forward[index] = node.forward[index];
          } else {
            updateNode.forward = updateNode.forward.slice(0, index);
          }
        }
      });
    }
  }
  private getLevel() {
    let level = 1;
    while (Math.random() > 0.5 && level <= this.MAX_LEVEL) {
      level += 1;
    }
    return level;
  }
  private findNode(key: number): [SkipListNode | null, SkipListNode[]] {
    const updatedNodes: SkipListNode[] = [];
    let node = this.root;
    let i = this.level - 1;
    while (i >= 0) {
      while (node.level > i && node.forward[i].key < key) {
        node = node.forward[i];
      }
      i -= 1;
      updatedNodes.push(node);
    }
    updatedNodes.reverse();
    if (node.level && node.forward[0].key === key) {
      return [node.forward[0], updatedNodes];
    }
    return [null, updatedNodes];
  }
}
