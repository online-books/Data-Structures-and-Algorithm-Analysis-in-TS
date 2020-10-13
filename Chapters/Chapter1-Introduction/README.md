## 引论

### 2 数学知识复习

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

除非有特别的说明，所有的对数都是以2为底的。

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

在公式2.3.2中，如果$0<A<1$,则
$$
\sum_{i=0}^{N}A^i \leq \frac{1}{1-A} \tag{2.3.3}
$$
当N趋于$\infty$时该和趋于$\frac{1}{1-A}$。
$$
\sum_{i=1}^{N}i^2=\frac{N(N+1)(N+2)}{6} \approx \frac{N^3}{3}  \tag{2.3.4}
$$
$$
\sum_{i=1}^{N}i^k \approx \frac{N^{k+1}}{|k+1|}(k \not ={-1})  \tag{2.3.5}
$$
$$
H_N=\sum_{i=1}^{N}\frac{1}{i} \approx lnN  \tag{2.3.6}
$$
公式2.3.6中，数$H_N$叫做调和数，其和叫调和和，近似式中的误差趋向于$\gamma \approx0.57721566$，这个值称为欧拉常数(Euler's constant)。


#### 2.4 模运算

如果N整除A-B，那么就说A与B模N同余，记为$A \equiv B(mod \ N)$。直观地看，这意味着无论A还是B被N去除，所得的余数都是相同的。于是$81 \equiv 61 \equiv1(mod \ 10)$。若$A \equiv B(mod \ N)$，则$A+C \equiv B+C(mod \ N)$以及$AD \equiv BD(mod \ N)$。


### 递归简论

作为一个例子，在非负整数集上定义一个函数$F$，他满足$F(0)=0$且$F(X)=2F(X-1)+X^2$。当一个函数用它自己来定义时就称为递归(recursive)。函数$F$的递归实现如下：
``` typescript
function F(x:number):number{
    if(x===0){
        return 0;
    }
    return 2*F(x-1)+x*2
}
```

##### 递归的四条基本法则
1. **基准情形。**必须总有某些基准情形，它无需递归就能解出。
2. **不断推进。**对于那些需要递归求解的情形，每一次递归调用都必须要使求解状况朝接近基准情形的方向推进。
3. **设计法则。**假设所有的递归调用都能运行。
4. **合成效益法则。**在求解一个问题的同一实例时，切勿在不同的递归调用中做重复性的工作。


### 代码位置
SourceCode/Chapter1/ch1.ts