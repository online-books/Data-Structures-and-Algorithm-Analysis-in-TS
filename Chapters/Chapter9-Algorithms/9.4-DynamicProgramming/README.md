<!-- @format -->

## 动态规划

用自然递归程序计算斐波那契数是非常低效的，其运行时间$T(N)=T(N-1)+T(N-2)$。由于$T(N)$作为斐波那契数满足同样的递归关系并具有相同的初始条件，因此$T(N)$是与以斐波那契数相同的指数级速度增长的。解决这个问题的关键是将递归算法改为非递归算法，并将子问题的答案系统地记录在一个表内，这种方法就叫做动态规划。

### 1. 矩阵乘法的顺序安排

给定四个矩阵$A=dims(50,10)$、$B=dims(10,40)$、$C=dims(40,30)$、$D=dims(30,5)$。虽然矩阵乘法不满足交换律，但满足结合律。因此矩阵的乘积$A \cdot B \cdot C \cdot D$可以以任意顺序添加括号然后计算其值。将两个阶数分别为$p\times q$和$q\times r$的矩阵相乘，需要$p\times q \times r$次标量乘法。那么，计算$A \cdot B \cdot C \cdot D$需要执行的三个矩阵乘法的最好方式是什么呢？

在四个矩阵的情况下，可以通过穷举搜索求解这个问题，因为这些矩阵只有五种相乘顺序，对应的乘法次数分别是：

-   $A\cdot((B\cdot C)\cdot D)$：计算$B\cdot C$需要$10 \times 40 \times 30=12000$次乘法；计算$(B\cdot C)\cdot D$需要$12000+10\times30\times5=13500$次乘法；计算$A\cdot((B\cdot C)\cdot D)$总计需要$13500+50\times10\times5=16000$次乘法。

-   $A \cdot (B \cdot (C\cdot D))$：计算$C\cdot D$需要$40 \times 30 \times 5=6000$次乘法；计算$B\cdot (C\cdot D)$需要$6000+10\times40\times5=8000$次乘法；计算$A \cdot (B \cdot (C\cdot D))$总计需要$8000+50\times10\times5=10500$次乘法。

-   $(A\cdot B)\cdot(C\cdot D)$：计算$A\cdot B$需要$50 \times 10 \times 40=20000$次乘法；计算$C\cdot D$需要$40\times30\times5=6000$次乘法；计算$(A\cdot B)\cdot(C\cdot D)$总计需要$20000+6000+50\times 40 \times 5=36000$次乘法。

-   $((A\cdot B)\cdot C) \cdot D$：计算$A\cdot B$需要$50 \times 10 \times 40=20000$次乘法；计算$(A\cdot B)\cdot C$需要$20000+50\times40\times30=80000$次乘法；计算$((A\cdot B)\cdot C) \cdot D$总计需要$80000+50\times30\times5=87500$次乘法。

-   $(A\cdot (B\cdot C)) \cdot D$：计算$B\cdot C$需要$10 \times 40 \times 30=12000$次乘法；计算$A\cdot (B\cdot C)$需要$12000+50\times10\times30=27000$次乘法；计算$(A\cdot (B\cdot C)) \cdot D$总计需要$27000+50\times30\times5=34500$次乘法。

上面的计算说明，最好的排列顺序方法大约只用了最坏的排列顺序方法的九分之一的乘法次数。因此，需要进行一些计算来确定最优顺序。

设$T(N)$是顺序的个数，则$T(1)=T(2)=1$，$T(3)=2$，$T(4)=5$，所以$T(N)$满足：

$$T(N)=\sum_{i=1}^{N-1}T(i)T(N-i) \tag{1}$$

这个递归式的解是著名的$Catanlan$数，该数成指数增长。因此，对于大的$N$，用穷举搜索所有可能的排列顺序是不可行的。

对于$1 \le i \le N$，令$c_i$是矩阵$A_i$的列数，$r_i$是矩阵$A_i$的行数，则$c_i=i_{i-1}$。设$m_{left,right}$是进行矩阵乘法$A_{left}A_{left-1} \cdots A_{right-1}$所需要的乘法次数,且$m_{left,left}=0$。如果最后的乘法是$(A_{left} \cdots A_i)(A_{i+1} \cdots A_{right})$，其中$left \le i \le right$，则所用的乘法次数为$m_{left,i}+m_{i+1,right}+c_{left-1}\cdot c_{i}\cdot c_{right}$。

如果$M_{left,right}$为在最优排列顺序下所需要的乘法次数，$left<right$，则得到下面的公式：

$$M_{left,right}=min(M_{left,i}+M_{i+1,right}+c_{left-1}\cdot c_i \cdot c_{right})  \tag{2}$$

### 2. 最优二叉查找树

第二个动态规划的例子是：给定一列单词$w_1,w_2,\cdots,w_N$和它们出现的固定的概率$p_1,p_2,\cdots,p_N$，问题是如何将这些单词存在一棵二叉查找树上，使得总的期望存取时间最小。

在一棵二叉查找树中，访问深度$d$处的一个元素需要的比较次数是$d+1$，因此如果$w_i$被放在深度$d_i$上，那么我们就要将$\sum_{i=1}^{N}p_i(1+d_i)$最小化。

动态规划解由两个观察结论得到。假设我们想要把排序过的一些单词$w_{left},w_{left+1},\cdots,w_{right-1},w_{right}$放到一棵二叉查找树中。设最优二叉查找树以$w_i$为根，其中$left \le i \le right$。首先，左子树必须包含$w_{left},w_{left+1},\cdots,w_{i-1}$，右子树必须包含$w_{i+1},w_{i+2},\cdots,w_{right}$。再者这两棵子树必须是最优的，否则它们可以用最优子树代替。

在该最优二叉查找树中，根节点$w_i$的代价为$p_i$。左子树的代价相对于它的根为$C_{left,i-1}$，右子树的代价相对于它的根为$C_{i+1,right}$。这两棵子树的每个节点从$w_i$开始都比从它们对应的根开始深一层，因此，我们还必须再加上$\sum_{j=left}^{i-1}p_j$和$\sum_{j=i+1}^{right}p_j$。于是得到如下公式：

$$
\begin{aligned}
C_{left,right}&=min(p_i+C_{left,i-1}+C_{i+1,right}+\sum_{j=left}^{i-1}p_j+\sum_{j=i+1}^{right}p_j) \\\\
&=min(C_{left,i-1}+C_{i+1,right}+\sum_{j=left}^{right}p_j)
\end{aligned} \tag{3}
$$

### 代码位置

[SourceCode/Algorithms/DynamicProgramming/OptMatrix.ts](/SourceCode/Algorithms/DynamicProgramming/OptMatrix.ts)

[SourceCode/Algorithms/DynamicProgramming/OptBST.ts](/SourceCode/Algorithms/DynamicProgramming/OptBST.ts)
