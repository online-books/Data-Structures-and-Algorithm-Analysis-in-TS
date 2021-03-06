<!-- @format -->

## 第一章引论

本章的主要内容是简要地复习离散数学的一些基础知识以及如何估计一个算法所需要的时间。

### 1 数学知识复习
---

#### 指数

$$
X^AX^B=X^{A+B} \tag{1-1}
$$

$$
\frac{X^A}{X^B}=X^{A-B} \tag{1-2}
$$

$$
(X^A)^B=X^{AB} \tag{1-3}
$$

$$
X^N+X^N=2X^N \not ={X^{2N}}  \tag{1-4}
$$

$$
2^N+2^N=2^{N+1} \tag{1-5}
$$

#### 对数

*在计算机科学中，除非有特别的说明，所有的对数都是以 $2$ 为底的*

$$
\log_AB= \frac{\log_CB}{\log_CA}(C>0) \tag{1-6}
$$

$$
\log{AB}= \log A+\log B \tag{1-7}
$$

$$
\log \frac{A}{B}=\log A - \log B \tag{1-8}
$$

$$
\log(A^B)=B \cdot \log A \tag{1-9}
$$

$$
\log X<X(X>0) \tag{1-10}
$$

#### 级数

$$
\sum_{i=0}^{N}i=\frac{N(N+1)}{2} \tag{1-11}
$$

$$
\sum_{i=0}^{N}2^i=2^{N+1}-1 \tag{1-12}
$$

$$
\sum_{i=0}^{N}A^i=\frac{A^{N+1}-1}{A-1} \tag{1-13}
$$

在公式 1-13 中，如果$0<A<1$,则

$$
\sum_{i=0}^{N}A^i \leq \frac{1}{1-A} \tag{1-14}
$$

当 N 趋于$\infty$时，该和趋于$\frac{1}{1-A}$。


$$
\sum_{i=1}^{N}i^2=\frac{N(N+1)(N+2)}{6} \approx \frac{N^3}{3}  \tag{1-15}
$$

$$
\sum_{i=1}^{N}i^k \approx \frac{N^{k+1}}{|k+1|},(k \not ={-1})  \tag{1-16}
$$

当$k=-1$时，公式 1-16 不成立，此时有如下公式：

$$
H_N=\sum_{i=1}^{N}\frac{1}{i} \approx lnN    ,(k=-1) \tag{1-17}
$$

$H_N$叫做调和数，该近似式中的误差趋向于$\gamma \approx 0.57721566，$这个值称为欧拉常数。

#### 模运算

如果 $N$整除 $A-B$，那么就说$A$与 $B$模 $N$ 同余，记为$A \equiv B(mod \ N)$。无论 $A$ 还是$B$ 被$N$去除，所得的余数都是相同的。若$A \equiv B(mod \ N)$，则$A+C \equiv B+C(mod \ N)$以及$AD \equiv BD(mod \ N)$。

### 2.算法分析
---
**算法**是为求解一个问题需要遵循的、被清楚地指定的简单指令的集合。对于一个问题，如果给定某个正确的算法，那么重要的一步就是确定该算法需要多少时间或空间等资源量的问题。如果一个问题的求解算法需要长达一年时间，那么这种算法就很难有什么用处。

估计算法资源消耗所需的分析通常使用大$O$记法。

**定义： 如果存在正常数$c$和$n_0$使得当$N \ge n_0$时,$T(N) \le cf(N)$，则记为$T(N)=O(f(N))$。**

这个定义的目的是通过比较两个函数间的**相对增长率**来进行算法分析。设$T(N)=1000N,f(N)=N^2$，虽然$N$比较小时$T(N)$比$f(N)$大，但当$n_0=1000时，对任意的$$N \geq n_0$，都有$T(N) \leq f(N)$。因此，$T(N)$的增长率就$f(N)$的增长率。

