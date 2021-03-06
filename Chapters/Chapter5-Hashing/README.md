<!-- @format -->

## 散列

散列是一种用于以常数平均时间执行插入、删除和查找的技术。但是它不支持元素间的排序操作，因此像$FindMIn$、$FindMax$以及以线性时间遍历所有元素的操作都是散列所不支持的。

理想的散列结构是包含有关键字的具有固定大小的数组，记数组的大小为$TableSize$。每个关键字被映射到从$0$到$TableSize-1$这个范围中的某个数，然后被放到数组的某个单元中，这个映射就叫做散列函数。理想情况下散列函数应该运算简单并且保证任何两个不同的关键字映射到不同的单元。

<image  height="240" src="../../Assets/Images/ch5/5-1.png" />
图 5-1 一个理想的散列表

### 散列函数

---

如果输入的关键字是整数，则一般合理的方法就是直接返回"key mod TableSize"。如果 key 碰巧具有某些不理想的性质，例如表的大小是$10$而关键字都以$0$为个位，那么该散列函数就不是一个好的选择。为了避免这样的情况，好的办法通常是保证表的大小是素数。当输入的关键字是随机整数时，散列函数不仅计算起来简单而且关键字的分配也很均匀。

如果输入的关键字是字符串，一种简单而且能快速计算出散列值的方法是把字符串中字符的$ASCII$码值加起来。

### 冲突问题

当一个元素被插入处另一个元素已经存在（散列值相同），那么就产生一个冲突。有两种最简单的方法可以解决这种冲突：分离链接法和开放定址法。

### 分离链接法（separate chaining）

---

分离链接法是将散列到同一个值的所有元素保留到一个链表中。

<image  height="240" src="../../Assets/Images/ch5/5-2.png" />

图 5-2 分离链接散列表

为了在散列表上执行$Find$、$Insert$、$Delete$操作，先使用散列函数来确定要考察的链表，然后在链表上执行相应的$Find$、$Insert$、$Delete$。

### 开放定址法（open addressing hashing）

---

在开放定址散列算法系统中，如果有冲突发生，那么就要尝试选择另外的单元，直到找到空的单元为止。更一般地，单元$h_0(X)$，$h_1(X)$，$h_2(X)$等相继被试选，其中$h_i(X)=(Hash(X)+F(i))$ mod TableSize，且$F(0)=0$。函数 $F$ 是冲突解决方法。因为所有的数据都要装入表内，所以开放定址散列法所需要的表要比分离链接散列用表大。一般说来，对开放定址散列法来说，装填因子$\lambda$应该小于$0.5$。

#### 线性探测法

在线性探测法中，函数$F$是$i$的线性函数，典型情形是$F(i)=i$，相当于逐个探测每个单元以查找一个空单元。

#### 平方探测法

平方探测法就是冲突函数为二次函数的探测方法，常用的选择是$F(i)=i^2$。如果表有一半是空的，并且表的大小是素数，那么使用平方探测法总能够插入一个新的元素。表的大小是素数非常重要，如果表的大小不是素数，那么备选单元的个数可能会少很多。

在开放定址散列表中，无法进行标准的删除操作，原因是相应的单元可能已经引起过冲突，元素存在了别处，因此开放定址散列表需要懒惰删除。

#### 再散列

对于使用平方探测的开放定址散列法，如果表的元素填的太满，那么操作的运行时间将会过长，且$Insert$操作可能失败。此时，一种解决方法是建立另外一个大约两倍大小的表，扫描整个原始散列表，计算每个元素的新散列值并将其插入到新表中。

### 代码位置

---

[SourceCode/HashTable/HashTable.ts](../../SourceCode/HashTable/HashTable.ts)
