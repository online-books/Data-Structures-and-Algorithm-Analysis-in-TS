<!-- @format -->

## 引论

### 1 提出问题

---

#### 选择问题(selection problem)

设有一组 N 个数而要确定其中第 k 个最大值。"显而易见"的解决方法有很多。<br>
该问题的一种解法是将这 N 个数读进一个数组中，再通过某种排序算法，以递减顺序将数组排序，然后返回位置 k 伤的元素。<br>
稍微好一点的解法是可以把前 k 个元素读入数组并以递减的顺序将其排序，将剩下的元素再逐个读入。当新元素被读到时，如果它小于数组中的第 k 个元素则忽略，否则就将其放到数组中正确的位置上，同时将数组中的一个元素挤出数组。当算法中止时，位于第 k 个位置上的元素作为答案返回。<br>
这两种算法哪个更好？哪个算法更重要？还是两个算法都足够好？使用含一百万个元素的数组，在$k=500,000$的条件下进行模拟发现，两个算法在合理的时间内均不能结束。以后将讨论另一种算法，该算法将在一秒钟左右给出问题的解。因此虽然这两个算法都能算出结果，但它们不能被认为是好的算法，因为对于第三种算法在合理的时间内能够处理的输入数据量而言，这两种算法是完全不切实际的。<br>

在许多问题中，一个重要的观念是：**写出一个可以工作的程序并不够。如果这个程序在巨大的数据集上运行，那么运行时间变成了重要的问题**。

### 2 数学知识复习

---

#### 2.1 指数

$$
X^AX^B=X^{A+B} \tag{2.2.1}
$$

$$
\frac{X^A}{X^B}=X^{A-B} \tag{2.2.2}
$$

$$
(X^A)^B=X^{AB} \tag{2.2.3}
$$

$$
X^N+X^N=2X^N \not ={X^{2N}}  \tag{2.2.4}
$$

$$
2^N+2^N=2^{N+1} \tag{2.2.5}
$$

#### 2.2 对数

定义：X^A=B,当且仅当$log_XB=A$

除非有特别的说明，所有的对数都是以 2 为底的。

$$
log_AB= \frac{log_CB}{log_CA}(C>0) \tag{2.2.1}
$$

$$
log{AB}=logA+logB \tag{2.2.2}
$$

$$
log \frac{A}{B}=logA-logB \tag{2.2.3}
$$

$$
log(A^B)=BlogA \tag{2.2.4}
$$

$$
logX<X(X>0) \tag{2.2.5}
$$

#### 2.3 级数

$$
\sum_{i=0}^{N}2^i=2^{N+1}-1 \tag{2.3.1}
$$

$$
\sum_{i=0}^{N}A^i=\frac{A^{N+1}-1}{A-1} \tag{2.3.2}
$$

在公式 2.3.2 中，如果$0<A<1$,则

$$
\sum_{i=0}^{N}A^i \leq \frac{1}{1-A} \tag{2.3.3}
$$

当 N 趋于$\infty$时该和趋于$\frac{1}{1-A}$。

$$
\sum_{i=1}^{N}i^2=\frac{N(N+1)(N+2)}{6} \approx \frac{N^3}{3}  \tag{2.3.4}
$$

$$
\sum_{i=1}^{N}i^k \approx \frac{N^{k+1}}{|k+1|}(k \not ={-1})  \tag{2.3.5}
$$

$$
H_N=\sum_{i=1}^{N}\frac{1}{i} \approx lnN  \tag{2.3.6}
$$