当$T(N)=O(f(N))$时，函数$T(N)$是在以不快于$f(N)$的速度增长，因此$f(N)$是$T(N)$的一个上界。

如果$T_1(N)=O(f(N))$且$T_2(N)=O(g(N))$,那么：

$$T_1(N)+T_2(N)=max\{O(f(N)),O(g(N))\} \tag{1}$$

$$T_1(N)*T_2(N)=O(f(N) \cdot g(N)) \tag{2}$$

如果$T(N)$是一个$k$次多项式，则$T(N)=O(N^k)$；对任意常数$k$，$\log^kN=O(N)$，也就是说对数增长得非常缓慢。

在需要大$O$表示的任何分析中，对精度的要求很低，各种简化都是可能发生的。低阶项一般可以被忽略，常数项也可以弃掉。比如$T(N)=O(2N^2)$或$T(N)=O(N^2+N)$这样的写法是错误的 。

### 3. 运行时间的计算

假设一个程序在输入为$N$时的平均情形与最坏情形下的运行时间分别是$T_{avg}(N)$和$T_{worst}(N)$，那么$T_{avg}(N) \le T_{worst}(N)$。由于大$O$是一个上界，所以我们要计算的运行时间就是最坏情况下的运行时间。原因之一是它对所有的输入提供来一个界限，包括特别坏的输入，而平均情况不能提供这样的界。另一个原因是平均情况的界计算起来通常要困难得多。

要对程序的运行时间进行分析，我们可以参照下面的法则：

-   FOR 循环：一次 for 循环的运行时间至多是该 for 循环内部语句的运行时间乘以迭代次数
-   嵌套的 FOR 循环：从里向外分析循环。在一组嵌套循环内部的一条语句总的运行时间为该语句的运行时间与所有的 for 循环大小的乘积。例如下面的这个程序片段的运行时间为$O(N^2)$。

```typescript
for (let i = 0; i < N; i++) {
    for (j = 0; j < N; j++) {
        k++
    }
}
```

-   顺序语句：将各个语句的运行时间求和即可。下面的程序先用去$O(N)$运行时间，再花费$O(N^2)$，总的运行时间是$O(N^2)$。

```typescript
for (let k = 0; i < N; k++) {
    k++
}
for (let i = 0; i < N; i++) {
    for (j = 0; j < N; j++) {
        k++
    }
}
```

-   IF/ELSE语句：一个if/else语句的运行时间不超过判断语句再加上S1和S2中运行时间较长的总的运行时间。

```typescript
if(condition){
    S1
}else{
    S2
}
```


作为例子，我们来看看对于最大子序列和问题，不同的求解算法应该如何计算出对应的运行时间。

问题：给定整数$A_1,A_2,...,A_N$（可能有负数），求$\sum_{k=i}^jA_k$的最大值（若所有整数均为负数，则最大子序列和为$0$）。

例如：输入为$-2、11、-4、13、-5、-2$时，输出 $20$（$11 -4 +13=20$）。

我们有三种方法可以求解该问题。

#### 算法1.穷举法

该算法穷举式地尝试所有的可能，其运行时间为$O(N^2)$。

```typescript
export function maxSubSequenceSum1(n: number[]): number {
    const {length} = n
    let currentSum = 0
    let maxSum = 0
    for (let i = 0; i < length; i++) {
        currentSum = 0
        for (let j = i; j < length; j++) {
            currentSum += n[j]
            if (currentSum > maxSum) {
                maxSum = currentSum
            }
        }
    }
    return maxSum
}
```

#### 算法2.分治法

该算法采用“分治策略”：在“分”阶段把问题分解成两个大致相等的子问题，然后递归地对它们求解；在“治”阶段将两个子问题的解合并在一起并可能在做些少量的附加工作，最后得到整个问题的解。在这个例子中，最大子序列和可能在三处出现：或者整个出现在输入数据的左半部，或者整个出现在右半部，或者跨越输入数据的中部从而占据左右两部分。

