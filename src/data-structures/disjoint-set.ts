/**
 * 不相交集
 * 数据结构：数组的每个成员P[i]表示元素i的父元素。如果i是根，则P[i]=-1；（用负值表示该树的大小）
 * 按大小求并：总让较小的树成为较大的树的子树，连续M次运算需要O(M)平均时间
 * 路径压缩查找：从元素X到根的路径上的每一个节点都使它的父节点指向根。
 */

export default class DisjointSet {
  private data: number[];
  constructor(len: number) {
    this.data = new Array(len).fill(-1);
  }
  public find(index: number): number {
    const { data } = this;
    this.checkRange(index);
    const parentIndex = data[index];
    if (parentIndex > 0) {
      const rootIndex = this.find(parentIndex);
      data[index] = rootIndex;
      return rootIndex;
    }
    return index;
  }
  public union(rootIndex1: number, rootIndex2: number): number {
    const { data } = this;
    this.checkRange(rootIndex1);
    this.checkRange(rootIndex2);
    const treeSize1 = data[rootIndex1];
    const treeSize2 = data[rootIndex2];
    if (treeSize1 > treeSize2) {
      return this.union(rootIndex2, rootIndex1);
    }
    data[rootIndex1] = treeSize1 - 1;
    data[rootIndex2] = rootIndex1;
    return treeSize1 - 1;
  }
  private checkRange(index: number) {
    const { data } = this;
    if (index >= data.length || index < 0) {
      throw new RangeError("out of range");
    }
  }
}
