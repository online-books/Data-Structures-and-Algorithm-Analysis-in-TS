## 表、栈和队列

### 1 链表

链表由一系列不必在内存中相连的节点组成。每个节点均含有一个元素值（下图中的$A_1$、$A_2$等）和指向后继节点的指针（下图中的箭头所表示），这里称之为Next指针。最后一个节点的Next指针指向NULL。
<img src="../../Images/list/list_overview.png"/>

图1-1 一个链表


#### 1.1 节点
首先，定义链表中每个节点的结构如下：
``` typescript
class LinkedListNode<T> {
    public next: LinkedListNode<T> | null = null;
    public value: T | null = null;
    constructor(value?: T) {
        if (value) {
            this.value = value;
        }
    }
}

```
#### 1.2 链表的实现细节

- 插入操作：以$O(1)$的运行时间向链表中插入一个新的节点。
<img src="../../Images/list/list_insert.png"/>

图1-2 在$A_2$节点后向链表中插入

代码如下：
``` typescript
    public insert(value: T, node?: LinkedListNode<T>): LinkedListNode<T> {
        const newNode = new LinkedListNode(value);
        const prevNode = this.findPrevNode(node);
        const nextNode = prevNode.next;
        prevNode.next = newNode;
        newNode.next = nextNode;
        return newNode;
    }
```


- 删除操作：以$O(N)$的运行时间将某个节点从链表中删除，$N$为链表中的节点数量。
<img src="../../Images/list/list_delete.png"/>

图1-3 从链表中删除$A_3$元素

代码如下：
``` typescript
    public delete(node: LinkedListNode<T>) {
        const prevNode = this.findPrevNode(node);
        prevNode.next = node.next;
        node.next = null;
    }
```

- 查找操作：以$O(N)$的运行时间返回链表中的某个节点。
