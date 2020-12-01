<!-- @format -->

# Typescript 数据结构与算法

![travis-cli](https://travis-ci.com/qindagang/Data-Structures-and-Algorithm-Analysis-in-TS.svg?branch=master)
[![codecov](https://codecov.io/gh/qindagang/Data-Structures-and-Algorithm-Analysis-in-TS/branch/master/graph/badge.svg?token=B05PLKNLJP)](https://codecov.io/gh/qindagang/Data-Structures-and-Algorithm-Analysis-in-TS)
![GitHub](https://img.shields.io/github/license/qindagang/Data-Structures-and-Algorithm-Analysis-in-TS)

本仓库是根据《数据结构与算法分析-C 语言描述》（第二版）一书中所描述的各种数据结构与算法使用 Typescript 进行实现，并在每个章节中添加了必须要的解释与说明。相比原书，这里省略了大量涉及算法运行时间的定理证明、推导分析过程及算法实现的细节描述，因此强烈建议您在原著的基础上阅读本代码。

### 如何阅读

---

1. 使用 Chrome 浏览器，并添加[MathJax Plugin for Github](https://chrome.google.com/webstore/detail/mathjax-plugin-for-github/ioemnmodlmafdkllaclgeombjnmnbima)控件
2. 将本项目 clone 到本地，使用 vscode 打开，安装 Markdown AllInOne 插件

### 目录结构

---

#### [1.引论](Chapters/Chapter1-Introduction)

#### [2.算法分析](Chapters/Chapter2-AlgorithmAnalysis)

#### [3.表、栈和队列](Chapters/Chapter3-ListStackQueue)

#### [4.树](Chapters/Chapter4-Trees)

-   **[二叉查找树](Chapters/Chapter4-Trees/4.1-BinarySearchTree)**
-   **[AVL 树](Chapters/Chapter4-Trees/4.2-AVLTree)**

#### [5.散列](Chapters/Chapter5-Hashing)

#### [6.优先队列（堆）](Chapters/Chapter6-PriorityQueue)

-   **[二叉堆](Chapters/Chapter6-PriorityQueue/6.1-BinaryHeap)**
-   **[左式堆](Chapters/Chapter6-PriorityQueue/6.2-LeftistHeap)**
-   **[斜堆](Chapters/Chapter6-PriorityQueue/6.3-SkewHeap)**
-   **[二项队列](Chapters/Chapter6-PriorityQueue/6.4-BinomalQueue)**

#### [7.排序](Chapters/Chapter7-Sorting)

-   **[插入排序](Chapters/Chapter7-Sorting/7.1-InsertionSort)**
-   **[希尔排序](Chapters/Chapter7-Sorting/7.2-ShellSort)**
-   **[堆排序](Chapters/Chapter7-Sorting/7.3-HeapSort)**
-   **[归并排序](Chapters/Chapter7-Sorting/7.4-MergeSort)**
-   **[快速排序](Chapters/Chapter7-Sorting/7.5-QuickSort)**

#### [8.不相交集](Chapters/Chapter8-DisjointSet)

#### [9.图论算法](Chapters/Chapter9-GraphAlgorithm)

-   **[拓扑排序](Chapters/Chapter9-GraphAlgorithm/9.1-TopSort)**
-   **[最短路径算法](Chapters/Chapter9-GraphAlgorithm/9.2-ShortestPathAlgorithm)**
    -   [无权最短路径](Chapters/Chapter9-GraphAlgorithm/9.2-ShortestPathAlgorithm/9.2.1-UnweightedShortestPaths)
    -   [Dijkstra 算法](Chapters/Chapter9-GraphAlgorithm/9.2-ShortestPathAlgorithm/9.2.2-TheAlgorithmOfDijkstra)
    -   [具有负边值的图](Chapters/Chapter9-GraphAlgorithm/9.2-ShortestPathAlgorithm/9.2.3-GraphsWithNegativeEdgeCosts)
    -   [所有点对最短路径](Chapters/Chapter9-GraphAlgorithm/9.2-ShortestPathAlgorithm/9.2.4-AllPairsShortestPath)
-   **[网络流问题](Chapters/Chapter9-GraphAlgorithm/9.3-NetworkFlow)**
-   **[最小生成树](Chapters/Chapter9-GraphAlgorithm/9.4-MinimumSpanningTree)**
-   **[深度优先搜索的应用](Chapters/Chapter9-GraphAlgorithm/9.5-DepthFirstSearcht)**
    -   [双连通性](Chapters/Chapter9-GraphAlgorithm/9.5-DepthFirstSearch/9.5.1-Biconnectivity/README.md)
    -   [欧拉回路](Chapters/Chapter9-GraphAlgorithm/9.5-DepthFirstSearch/9.5.2-EulerCircuits/README.md)
    -   [查找强分支](Chapters/Chapter9-GraphAlgorithm/9.5-DepthFirstSearch/9.5.3-FindingStrongComponents/README.md)

#### [10.算法设计技巧](Chapters/Chapter10-AlgorithmDesingTechniques)

### 如何使用

---

请确保已安装[Node](<(https://nodejs.org/zh-cn/)>)。

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

### 如何贡献

---

参考[使用议题和拉取请求进行协作](https://docs.github.com/cn/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests)。
