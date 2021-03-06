<!-- @format -->

## 伸展树

伸展树是一种相对简单的数据结构，它保证从空树开始任意连续$M$次对树的操作最多花费$O(M\log N)$时间。

对于二叉查找树来说，每次操作的最坏情形时间$O(N)$并不坏，只要它相对不常发生就行。任何一次访问，即使花费$O(N)$也仍然可能非常快。虽然一系列访问整体都有可能出现最坏情形，但是非常罕见。因此在不存在坏的操作序列的情况下，具有最坏情形运行时间$O(N)$但保证对任意$M$次连续操作最多花费$O(M\log N)$运行时间的查找树数据结构也足够好。

当我们查找一个深度很深的节点时，就有可能后续对它还要进行多次查找操作。如果这个节点不改变位置，而每次访问又花费$O(N)$，那么$M$次访问将花费$O(M\cdot N)$的时间。

伸展树的基本想法是，当一个节点被访问后，它就要经过一系列类似 AVL 树的旋转被放到根上。如果一个节点很深，那么其访问路径上就存在许多的节点也相对较深，通过重新构造可以使对所有这些节点的下一次访问所花费的时间变少。因此，如果节点过深，重新构造具有平衡这棵树的作用。

### 自顶向下伸展树

---

在对伸展树进行插入、删除或查找操作时，称为*展开*的一系列树的旋转使得操作的目标节点成为树的新根。一次展开操作的平均时间为$O(\log N)$。

以向树$T$中查找节点$X$为例。在初始阶段，我们创建两个空树$L$和$R$。树$L$用来存放树$T$中小于$X$的节点，而树$R$用来存放树$T$中大于$X$的节点。

<image  height="240" src="../../../Assets/Images/ch4/4-11.png">

图 4-11 对树$T$进行查找时的起始状态

#### 1.一字形旋转

对于一字形的旋转，如图 4-12 所示，假设当前根节点是$G$，其左儿子为$P$。首先对节点$G$进行一次左单旋转，使得根节点指向$P$而$G$成为$P$的右儿子。然后将$P$设为树$R$中最小节点的左子树，而$N$成为树$T$的新根。

<image  height="240" src="../../../Assets/Images/ch4/4-12.png">

图 4-12 自顶向下展开旋转：一字形旋转

#### 2.之字形旋转

对于之字形旋转，我们可以简化成两次一字形旋转，如图 4-13 所示。首先在根节点$G$和其左儿子$P$进行一次左单旋转，使得$G$成为$P$的右儿子，再将$G$设为树$R$最小节点的左子树。此时，树$T$的根是$P$。然后对$P$和其右儿子$N$进行一次右单旋转，再将$P$设为树$L$最大节点的右子树。这样节点$N$就成为树$T$的新根。

<image  height="240" src="../../../Assets/Images/ch4/4-13.png">

图 4-13 自顶向下展开旋转：之字形旋转

#### 3.树的合并

图 4-14 指出当执行完最后一步展开操作时，应该如何处理树$L$、树$R$和树$T$以形成一棵树。假设当前根节点$N$就是此次要查找的节点$X$。我们首先将根节点$N$的左子树和右子树分别设为树$L$的最大节点的右子树和树$R$的最小节点的左子树，然后将树$L$的右子树设为根节点$N$的左儿子，而将树$R$的左子树设为根节点$N$的右儿子，合并完成。

<image  height="240" src="../../../Assets/Images/ch4/4-14.png">

图 4-14 树的合并

### 代码位置

---

[SourceCode/Tree/SplayTree/SplayTree.ts](../../../SourceCode/Tree/SplayTree/SplayTree.ts)
