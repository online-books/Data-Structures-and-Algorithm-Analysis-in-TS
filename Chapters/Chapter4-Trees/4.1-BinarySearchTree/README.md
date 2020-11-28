<!-- @format -->

## 二叉查找树

二叉查找树的性质是，对于树中的每个节点$X$，它的左子树中所有关键字值小于$X$的关键值；而它的右子树中所有关键字值大于$X$的关键字值。

<image src="../../../Assets/Images/ch4/binary_search_tree.png">

图 4-1 两棵二叉树（只有左边的树是查找树）

### 二叉查找树的实现

#### 定义二叉树节点结构

因为一棵二叉树最多有两个儿子，所以一个节点就是由关键字信息加上两个指向其他节点的指针（Left 和 Right）组成的结构。

```typescript
export default class BinaryTreeNode<T> {
    public left: null | BinaryTreeNode<T>
    public right: null | BinaryTreeNode<T>
    public element: T
    constructor(element: T) {
        this.left = null
        this.right = null
        this.element = element
    }
}
```

#### 二叉查找树的基本操作

-   **查找**

这个操作需要返回指向树 T 中具有关键字$X$的节点，如果这样的节点不存在则返回 NULL。

```typescript
public find(element: T) {
    let node: BinaryTreeNode<T> | null;
    node = this.root;
    while (node) {
            if (node.element > element) {
                node = node.left;
        } else if (node.element < element) {
                node = node.right;
        } else {
                return node;
        }
    }
    return null;
}
```

-   **插入**

为了将$X$插入到树$T$中，可以像用 Find 那样沿着树查找。如果找到 X，则什么也不做(或做一些更新)。否则，将 X 插入到遍历的路径上的最后一个点上。

<image src="../../../Assets/Images/ch4/bst_insert.png"/>

图 4-2 在插入 5 以前和以后的二叉查找树

因为从树的根开始插入，而根又在第一次插入时变化，因此$insert$被写成一个指向新树根的入口函数。这里添加一个$addChild$方法来递归地将$X$插入到适当的子树中。

```typescript
public insert(element: T) {
    this.root = this.addChild(element, this.root);
}

private addChild(element: T, parentNode: BinaryTreeNode<T> | null) {
    if (!parentNode) {
        return new BinaryTreeNode(element);
    }
    if (element > parentNode.element) {
        parentNode.right = this.addChild(element, parentNode.right)
    } else if (element < parentNode.element) {
        parentNode.left = this.addChild(element, parentNode.left)
    } else {
        parentNode.element = element
    }
    return parentNode;
}
```

-   **删除**

    要被删除的节点有如下几种可能性：

    -   如果节点是一片树叶，那么它可以立即被删除；
    -   如果节点有一个儿子，则该节点可以在其父节点调整指针绕过该节点后被删除；
    -   如果节点有两个儿子，一般的删除策略是用其右子树的最小节点的数据代替该节点的数据并递归地删除那个最小节点。因为右子树的最小节点不可能有左儿子，所以第二次删除要容易；

<image src="../../../Assets/Images/ch4/bst_delete1.png"/>

图 4-3 具有一个儿子的节点(4)被删除前后的情况

<image src="../../../Assets/Images/ch4/bst_delete1.png"/>

图 4-4 具有两个儿子的节点(2)被删除前后的情况

```typescript
public delete(element: T): BinaryTreeNode<T> | null {
    return this.removeChild(element, this.root);
}

private removeChild(element: T, node: BinaryTreeNode<T> | null) {
    if (!node) {
        return null;
    }
    if (node.element === element) {
        const { left: leftChild, right: rightChild } = node;
        // 节点是树叶，直接删除
        if (!leftChild && !rightChild) {
            node = null;
        }
        // 节点只包含一个子节点，返回其子节点
        else if (leftChild && !rightChild) {
            node.left = null;
            return leftChild;
        } else if (!leftChild && rightChild) {
            node.right = null;
            return rightChild;
        }
        // 节点有两个儿子节点，找出其右子树中最小节点X，将节点X的关键字值赋予该点，然后删除X节点
        else {
            const minRightNode = this.findMin(node.right)!;
            node.element = minRightNode.element;
            node.right = this.removeChild(minRightNode.element, noderight);
        }
    } else {
        if (node.element > element) {
            node.left = this.removeChild(element, node.left);
        } else {
            node.right = this.removeChild(element, node.right);
        }
    }
    return node;
}
```

上面描述的删除算法有助于使得左子树比右子树深度深，因为我们总是用右子树的一个节点来代替被删除的节点。如果我们交替的插入和删除$\Theta(N^2)$次，那么树的期望深度将是$\Theta(\sqrt{N})$。图 4-5 中右沉的树看起来明显地不平衡。

<image  src="../../../Assets/Images/ch4/bst_insert_delete.png"/>

图 4-5 在$\Theta(N^2)$次 Insert/Delete 后的二叉树

下一节，我们将实现一种最老的平衡查找树，即 AVL 树。
