<!-- @format -->

## 分治算法

分治算法由两部分组成：

    分（divide）：递归地解决较小的问题
    治（conquer）：从子问题的解构建原问题的解

分治算法一般包含至少两个递归调用，且子问题是不相交的。比如求最大子序列和的问题、排序算法中的归并排序和快速排序用的就是分治算法。

### 分治算法的运行时间

根据分治算法的定义，原问题与子问题之间的运行时间关系为：

$$T(N)=aT(N/2)+ \Theta(N^k) \tag{1}$$

我们假设$N=b^m$且$a\ge1,b>1$，则$\frac{N}{b}=b^{m-1}$以及$N^k=(b^m)^k=b^{mk}=(b^k)^m$，得到：

$$T(b^m)=aT(b^{m-1})+(b^k)^m \tag{2}$$

如果我们用$a^m$除公式 2 两边，得到：

$$\frac{T(b^m)}{a^m}=\frac{T(b^{m-1})}{a^{m-1}}+(\frac{b^k}{a})^m \tag{3}$$

继续对$m-1,m-2,\cdots,1$应用公式 3，得到：

$$\frac{T(b^{m-1})}{a^{m-1}}=\frac{T(b^{m-2})}{a^{m-2}}+(\frac{b^k}{a})^{m-1} \tag{4}$$

$$\frac{T(b^{m-2})}{a^{m-2}}=\frac{T(b^{m-3})}{a^{m-3}}+(\frac{b^k}{a})^{m-2} \tag{5}$$

$$\vdots$$

$$\frac{T(b^1)}{a^1}=\frac{T(b^{0})}{a^{0}}+(\frac{b^k}{a})^1 \tag{6}$$

将公式 3 到公式 6 的左右两边分别相加后，整理得到：

$$\frac{T(b^m)}{a^m}=1+\sum_{i=1}^{m}(\frac{b^k}{a})^i=\sum_{i=0}^{m}(\frac{b^k}{a})^i \tag{7}$$

因此

$$T(N)=T(b^m)=a^m \sum_{i=0}^{m}(\frac{b^k}{a})^i \tag{8}$$

如果$a>b^k$，那么和就是一个公比小于$1$的几何级数，因此该有穷级数以一个常数为界，从而有：

$$T(N)=O(a^m)=O(a^{log_{b}N})=O(N^{log_{b}a}) \tag{9}$$

如果$a=b^k$，那么和中的每一项均为$1$。由于含有$1+\log_{b}N$项而$a=b^k$，那么$\log_{b}a=k$，于是：

$$T(N)=O(a^m \log_{b}N)=O(N^{log_{b}a}\log_{b}N)=O(N^k \log_{b}N)=O(N^k \log N) \tag{10}$$

最后，如果$a<b^k$，那么该几何数中的项都大于$1$，得到：

$$T(N)=a^m \frac{(\frac{b^k}{a})^{m+1}-1}{\frac{b^k}{a}-1}=O(a^m (\frac{b^k}{a})^m)=O((b^k)^m)=O(N^k) \tag{11}$$

综上所述，公式 1 的解为：

$$
T(N)=
\begin{cases}
O(N^{\log_{b}a}) \qquad a>b^k\\
O(N^k \log N) \qquad a=b^k\\
O(N^k) \qquad a<b^k
\end{cases}
$$

### 最近点问题

对平面上的点列$p$，其任意两点$p_1=(x_1,y_1),p_2=(x_2,y_2)$，$p_1$和$p_2$之间的欧几里德距离为$\sqrt{(x_1-x_2)^2+(y_1-y_2)^2}$，求平面$P$上距离最短的一对点。

假设平面上的这些点已经按坐标$x$排序，如图 9-6 所示。

<image height="240" src="../../../Assets/Images/ch9/9-6.png" />

图 9-6 点集$p$

既然这些点已经按照$x$坐标排序，那么我们可以用一条线将点集分为两部分：$p_L$和$p_R$。此时，最近的一对点或者都在$p_L$中，或者都在$p_R$中，或者一个在$p_L$中另一个在$p_R$中，我们把这三个距离分别叫做$d_L,d_R,d_C$。如图 9-7 所示。

<image height="240" src="../../../Assets/Images/ch9/9-7.png" />

图 9-7 被分成$p_L$和$p_R$的点集$p$

我们可以递归地计算$d_L$和$d_R$。此时问题的关键就是计算$d_C$。令$m=min(d_L,d_R)$，如果$d_C<m$，那么定义$d_C$的两个点必然在分割线的$m$距离之内。如图 9-8 所示。

<image height="240" src="../../../Assets/Images/ch9/9-8.png" />

图 9-8 双道带区域

在最坏的情形下，所有的点可能都在这条带状区域内，但如果带状区域内的点是按$y$坐标排序的，则我们只需要计算当确定$d_C$的两个点$p_i$和$p_j$的 y 坐标最多相差$m$时的情况，如图 9-9 所示。

<image height="240" src="../../../Assets/Images/ch9/9-9.png" />

图 9-9 对于点$p_3$来说，只需考虑$p_1$和$p_4$

对于任意的点$p_i$，在最坏的情况下最多有$7$个点被考虑。因为这些点必定落在该带状区域左半部分的$m \times m$方块内或者落在该带状区域右半部分的$m\times m$方块内。另一方面，在每个$m\times m$方块内的所遇点至少分离$m$。在最坏的情况下，每个方块包含 4 个点，每个角上一个点。这些点中有一个是$p_i$，因此最多还剩下$7$个点要考虑。最坏情形如图 9-10 所示。

<image height="240" src="../../../Assets/Images/ch9/9-10.png" />

图 9-10 最多有$8$个点在该矩形中，其中有两个坐标分别被左右两部分的点共享

因为对于每个$p_i$最多有$7$个点要考虑，所以计算比$m$好的$d_c$的时间是$O(N)$。因此，基于两个一半大小的递归调用加上联合两个结果的线性附加计算，我们对最近点问题有一个$O(N \log N)$的解。

### 代码位置

[SourceCode/Algorithms/DivideAndConquer/FindingNearestPointPair.ts](/SourceCode/Algorithms/DivideAndConquer/FindingNearestPointPair.ts)
