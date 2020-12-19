<!-- @format -->

### 1 链表

---

链表由一系列不必在内存中相连的节点组成。每个节点均含有一个节点值（下图中的$A_1$、$A_2$等）和指向后继节点的指针（下图中的箭头所表示），这里称之为 Next 指针。最后一个节点的 Next 指针指向 NULL。
<img src="../../Assets/Images/ch3/list_overview.png"/>

图 1-1 一个链表

#### 1.1 链表的实现

定义链表中的节点结构：

```typescript
class LinkedListNode<T> {
    public next: LinkedListNode<T> | null = null
    public value: T | null = null
    constructor(value?: T) {
        if (value) {
            this.value = value
        }
    }
}
```

链表类并为其添加表头和节点数量：

```typescript
class LinkedList<T> {
    private head: LinkedListNode<T>;
    private nodeNum: number;
    constructor() {
        this.head = new LinkedListNode()
        this.nodeNum = 0;
    }
```

链表的基本操作：

-   **插入**：以$O(1)$的运行时间向链表中插入一个新的节点。
    <img src="../../Assets/Images/ch3/list_insert.png"/>

图 1-2 在$A_2$节点后向链表中插入

将要插入的节点值与另一节点$P$一起传入，新生成的节点$N$将插入到$P$节点之后。若 P 未传，则默认将其插入到表头之后。运行时间为$O(1)$。

代码如下：

```typescript
    public insert(value: T, node?: LinkedListNode<T>): LinkedListNode<T> {
        const frontNode = node ? node : this.head;
        const newNode = new LinkedListNode(value);
        const nextNode = frontNode.next;
        frontNode.next = newNode;
        newNode.next = nextNode;
        this.nodeNum += 1;
        return newNode;
    }
```

-   **删除**：为了将某个节点从链表中删除，需要先找出被删除节点的前驱节点。运行时间为$O(N)$。
    <img src="../../Assets/Images/ch3/list_delete.png"/>

图 1-3 从链表中删除$A_3$节点

代码如下：

```typescript
    public delete(node: LinkedListNode<T>) {
        const prevNode = this.findPrevNode(node);
        if (!prevNode) {
            return;
        }
        prevNode.next = node.next;
        node.next = null;
        this.nodeNum -= 1;
    }
```

-   **查找**：返回链表中的某个节点，运行时间为$O(N)$。

```typescript
    public find(value: T): LinkedListNode<T> | null {
        let currentNode: LinkedListNode<T> | null = this.head.next;
        while (currentNode !== null && currentNode.value !== value) {
            currentNode = currentNode.next;
        }
        return currentNode;
    }
```
