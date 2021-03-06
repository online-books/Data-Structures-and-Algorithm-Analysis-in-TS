<!-- @format -->

## 快速排序

快速排序是在实践中最快的已知排序算法，它的平均时间是$O(N\log N)$。该算法之所以快，主要是由于它非常精炼和高度优化的内部循环。它的最坏情形的性能为$O(N^2)$。像归并排序一样，快速排序也是一种分治的递归算法。将数组$S$排序的基本算法由下面的四步组成：

1.  如果$S$中元素个数是$1$，则返回该元素
2.  从$S$中选取*枢纽元*(pivot)元素$v$
3.  将$S$中除$v$外的其他元素分成两个不相交的集合：$S_1= \lbrace x\in S- \lbrace v \rbrace, x\leq v \rbrace$和$S_2= \lbrace x\in S- \lbrace v \rbrace, x\geq v \rbrace$。
4.  递归地处理 $quicksort(S_1)$和$quicksort(S_2)$。

### 选取枢纽元

---

#### 一种错误的方法

假设将第一个元素用作枢纽元。如果输入数据是预排序或反序的，那么这样的枢纽元就会导致所有的元素不是都被划入$S_1$就是都被划入$S_2$，而且这种情况可能还发生在所有的递归调用中。那么快速排序花费的时间将是$O(N^2)$，但实际上却根本没起到排序的作用。

#### 一种安全的方法

另一种选法是从输入数据中随机地选取枢纽元，除非随机数生成器有问题，否则在递归地处理子序列的过程中不会经常出现像第一种方法那样很坏的元素划分。

#### 一种最优的方法

枢纽元的最好的选择是数组的中值，不过这很难算出并且会明显减慢快速排序的速度。因此一般的做法是采用三数中值分割法，使用数组左右两端和中心位置上的三个元素的中值作为枢纽元。

### 最佳的分割策略

---

在分割阶段要做的就是把所有小于枢纽元的元素移到数组左边而把大的元素移到数组右边。首先通过将枢纽元与最后一个元素交换位置使得枢纽元不在要被分割的元素集中。然后$i$从第一个元素开始而$j$从倒数第二个元素开始，当$i$在$j$的左边时，将$i$右移，移过那些小于或等于枢纽元的元素，并将$j$左移，移过那些大于或等于枢纽元的元素。当$i$和$j$停止时，$i$指向一个大于枢纽元的元素而$j$指向一个小于枢纽元的元素。如果$i$在$j$的左边，那么将这两个元素互换，其效果是把一个大的元素移向右边而把一个小的元素移到左边。重复该过程直到$i$和$j$彼此交错位置。

分割的最后一步是将枢纽元与$i$所指向的元素交换。在最后一步，当枢纽元与$i$所指向的元素交换时，在位置$P<i$的每一个元素都必然是小元素，在位置$P>i$上的元素必然都是大元素。

### 小数组

---

对于很小的数组$(N\leq 20)$，快速排序不如插入排序好，因为快速排序是递归的。通常的解决方法是对小的数组不递归地使用快速排序，而代之以插入排序这样对小数组有效的排序算法。

### 快速排序的分析

---

快速排序的运行时间等于两个递归调用的运行时间加上花费在分割上的线性时间（枢纽元的选取花费常数时间）。我们能得到基本的快速排序关系：

$$T(N)=T(i)+T(N-i-1)+c \cdot N \tag{1}$$

#### 最坏情况的分析

枢纽元始终是最小元素。此时$i=0$，那么递推关系为：

$$T(N)=T(N-1)+c\cdot N(N>1) \tag{2}$$

反复使用方程 1，我们得到：

$$T(N-1)=T(N-2)+c\cdot （N-1） \tag{3}$$
$$T(N-2)=T(N-3)+c\cdot （N-2） \tag{4}$$
$$ \vdots$$
$$T(2)=T(1)+c(4) \tag{5}$$

将所有这些方程相加，得到：

$$T(N)=T(1)+c\sum_{i=2}^{N}i=O(N^2) \tag{6}$$

#### 最好情况的分析

在最好的情况下，枢纽元正好位于中间。我们假设两个子数组恰好各为原数组的一半大小，那么得到：

$$T(N)=2T(N/2)+c\cdot N \tag{7}$$

