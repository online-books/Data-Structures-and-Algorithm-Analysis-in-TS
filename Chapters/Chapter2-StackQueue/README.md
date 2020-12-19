<!-- @format -->

## 栈和队列

### 1 栈

---

栈（stack）是限制插入和删除只能在一个位置上进行，叫做栈的顶（Top）。

<image height="340" src="../../Assets/Images/ch2/1-1.png"/>

图 1-1 栈模型：对栈的访问

对栈的基本操作有$Push$（进栈）和$Pop$（出栈），前者相当于在栈顶插入元素，后者则是删除栈顶的元素。

<image height="340" src="../../Assets/Images/ch2/1-2.png"/>

图 1-2 栈的操作：栈的进栈与出栈

### 2 队列

---

队列(queue)是插入在一端进行而删除则在另一端进行的，分别叫做队列的队尾和队头。

<image height="340" src="../../Assets/Images/ch2/2-1.png"/>

图 2-1 队列模型

队列的基本操作是$Enqueue$（入队），它是在队尾插入一个元素；还有$Enqueue$（出队），它是删除队头的元素。

<image height="340" src="../../Assets/Images/ch2/2-2.png"/>

图 2-2 队列的操作

### 代码位置

---

[SourceCode/Stack/Stack.ts](../../SourceCode/Stack/Stack.ts)
[SourceCode/Queue/Queue.ts](../../SourceCode/Queue/Queue.ts)
