<!-- @format -->

## 堆排序

基于优先队列排序的算法叫做堆排序。

首先以$O(N)$的运行时间建立$N$个元素的二叉堆，然后执行$N$次$DeleteMin$操作。将每次$DeleteMin$操作删除的最小元素按顺序重新放到被排序的数组中，就得到$N$个元素的排序。由于每次$DeleteMin$操作花费时间$O(\log N)$，因此总的运行时间是$O(N\log N)$。

### 代码位置

---

[SourceCode/Sort/HeapSort.ts](SourceCode/Sort/HeapSort.ts)