公式 2.3.6 中，数$H_N$叫做调和数，其和叫调和和，近似式中的误差趋向于$\gamma \approx0.57721566$，这个值称为欧拉常数(Euler's constant)。

#### 2.4 模运算

如果 N 整除 A-B，那么就说 A 与 B 模 N 同余，记为$A \equiv B(mod \ N)$。直观地看，这意味着无论 A 还是 B 被 N 去除，所得的余数都是相同的。于是$81 \equiv 61 \equiv1(mod \ 10)$。若$A \equiv B(mod \ N)$，则$A+C \equiv B+C(mod \ N)$以及$AD \equiv BD(mod \ N)$。

### 3 递归简论

---

作为一个例子，在非负整数集上定义一个函数$F$，他满足$F(0)=0$且$F(X)=2F(X-1)+X^2$。当一个函数用它自己来定义时就称为递归(recursive)。函数$F$的递归实现如下：

```typescript
function F(x: number): number {
    // 基准情形
    if (x === 0) {
        return 0
    }
    // 不断推进
    return (2 * F(x - 1) + x) ^ 2
}
```

#### 递归的四条基本法则

1. **基准情形。** 必须总有某些基准情形，它无需递归就能解出。
2. **不断推进。** 对于那些需要递归求解的情形，每一次递归调用都必须要使求解状况朝接近基准情形的方向推进。
3. **设计法则。** 假设所有的递归调用都能运行。
4. **合成效益法则。** 在求解一个问题的同一实例时，切勿在不同的递归调用中做重复性的工作。

<!-- @format -->

## 算法分析

### 1 数学基础

---

估计算法资源消耗所需的分析需要一套正式的系统构架，因此先从某些数学定义开始

#### 定义

1.  如果存在正常数$c$和$n_0$使得当$N \ge n_0$时,$T(N) \le cf(N)$，则记为$T(N)=O(f(N))$
2.  如果存在正常数$c$和$n_0$使得当$N \ge n_0$时,$T(N) \ge cg(N)$，则记为$T(N)=\Omega(f(N))$
3.  $T(N)=\Theta(h(N))$当且仅当$T(N)=O(h(N))$且$T(N)= \Omega(h(N))$
4.  如果$T(N)=O(p(N))$且$T(N) \not ={\Theta(p(N))}$，则$T(N)=o(p(N))$

这些定义的目的是要在函数间建立一种相对的级别。给定两个函数，比较它们的相对增长率(relative rate of growth)。当$T(N)=O(f(N))$时，函数$T(N)$是在以不快于$f(N)$的速度增长；因此$f(N)$是$T(N)$的一个上界。与此同时，$f(N)=\Omega(T(N))$意味着$T(N)$是$f(N)$的一个下界。

作为例子，$N^3$增长比$N^2$快，因此可以说$N^2=O(N^3)$或$N^3=\Omega(N^2)$。如果$g(N)=2N^2$，那么$g(N)=O(N^4)$，$g(N)=O(N^3)$，$g(N)=O(N^2)$都是成立的，但最后一个是最好的答案。写法$g(N)=\Theta(N^2)$不仅表示$g(N)=O(N^2)$而且还表示结果会尽可能地好。

#### 几个重要法则

1. 如果$T_1(N)=O(f(N))$且$T_2(N)=O(g(N))$,那么

    (a) $T_1(N)+T_2(N)=max(O(f(N)),O(g(N)))$

    (b) $T_1(N)*T_2(N)$=O(f(N)\*g(N))

2. 如果$T(N)$是一个$k$次多项式，则$T(N)=\Theta(N^k)$
3. 对任意常数$k$，$log^kN=O(N)$。它告诉我们对数增长得非常缓慢

有几点需要注意。首先，将常数项或低阶项放进大$O$是非常坏的习惯。不要写成$T(N)=O(2N^2)$或$T(N)=O(N^2+N)$。在需要大$O$表示的任何分析中，各种简化都是可能发生的。低阶项一般可以被忽略，二常数项也可以弃掉。此时，精度的要求是很低的。

第二，总能够通过计算 $\lim_{n \to \infty}\frac{f(n)}{g(n)}$来确定两个函数$f(N)$和$g(N)$的相对增长率。该极限有四种可能的值：

-   极限是$0$：意味着$f(N)=o(g(N))$
-   极限时$c \not ={0}$：意味着$f(N)=\Theta(g(N))$
-   极限是$\infty$:意味着$g(N)=o(f(N))$
-   极限摆动：二者无关

### 2 要分析的问题

---

要分析的最重要的资源一般说来就是运行时间，有几个因素影响程序的运行时间，典型的情形是输入的大小是主要的考虑方面。定义两个函数$T_{avg}(N)$和$T_{worst}(N)$，输入分别为$N$时，算法所花费的平均运行时间和最坏情况下的运行时间。显然，$T_{avg}(N) \le T_{worst}(N)$。

一般说来，若无相反的指定，则所需要的量是最坏情况下的运行时间。原因之一是它对所有的输入提供来一个界限，包括特别坏的输入，而平均情况分析不能提供这样的界。另一个原因是平均情况的界计算起来通常要困难得多。

#### 2.1 运行时间的计算法则

-   FOR 循环：一次 for 循环的运行时间至多是该 for 循环内语句的运行时间乘以迭代次数
-   嵌套的 FOR 循环：从里向外分析循环。在一组嵌套循环内部的一条语句总的运行时间为该语句的运行时间乘以所有的 for 循环大小的乘积。下列程序片段的运行时间为$O(N^2)$

```typescript
for (let i = 0; i < N; i++) {
    for (j = 0; j < N; j++) {
        doSomeThing() // 假设doSomeThing花费O(1)运行时间
    }
}
```

-   顺序语句：将各个语句的运行时间求和即可。作为例子，下面的程序先用去$O(N)$运行时间，再花费$O(N^2)$，总的开销也是$O(N^2)$

```typescript
for (let k = 0; i < N; k++) {
    doSomeThing()
}
for (let i = 0; i < N; i++) {
    for (j = 0; j < N; j++) {
        doSomeThingElse() // 假设doSomeThingElse花费O(1)运行时间
    }
}
```

#### 2.2 最大的子序列和问题

给定整数$A_1,A_2,...,A_N$（可能有负数），求$\sum_{k=i}^jA_k$的最大值（若所有整数均为负数，则最大子序列和为$0$）。

例：

输入$-2$，$11$，$-4$，$13$，$-5$，$-2$时，输出 20（从$A_2$到$A_4$）。

下面将讨论求解该问题的四种算法。

#### 穷举法

穷举式地尝试所有的可能。

该算法的运行时间为$O(N^2)$。

```typescript
// 算法1，穷举法
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

#### 分治法

该方法采用“分治策略”：在“分”阶段把问题分解成两个大致相等的子问题，然后递归地对它们求解；在“治”阶段将两个子问题的解合并在一起并可能在做些少量的附加工作，最后得到整个问题的解。在这个例子中，最大子序列和可能在三处出现：或者整个出现在输入数据的左半部，或者整个出现在右半部，或者跨越输入数据的中部从而占据左右两部分。

该算法的运行时间为$O(NlogN)$。

```typescript
// 算法2，分治法
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
    // 递归求解左半部分最大子序列和
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

#### 联机算法。

在数据被顺序读入的过程中，算法都能对它已经读入的数据给出子序列问题的正确答案。

该算法的运行时间为$O(N)$。

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

SourceCode/Ch02.ts

### 代码位置

---

SourceCode/Ch01.ts
