<!-- @format -->

# Typescript 数据结构与算法

![travis-cli](https://travis-ci.com/qindagang/Data-Structures-and-Algorithm-Analysis-in-TS.svg?branch=master)
[![codecov](https://codecov.io/gh/qindagang/Data-Structures-and-Algorithm-Analysis-in-TS/branch/master/graph/badge.svg?token=B05PLKNLJP)](https://codecov.io/gh/qindagang/Data-Structures-and-Algorithm-Analysis-in-TS)
![GitHub](https://img.shields.io/github/license/qindagang/Data-Structures-and-Algorithm-Analysis-in-TS)

## 如何阅读

1. 使用 Chrome 浏览器，并添加[MathJax Plugin for Github](https://chrome.google.com/webstore/detail/mathjax-plugin-for-github/ioemnmodlmafdkllaclgeombjnmnbima)控件。
2. 将本项目 clone 到本地，使用 vscode 打开，安装 Markdown AllInOne 插件。

## 目录结构

## 1.引论

| 序号 | 内容                                           | 要点                                 | 备注 |
| :--: | :--------------------------------------------- | :----------------------------------- | ---- |
|  1   | [算法分析基础](Chapters/Chapter1-Introduction) | 基础数学知识；时间复杂度及其运算法则 | 无   |

## 2.数据结构

#### 2.1 栈和队列

| 序号 | 内容                                 | 要点     | 备注 |
| :--: | :----------------------------------- | :------- | ---- |
|  1   | [栈](Chapters/Chapter2-StackQueue)   | 后进先出 | 无   |
|  2   | [队列](Chapters/Chapter2-StackQueue) | 先进先出 | 无   |

#### 2.2 表

| 序号 | 内容                                      | 要点                     | 备注 |
| :--: | :---------------------------------------- | :----------------------- | ---- |
|  1   | [链表](Chapters/Chapter3-List/LinkedList) | 单链表；双链表；循环链表 | 无   |

#### 2.3 二叉树

| 序号 | 内容                                                       | 要点                               | 备注                       |
| :--: | :--------------------------------------------------------- | :--------------------------------- | -------------------------- |
|  1   | [二叉查找树](Chapters/Chapter4-Trees/4.1-BinarySearchTree) | 二叉查找树的结构性质；操作平均时间 | 无                         |
|  2   | [AVL 树](Chapters/Chapter4-Trees/4.2-AVLTree)              | AVL 树的结构性质；单旋转、双旋转   | 依赖二叉查找树内容         |
|  3   | [伸展树](Chapters/Chapter4-Trees/4.3-SplayTree)            | 自顶向下的伸展过程                 | 依赖二叉查找树、AVL 树内容 |
|  4   | [红黑树](Chapters/Chapter4-Trees/4.4-RedBlackTree)         | 着色法则；自顶向下的旋转与着色过程 | 依赖二叉查找树、AVL 树内容 |

#### 2.4 散列

| 序号 | 内容                                | 要点                                     | 备注         |
| :--: | :---------------------------------- | :--------------------------------------- | ------------ |
|  1   | [散列表](Chapters/Chapter5-Hashing) | 散列函数；分离链接法；开放定址法；再散列 | 依赖链表内容 |

#### 2.5 优先队列(堆)

| 序号 | 内容                                                         | 要点                           | 备注             |
| :--: | :----------------------------------------------------------- | :----------------------------- | ---------------- |
|  1   | [二叉堆](Chapters/Chapter6-PriorityQueue/6.1-BinaryHeap)     | 堆序性质；二叉堆的结构性质     | 无               |
|  2   | [左式堆](Chapters/Chapter6-PriorityQueue/6.2-LeftistHeap)    | 零路径长；堆的合并             | 无               |
|  3   | [斜堆](Chapters/Chapter6-PriorityQueue/6.3-SkewHeap)         | 左式堆的自调节                 | 依赖左式堆的内容 |
|  4   | [二项队列](Chapters/Chapter6-PriorityQueue/6.4-BinomalQueue) | 二项树的结构性质；二项树的合并 | 无               |

#### 2.6 不相交集

| 序号 | 内容                                      | 要点                               | 备注 |
| :--: | :---------------------------------------- | :--------------------------------- | ---- |
|  1   | [不相交集](Chapters/Chapter7-DisjointSet) | 动态等价性；灵巧求并算法；路径压缩 | 无   |

#### 2.7 图

| 序号 | 内容                                                                                                               | 要点                                   | 备注                                |
| :--: | :----------------------------------------------------------------------------------------------------------------- | :------------------------------------- | ----------------------------------- |
|  1   | [图的表示](Chapters/Chapter8-Graph/8.1-GraphRepresentation)                                                        | 有向图；无向图；赋权图；环圈；         | 依赖链表、散列、栈内容              |
|  2   | [拓扑排序](Chapters/Chapter8-Graph/8.2-TopSort)                                                                    | 入度、出度                             | 依赖队列内容                        |
|  3   | [单源最短路径-无权最短路径](Chapters/Chapter8-Graph/8.3-ShortestPathAlgorithm/8.3.1-UnweightedShortestPaths)       | 图的广度优先搜索                       | 依赖队列内容                        |
|  4   | [单源最短路径-Dijkstra 算法](Chapters/Chapter8-Graph/8.3-ShortestPathAlgorithm/8.3.2-TheAlgorithmOfDijkstra)       | 非负赋权图；贪婪算法；图的深度优先搜索 | 依赖二叉堆内容                      |
|  5   | [单源最短路径-具有负边值的图](Chapters/Chapter8-Graph/8.3-ShortestPathAlgorithm/8.3.3-GraphsWithNegativeEdgeCosts) | 图的广度优先搜索                       | 依赖队列内容                        |
|  6   | [所有点对最短路径](Chapters/Chapter8-Graph/8.3-ShortestPathAlgorithm/8.3.4-AllPairsShortestPath)                   | FloydWarshall 算法 ；动态规划          | 无                                  |
|  7   | [最大网络流](Chapters/Chapter8-Graph/8.4-NetworkFlow)                                                              | 残余图；最大增广路径；图的深度优先搜索 | 依赖 Dijksra 算法、无权最短路径算法 |
|  8   | [最小生成树](Chapters/Chapter8-Graph/8.5-MinimumSpanningTree)                                                      | Prim 算法;Kruskal 算法；贪婪算法       | 依赖二叉堆、不相交集内容            |
|  9   | [双连通性](Chapters/Chapter8-Graph/8.6-Biconnectivity)                                                             | 图的深度优先搜索；先序遍历；后序遍历   | 无                                  |
|  10  | [欧拉回路](Chapters/Chapter8-Graph/8.7-EulerPath)                                                                  | 图的深度优先搜索；路径拼接             | 无                                  |
|  11  | [强连通分支](Chapters/Chapter8-Graph/8.8-FindingStrongComponents)                                                  | 图的深度优先搜索； 后序遍历；反向图    | 无                                  |

## 3.算法

#### 3.1 排序算法

| 序号 | 内容                                                                      | 要点                                    | 备注                |
| :--: | :------------------------------------------------------------------------ | :-------------------------------------- | ------------------- |
|  1   | [插入排序](Chapters/Chapter9-Algorithms/9.1-Sorting/9.1.1-InsertionSort/) | 时间界：$O(N^2)$                        | 无                  |
|  2   | [希尔排序](Chapters/Chapter9-Algorithms/9.1-Sorting/9.1.2-ShellSort)      | 增量序列； 时间界：$O(N\log N)$         | 无                  |
|  3   | [堆排序](Chapters/Chapter9-Algorithms/9.1-Sorting/9.1.3-HeapSort)         | 时间界：$O(N\log N)$                    | 依赖 2.5 二叉堆内容 |
|  4   | [归并排序](Chapters/Chapter9-Algorithms/9.1-Sorting/9.1.4-MergeSort)      | 分治算法； 时间界：$O(N\log N)$         | 无                  |
|  5   | [快速排序](Chapters/Chapter9-Algorithms/9.1-Sorting/9.1.5-QuickSort)      | 枢纽元；分治算法； 时间界：$O(N\log N)$ | 无                  |

#### 3.2 贪婪算法

| 序号 | 内容                                                    | 要点       | 备注           |
| :--: | :------------------------------------------------------ | :--------- | -------------- |
|  1   | [Huffman 编码](Chapters/Chapter9-Algorithms/9.2-Greedy) | 哈夫曼算法 | 依赖二叉堆内容 |

#### 3.3 分治算法

| 序号 | 内容                                                            | 要点 | 备注 |
| :--: | :-------------------------------------------------------------- | :--- | ---- |
|  1   | [最近点问题](Chapters/Chapter9-Algorithms/9.3-DivideAndConquer) | 略   | 无   |

#### 3.4 动态规划算法

| 序号 | 内容                                                                  | 要点 | 备注 |
| :--: | :-------------------------------------------------------------------- | :--- | ---- |
|  1   | [矩阵乘法](Chapters/Chapter9-Algorithms/9.4-DynamicProgramming)       | 略   | 无   |
|  2   | [最优二叉查找树](Chapters/Chapter9-Algorithms/9.4-DynamicProgramming) | 略   | 无   |

#### 3.5 回溯算法

| 序号 | 内容                                                              | 要点                              | 备注   |
| :--: | :---------------------------------------------------------------- | :-------------------------------- | ------ |
|  1   | [收费公路重建问题](Chapters/Chapter9-Algorithms/9.5-BackTracking) | 略                                | 无     |
|  2   | [博弈游戏](Chapters/Chapter9-Algorithms/9.5-BackTracking)         | 极小极大策略；$\alpha-\beta 剪裁$ | 待更新 |

## 如何使用

#### 安装依赖

```
npm install
```

#### 执行测试用例

```
npm test
```

#### 源码调试

参考[Debugging in VsCode](https://code.visualstudio.com/docs/editor/debugging)。

#### 如何贡献

参考[使用议题和拉取请求进行协作](https://docs.github.com/cn/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests)。

## 其他

有任何好的想法和建议，欢迎联系<zuoanhuating@163.com>。
