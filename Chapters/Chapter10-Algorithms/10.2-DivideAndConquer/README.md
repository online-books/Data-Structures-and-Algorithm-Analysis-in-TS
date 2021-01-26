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