用$N$去除方程 5 的两边，得到：
$$\frac{T(N)}{N}=\frac{T(N/2)}{N/2}+c \tag{8}$$

我们反复套用方程 6，得到：

$$\frac{T(N/2)}{N/2}=\frac{T(N/4)}{N/4}+c \tag{9}$$
$$\frac{T(N/4)}{N/4}=\frac{T(N/8)}{N/8}+c \tag{10}$$
$$ \vdots$$
$$\frac{T(2)}{2} =\frac{T(1)}{1}+c(11)$$

将方程 5-9 相加后得到：
$$\frac{T(N)}{N}=\frac{T(1)}{1}+c \cdot \log N \tag{12}$$

由此得到：
$$T(N)=N \cdot T(1)+c \cdot N\log N \tag{13}$$

#### 平均情况的分析

对于平均情况，我们假设$S$中每个元素的大小是等可能的，因此每个大小均有概率$\frac{1}{N}$。由该假设可知，$T(i)$与$T(N-i+1)$的平均值为$\frac{1}{N} \cdot \sum_{j=0}^{N-1}T(j)$。此时方程 1 变成：

$$T(N)=\frac{2}{N}\cdot \sum_{j=0}^{N-1}T(j)+c \cdot N \tag{14}$$

用$N$乘以方程 14，则有
$$NT(N)=2  \sum_{j=0}^{N-1}T(j)+c \cdot N^2 \tag{15}$$
$$(N-1)T(N-1)=2  \sum_{j=0}^{N-2}T(j)+c \cdot (N-1)^2 \tag{16}$$

用方程 15 减去方程 16，得到：
$$NT(N)-(N-1)T(N-1)=2T(N-1)+2cN-c \tag{17}$$

移项、合并并除去无关紧要的$c$之后，得到：
$$NT(N)=(N+1)T(N-1)+2cN \tag{18}$$

再用$N(N+1)去除方程18，得到$
$$\frac{T(N)}{N+1}=\frac{T(N-1)}{N}+\frac{2c}{N+1} \tag{19}$$

然后进行叠缩，得到：
$$\frac{T(N-1)}{N}=\frac{T(N-2)}{N-1}+\frac{2c}{N} \tag{20}$$
$$\vdots$$
$$\frac{T(2)}{3}=\frac{T(1)}{2}+\frac{2c}{3} \tag{21}$$

将方程 19 到方程 21 相加后，得到：

$$\frac{T(N)}{N+1}=\frac{T(1)}{2}+2c\sum_{i=3}^{N+1}\frac{1}{i} \tag{22}$$
该和大约为$ln(N+1)+\gamma-\frac{3}{2}$，其中$\gamma \approx0.577$叫做欧拉常数，于是：
$$\frac{T(N)}{N+1}=O(\log N) \tag{23}$$
从而
$$T(N)=O(N\log N) \tag{24}$$

### 快速选择的线性期望时间算法

---

查找集合$S$中第$k$个最小元素的问题就做*选择问题*。可以通过修改快速排序算法以解决这个问题的算法叫**快速选择**。

快速选择算法几乎与快速排序相同。它们的前三步是一样的。令$S_i$为$S$中元素的个数。快速选择的步骤如下：

1. 如果$S_i=1$，则将$S$中的元素作为答案返回
2. 否则，选取一个枢纽元$v\in S$。
3. 将集合$S$中除$v$外的其他元素分成$S_1$和$S_2$。
4. 如果$k \leq S_{1_i}$，那么第$k$小元素必定在$S_1$中。在这种情况下，返回$quickselect(S_1,k)$。如果$k=1+S_{1_i}$，那么枢纽元就是第$k$个最小元。否则，第$k$个最小元就在$S_2$中，它是$S_2$中的第$(k- S_i-1)$个最小元，那么就返回$quickselect(S_2,k- S_i-1)$。

与快速排序相比，快速选择只做了一次递归调用而不是两次。快速选择的最坏情况和快速排序的相同，也是$O(N^2)$,最坏情况发生在$S_1$和$S_2$有一个为空的时候。它的平均运行时间是$O(N)$。

### 代码位置

---

[SourceCode/Sort/QuickSort.ts](../../../../SourceCode/Sort/QuickSort.ts)
