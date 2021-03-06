<!-- @format -->

## 红黑树

红黑树是具有下列着色性质的二叉查找树

1.  每一个节点或者着成红色，或者着成黑色
2.  根是黑色的
3.  如果一个节点是红色的，那么它的子节点必须是黑色的
4.  从一个节点到一个 null 指针的每一条路径必须包含相同数目的黑色节点

<image  height="240"  src="../../../Assets/Images/ch4/4-15.png">

图 4-15 红黑树模型

着色法则的一个推论是，红黑树的高度最多是$2\log(N+1)$。对红黑树的操作在最坏的情形下花费$O(\log N)$。

### 1.自顶向下的插入过程

---

将一个新节点插入到树中时，通常把该节点作为树叶放到树中。如果该节点被涂成黑色，那么就违反了条件 4，因为这将会建立一条更长的黑节点的路径。因此，这个节点必须涂成红色。如果它的父节点是黑色的，那么插入完成。如果它的父节点是红色的，那么我们得到连续红色节点，这就违反了条件 3。在这种情况下，我们必须调整该树以确保条件 3 满足且不会破坏条件 4。我们可以通过**颜色的改变和树的旋转**来完成这项工作。

在自顶向下插入的过程中，当我们看到一个节点$X$有两个红儿子的时候，我们让$X$成为红的而让它的两个儿子是黑的。如图 4-16 所示。

<image  height="240" src="../../../Assets/Images/ch4/4-16.png">

图 4-16 颜色翻转

如果在颜色翻转后$X$的父节点$P$也是红，那么$X$的祖父节点$G$必定是黑色，否则就会在插入前有两个相连的红色节点，违反了红黑树的法则。$X$、$P$和$G$可以形成一个一字型或之字形链。第一种情形对应$P$和$G$之间的单旋转，如图 4-17 所示。

<image  height="240" src="../../../Assets/Images/ch4/4-17.png">

图 4-17 一字形旋转

而第二种情形对应双旋转，该双旋转首先在$X$和$P$间进行，然后在$X$和$G$间进行。如图 4-18 所示。

<image   height="240" src="../../../Assets/Images/ch4/4-18.png">

图 4-18 之字形旋转

在两种情形下，子树的新根均被涂成黑色。因此，即使原来的曾祖节点是红色的，我们也排除了两个相连红节点的可能性。同时这些旋转使得通向$A$,$B$和$C$诸节点路径上的黑节点个数保持不变。

### 2.自顶向下的删除过程

红黑树的删除过程类似于二叉查找树的删除。所有的删除操作都归结于能删除一片树叶。这是因为要删除一个带有两个儿子的节点，我们用右子树的最小节点代替它，然后删除该最小节点；只有一个右儿子的节点也用同样的方法删除；而只有一个左儿子的节点通过用其左子树的最大节点替换，然后将该最大节点删除即可。

如果要删除的是红色树叶，那么直接删除即可。但如果树叶是黑色的，那么黑色节点的删除将破坏条件 4。解决的方法是保证从上到下删除期间树叶是红色的。

令$X$是当前节点，$T$是它的兄弟节点，而$P$是它们的父节点。开始时我们把树的根涂成红色，而根的左右子节点涂成黑色。这样当遍历到下一个节点时，$P$是红色的，而$X$和$T$是黑色的。这时存在两种主要情形：

#### 情形 1

$X$有两个黑色的子节点，那么$T$存在三种情况。

1. 如果$T$也有两个黑色的子节点，那么我们就翻转$X$、$T$、$P$的颜色，使$X$和$T$变为红色的，$P$变为黑色的。如图 4-19 所示。

<image  height="240" src="../../../Assets/Images/ch4/4-19.png">

图 4-19 $X$和$T$都有两个黑色的子节点

2. 如果$T$的左儿子$L$是黑色的，右儿子$R$是红色的，那么就对$P$、$T$、$R$执行一次单旋转和颜色翻转，如图 4-20 所示。

<image  height="240" src="../../../Assets/Images/ch4/4-20.png">

图 4-20 $X$有两个黑色的子节点，$T$的左儿子是黑色的，右儿子是红色的

3. $T$的左儿子$L$是红色的，右儿子$R$是黑色的，那么就对$P$、$T$、$L$执行一次双旋转和颜色翻转，如图 4-21 所示。

<image  height="240" src="../../../Assets/Images/ch4/4-21.png">

图 4-21 $X$有两个黑色的子节点，$T$的左儿子是红色的，右儿子是黑色的

#### 情形 2

$X$有一个子节点是红色的，那么我们继续向下遍历，得到新的$X$、$T$、$P$，此时存在两种情况。

1. 如果$X$是红色的，那么就继续向下遍历。

2. 如果$X$是黑色的，那么$T$是红色的，$P$是黑色的，我们旋转$T$和$P$，使$T$成为$X$和$P$的父节点，此时就又回到了主情形。如图 4-22 所示。

<image   height="240" src="../../../Assets/Images/ch4/4-22.png">

图 4-22 $X$和$P$是黑色，$T$是红色的

### 代码位置

---

[SourceCode/Tree/RedBlackTree/RedBlackTree.ts](../../../SourceCode/Tree/RedBlackTree/RedBlackTree.ts)
