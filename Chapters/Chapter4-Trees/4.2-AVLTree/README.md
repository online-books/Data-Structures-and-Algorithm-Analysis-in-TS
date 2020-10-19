## AVL树

AVL(Adelson-Velskii 和 Landis)树是带有平衡条件的二叉查找树。这个平衡条件是其每个节点的左子树和右子树的高度最多差1的二叉查找树（空树的高度定义为$-1$）。

<image src="../../../Images/ch4/avltree_true.png">

图4-1 两棵二叉查找树，只有左边的数是AVL树

举个例子，下图4-2显示一棵具有最少节点数$143$高度为$9$的AVL树。这棵树的左子树是高度为$7$且节点树最少的AVL树，右子树是高度为$8$的节点树最少的AVL树。由此可得在高度为$h$的AVL树中，最少节点数$S(h)=S(h-1)+S(h-2)+1$给出。对于$h=0,S(h)=1,S(h)=2$。函数$S(h)$与斐波那契数密切相关。

<image src="../../../Images/ch4/avltree_h9.png">

图4-2 高度为9的最小的AVL树

### AVL树的实现
---

#### 定义节点结构

AVL树的每一个节点在其节点结构中保留高度信息。

``` typescript
export default class AVLTreeNode<T> {
    public element: T;
    public height: number;
    public left: null | AVLTreeNode<T>;
    public right: null | AVLTreeNode<T>;
    constructor(element: T) {
        this.element = element;
        this.left = null;
        this.right = null;
        this.height = 0;
    }
}
```

#### AVL树的基本操作

除去插入操作外(我们将假设懒惰删除)，所有的树操作都可以以时间$O(logN)$执行。当进行插入时，我们需要更新通向根节点路径上那些节点的所有平衡信息，但插入一个节点可能破坏AVL树的特性（例如将$6$插入到图4-1中的AVL树中会破坏关键字为$8$的节点的平衡条件）。如果发生这种情况，就需要通过**旋转**操作才恢复节点平衡性质。由于任意节点最多有两个儿子，因此高度不平衡时，节点$n$的两棵子树的高度差为$2$。这种不平衡可能出现在下面的四种情况中：
- 情形$a$：对n的左儿子的左子树进行一次插入
- 情形$b$：对n的左儿子的右子树进行一次插入
- 情形$c$：对n的右儿子的左子树进行一次插入
- 情形$d$：对n的右儿子的右子树进行一次插入
    
第一种情况是插入发生在“外边”的情况（即左-左或右-右的情况），该情况通过对树的一次单旋转完成调整。第二种情况是发生在“内部”的情形（即左-右或右-左的情况）。该情况通过一次双旋转完成调整。

#### 单旋转

图4-3显示单旋转如何调整情形$a$。旋转前的图在左边，而旋转后的图在右边。节点$k_2$不满足AVL平衡特性，因为它的左子树比右子树深$2$层。为使树恢复平衡，我们把$X$上移一层，并把$Z$下移一层。

<image src="../../../Images/ch4/avltree_single_rotation.png">

图4-3 调整情形$a$的单旋转


调整情形$a$的单旋转代码如下：
``` typescript
// 左-左单旋转
private singleRotateWithLeft(node: AVLTreeNode<T>): AVLTreeNode<T> {
    const k1 = node.left!;
    node.left = k1.right;
    k1.right = node;
    node.height =
        1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    k1.height = 1 + Math.max(this.getHeight(k1.left), node.height);
    return k1;
}
```
调整情形$d$的单旋转代码如下：
```typescript
// 右-右单旋转
private singleRotateWithRight(node: AVLTreeNode<T>): AVLTreeNode<T> {
    const k1 = node.right!;
    node.right = k1.left;
    k1.left = node;
    node.height =
        1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    k1.height = 1 + Math.max(this.getHeight(k1.right), node.height);
    return k1;
}
```

获取节点高度的$getHeight$函数：
``` typescript
private getHeight(node: AVLTreeNode<T> | null): number {
    if (!node) {
        return -1;
    }
    return node.height;
}
```

#### 双旋转

如图4-4所示，单旋转对情形$b$和$c$无效，问题在于子树$Y$太深，单旋转没有减低它的深度。

<image src="../../../Images/ch4/avltree_single_rotation_invalid.png">

图4-4 单旋转不能修复情形$b$

在图4-4中的子树$Y$已经有一项插入其中，因为我们可以假设它有一个根和两个子树。于是我们可以把整棵树看作是四棵子树由3个节点连接而成，如图4-5所示。为了重新平衡，不能再让$k_3$作为根了，而图4-4所示的在$k_3$和$k_1$之间的旋转又解决不了问题，唯一的选择就是把$k_2$当作新的根。这迫使$k_1$是$k_2$的左儿子，$k_3$是它的右儿子，从而完全确定这四颗树的最终位置。

<image src="../../../Images/ch4/avltree_doouble_rotation.png">

图4-5 左-右双旋转修复情形$b$


修复情形$b$的左-右旋转代码如下：
``` typescript
// 左-右双旋转
private doubleRotateWithLeft(node: AVLTreeNode<T>): AVLTreeNode<T> {
    const k1 = node.left!;
    const k2 = k1.right!;
    k1.right = k2.left;
    node.left = k2.right;
    k2.left = k1;
    k2.right = node;
    node.height =
        1 + Math.max(this.getHeight(node.right), this.getHeight(node.left));
    k1.height = 1 + Math.max(this.getHeight(k1.left), this.getHeight(k1.right));
    k2.height = Math.max(k1.height, node.height);
    return k2;
}
```
调整情形$c$的右-左旋转代码如下：
```typescript
// 右-左双旋转
private doubleRotateWithRight(node: AVLTreeNode<T>): AVLTreeNode<T> {
    const k1 = node.right!;
    const k2 = k1.left!;
    node.right = k2.left;
    k1.left = k2.right;
    k2.left = node;
    k2.right = k1;
    node.height =
        1 + Math.max(this.getHeight(node.right), this.getHeight(node.left));
    k1.height = 1 + Math.max(this.getHeight(k1.left), this.getHeight(k1.right));
    k2.height = Math.max(k1.height, node.height);
    return k2;
}
```

综上，我们可以得到完整的向AVL树插入节点的函数：
``` typescript
public insert(element: T) {
    this.root = this.addChild(element, this.root);
}
private addChild(element: T, node: AVLTreeNode<T> | null): AVLTreeNode<T> {
    if (!node) {
        node = new AVLTreeNode(element);
    } else {
        if (node.element < element) {
            node.right = this.addChild(element, node.right);
            if (this.getHeight(node.right) - this.getHeight(node.left) > 1) {
                if (element > node.right.element) {
                    node = this.singleRotateWithRight(node);
                } else {
                    node = this.doubleRotateWithRight(node);
                }
            }
        } else if (node.element > element) {
            node.left = this.addChild(element, node.left);
            if (this.getHeight(node.left) - this.getHeight(node.right) > 1) {
                if (element < node.left.element) {
                    node = this.singleRotateWithLeft(node);
                } else {
                    node = this.doubleRotateWithLeft(node);
                }
            }
        }
    }
    node.height =
        1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    return node;
}
```

### 代码位置
---
SourceCode/tree/avl-tree