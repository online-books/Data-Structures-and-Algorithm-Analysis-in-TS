<!-- @format -->

# Typescrip 数据结构与算法

![travis-cli](https://travis-ci.com/qindagang/data-structures-and-algorithm-analysis-in-typescript.svg?branch=master)
![codecov](https://codecov.io/gh/qindagang/data-structures-and-algorithm-analysis-in-typescript/branch/master/graph/badge.svg?token=B05PLKNLJP)

本仓库是根据《数据结构与算法分析-C 语言描述》（第二版）一书中所描述的各种数据结构与算法使用 Typescript 进行实现，并在每个章节中添加了必须要的解释与说明。相比原书，这里省略了大量涉及算法运行时间的定理证明、推导分析过程及算法实现的细节描述，因此强烈建议您在原书的基础上阅读本代码。

### 如何阅读

---

1. 使用 Chrome 浏览器，并添加[MathJax Plugin for Github](https://chrome.google.com/webstore/detail/mathjax-plugin-for-github/ioemnmodlmafdkllaclgeombjnmnbima)控件
2. 将本项目 clone 到本地，使用 vscode 打开，安装 Markdown AllInOne 插件

### 目录结构

---

#### [1.引论](https://github.com/qindagang/data-structures-and-algorithm-analysis-in-typescript/tree/master/Chapters/Chapter1-Introduction)

#### [2.算法分析](https://github.com/qindagang/data-structures-and-algorithm-analysis-in-typescript/tree/master/Chapters/Chapter2-AlgorithmAnalysis)

#### [3.表、栈和队列](https://github.com/qindagang/data-structures-and-algorithm-analysis-in-typescript/tree/master/Chapters/Chapter3-ListStackQueue)

#### [4.树](https://github.com/qindagang/data-structures-and-algorithm-analysis-in-typescript/tree/master/Chapters/Chapter4-Trees)

-   **[二叉查找树](https://github.com/qindagang/data-structures-and-algorithm-analysis-in-typescript/tree/master/Chapters/Chapter4-Trees/4.1-BinarySearchTree)**
-   **[AVL 树](https://github.com/qindagang/data-structures-and-algorithm-analysis-in-typescript/tree/master/Chapters/Chapter4-Trees/4.2-AVLTree)**

#### [5.散列](https://github.com/qindagang/data-structures-and-algorithm-analysis-in-typescript/tree/master/Chapters/Chapter5-Hashing)

#### [6.优先队列（堆）](https://github.com/qindagang/data-structures-and-algorithm-analysis-in-typescript/tree/master/Chapters/Chapter6-PriorityQueue)

-   **[二叉堆](https://github.com/qindagang/data-structures-and-algorithm-analysis-in-typescript/tree/master/Chapters/Chapter6-PriorityQueue/6.1-BinaryHeap)**
-   **[左式堆](https://github.com/qindagang/data-structures-and-algorithm-analysis-in-typescript/tree/master/Chapters/Chapter6-PriorityQueue/6.2-LeftistHeap)**
-   **[斜堆](https://github.com/qindagang/data-structures-and-algorithm-analysis-in-typescript/tree/master/Chapters/Chapter6-PriorityQueue/6.3-SkewHeap)**
-   **[二项队列](https://github.com/qindagang/data-structures-and-algorithm-analysis-in-typescript/tree/master/Chapters/Chapter6-PriorityQueue/6.4-BinomalQueue)**

#### [7.排序](https://github.com/qindagang/data-structures-and-algorithm-analysis-in-typescript/tree/master/Chapters/Chapter7-Sorting)

-   **[插入排序](https://github.com/qindagang/data-structures-and-algorithm-analysis-in-typescript/tree/master/Chapters/Chapter7-Sorting/7.1-InsertionSort)**
-   **[希尔排序](https://github.com/qindagang/data-structures-and-algorithm-analysis-in-typescript/tree/master/Chapters/Chapter7-Sorting/7.2-ShellSort)**
-   **[堆排序](https://github.com/qindagang/data-structures-and-algorithm-analysis-in-typescript/tree/master/Chapters/Chapter7-Sorting/7.3-HeapSort)**
-   **[归并排序](https://github.com/qindagang/data-structures-and-algorithm-analysis-in-typescript/tree/master/Chapters/Chapter7-Sorting/7.4-MergeSort)**
-   **[快速排序](https://github.com/qindagang/data-structures-and-algorithm-analysis-in-typescript/tree/master/Chapters/Chapter7-Sorting/7.5-QuickSort)**
-   **[外部排序](https://github.com/qindagang/data-structures-and-algorithm-analysis-in-typescript/tree/master/Chapters/Chapter7-Sorting/7.6-ExternalSort)**

#### [8.不相交集 ADT](https://github.com/qindagang/data-structures-and-algorithm-analysis-in-typescript/tree/master/Chapters/Chapter8-DisjointSet)

#### [9.图论算法](https://github.com/qindagang/data-structures-and-algorithm-analysis-in-typescript/tree/master/Chapters/Chapter9-GraphAlgorithm)

#### [10.算法设计技巧](https://github.com/qindagang/data-structures-and-algorithm-analysis-in-typescript/tree/master/Chapters/Chapter10-AlgorithmDesingTechniques)

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

参考[使用议题和拉取请求进行协作](https://docs.github.com/cn/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests)

---

### LICENSE

---

MIT