该算法的运行时间为$O(N\log N)$。

```typescript
export function maxSubSequenceSum2(n: number[]): number {
    if (n.length === 0) {
        return 0
    }
    return maxSum(0, n.length - 1, n)
}

function maxSum(start: number, end: number, n: number[]): number {
    if (start === end) {
        return Math.max(n[start], 0)
    }
    const middle = Math.floor((start + end) / 2)
    // 递归求解左半部分最大子序列和
    const maxLeftSum = maxSum(start, middle, n)
    // 递归求解右半部分最大子序列和
    const maxRightSum = maxSum(middle + 1, end, n)
    let leftBorderSum = 0
    let leftMaxBorderSum = 0
    // 计算中间分界处到左半部分的最大和
    for (let i = middle; i >= start; i--) {
        leftBorderSum += n[i]
        if (leftBorderSum > leftMaxBorderSum) {
            leftMaxBorderSum = leftBorderSum
        }
    }
    let rightBorderSum = 0
    let maxRightBorderSum = 0
    // 计算中间分界处到右半部分的最大和
    for (let j = middle + 1; j <= end; j++) {
        rightBorderSum += n[j]
        if (rightBorderSum > maxRightBorderSum) {
            maxRightBorderSum = rightBorderSum
        }
    }
    return Math.max(maxLeftSum, maxRightSum, leftMaxBorderSum + maxRightBorderSum)
}
```

为了分析该算法的运行时间，令$T(N)$是求解输入大小为$N$的最大子序列和问题所花费的时间，那么在“分”阶段求解左半部分和右半部分的时间就分别是$T(\frac{N}{2})$。在“治”阶段从分界处到左半部分和右半部分的运行时间分别为$\frac{N}{2}$，因此我们能得到方程组
$$T(N)=2T(N/2)+N \tag{1-18} $$ 
$$T(1)=1 \tag{1-19}$$

为了求解方程 1-19，我们在方程两边同时除以$N$，得到
$$ \frac{T(N)}{N}=\frac{T(N/2)}{N/2}+1 \tag{1-20} $$

将$\frac{N}{2}$代入方程 1-20 中，得到
$$\frac{T(N/2)}{N/2}=\frac{T(N/4)}{N/4}+1 \tag{1-21}$$
$$\vdots$$
$$\frac{T(2)}{2}=T(1)+1$$

从$T(N)$到$T(2)$，我们一共递归地代入了$\log N$次，将所有这些方程的左右两端分别相加后，得到

$$ \frac{T(N)}{N}=T(1)+ \log N \tag{1-22} $$

方程 1-22 两边同乘$N$后，得到

$$ T(N)=N+ N\log N \tag{1-23} $$

故时间复杂度为$O(N \log N)$。

#### 算法3.联机算法

该算法的关键之处在于当输入数据被顺序处理时，若当前子序列的和小于$0$，则将该子序列的和重置为$0$。

由于只对数据进行了一次遍历，该算法的运行时间为$O(N)$。

仅需要常量空间并以线性时间运行的联机算法即空间复杂度为$O(1)$，时间复杂度为$O(N)$的算法几乎是完美的算法。

```typescript
// 算法3，联机法
export function maxSubSequenceSum3(n: number[]): number {
    let currentSum = 0
    let maxSum = 0
    for (let i = 0, j = n.length; i < j; i++) {
        currentSum += n[i]
        if (currentSum > maxSum) {
            maxSum = currentSum
        }
        if (currentSum < 0) {
            currentSum = 0
        }
    }
    return maxSum
}
```

### 代码位置

---

[SourceCode/Intorduction/Intorduction.ts](/SourceCode/Introduction/Introduction.ts)

### 参考

---

[时间复杂度-维基百科](https://zh.wikipedia.org/wiki/%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)

[算法的时间与空间复杂度-知乎](https://zhuanlan.zhihu.com/p/50479555)
