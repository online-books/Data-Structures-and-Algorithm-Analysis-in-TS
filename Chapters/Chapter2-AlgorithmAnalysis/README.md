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

   (b) $T_1(N)*T_2(N)$=O(f(N)*g(N))
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
- FOR循环：一次for循环的运行时间至多是该for循环内语句的运行时间乘以迭代次数
- 嵌套的FOR循环：从里向外分析循环。在一组嵌套循环内部的一条语句总的运行时间为该语句的运行时间乘以所有的for循环大小的乘积。下列程序片段的运行时间为$O(N^2)$
```typescript
for (let i = 0; i < N; i++) {
    for (j = 0; j < N; j++) {
        doSomeThing() // 假设doSomeThing花费O(1)运行时间
    }
}
```
- 顺序语句：将各个语句的运行时间求和即可。作为例子，下面的程序先用去$O(N)$运行时间，再花费$O(N^2)$，总的开销也是$O(N^2)$
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

输入$-2$，$11$，$-4$，$13$，$-5$，$-2$时，输出20（从$A_2$到$A_4$）。

下面将讨论求解该问题的四种算法。

#### 穷举法
穷举式地尝试所有的可能。

该算法的运行时间为$O(N^2)$。
``` typescript
// 算法1，穷举法
export function maxSubSequenceSum1(n: number[]): number {
    const { length } = n
    let currentSum = 0;
    let maxSum = 0;
    for (let i = 0; i < length; i++) {
        currentSum = 0
        for (let j = i; j < length; j++) {
            currentSum += n[j];
            if (currentSum > maxSum) {
                maxSum = currentSum;
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
        return 0;
    }
    return maxSum(0, n.length - 1, n)
}
function maxSum(start: number, end: number, n: number[]): number {
    if (start === end) {
        return Math.max(n[start], 0)
    }
    const middle = Math.floor((start + end) / 2)
    // 递归求解左半部分最大子序列和
    const maxLeftSum = maxSum(start, middle, n);
    // 递归求解左半部分最大子序列和
    const maxRightSum = maxSum(middle + 1, end, n);
    let leftBorderSum = 0;
    let leftMaxBorderSum = 0;
    // 计算中间分界处到左半部分的最大和
    for (let i = middle; i >= start; i--) {
        leftBorderSum += n[i];
        if (leftBorderSum > leftMaxBorderSum) {
            leftMaxBorderSum = leftBorderSum
        }
    }
    let rightBorderSum = 0;
    let maxRightBorderSum = 0;
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
``` typescript
// 算法3，联机法
export function maxSubSequenceSum3(n: number[]): number {
    let currentSum = 0;
    let maxSum = 0;
    for (let i = 0, j = n.length; i < j; i++) {
        currentSum += n[i];
        if (currentSum > maxSum) {
            maxSum = currentSum;
        }
        if (currentSum < 0) {
            currentSum = 0;
        }
    }
    return maxSum;
}
```

### 代码位置
---
SourceCode/Ch02.ts