## 引论

### 1 数学知识复习

#### 1.1 指数
$$
X^AX^B=X^{A+B} \tag{1.1.1}
$$
$$ 
\frac{X^A}{X^B}=X^{A-B} \tag{1.1.2}
$$
$$
(X^A)^B=X^{AB} \tag{1.1.3}
$$
$$
X^N+X^N=2X^N \not ={X^{2N}}  \tag{1.1.4}
$$
$$
2^N+2^N=2^{N+1} \tag{1.1.5}
$$

#### 1.2 对数

定义：X^A=B,当且仅当$log_XB=A$

除非有特别的说明，所有的对数都是以2为底的。

$$
log_AB= \frac{log_CB}{log_CA}(C>0) \tag{1.2.1}
$$
$$
log{AB}=logA+logB \tag{1.2.2}
$$
$$
logA/B=logA-logB \tag{1.2.3}
$$
$$
log(A^B)=BlogA \tag{1.2.4}
$$
$$
logX<X(X>0) \tag{1.2.5}
$$

#### 1.3 级数
$$
\sum_{i=0}^{N}2^i=2^{N+1}-1 \tag{1.3.1}
$$
$$
\sum_{i=0}^{N}A^i=\frac{A^{N+1}-1}{A-1} \tag{1.3.2}
$$

在公式1.3.2中，如果$0<A<1$,则
$$
\sum_{i=0}^{N}A^i \leq \frac{1}{1-A} \tag{1.3.3}
$$
当N趋于$\infty$时该和趋于$\frac{1}{1-A}$。
$$
\sum_{i=1}^{N}i^2=\frac{N(N+1)(N+2)}{6} \approx \frac{N^3}{3}  \tag{1.3.4}
$$
$$
\sum_{i=1}^{N}i^k \approx \frac{N^{k+1}}{|k+1|}(k \not ={-1})  \tag{1.3.5}
$$
$$
H_N=\sum_{i=1}^{N}\frac{1}{i} \approx lnN  \tag{1.3.6}
$$
公式1.3.6中，数$H_N$叫做调和数，其和叫调和和，近似式中的误差趋向于$\gamma \approx0.57721566$，这个值称为欧拉常数(Euler's constant)。

以下两个公式是一般的代数运算。
$$
\sum_{i=1}^{N}f(N)=Nf(N) \tag{1.3.7}
$$
$$
\sum_{i=n_0}^{N}f{i}=\sum_{i=1}^{N}f(i)-\sum_{i=1}^{n_0-1}f(i) \tag{1.3.8}
$$

#### 1.4 模运算

如果N整除A-B，那么就说A与B模N同余，记为$A \equiv B(mod \ N)$。直观地看，这意味着无论A还是B被N去除，所得的余数都是相同的。于是$81 \equiv 61 \equiv1(mod \ 10)$。若$A \equiv B(mod \ N)$，则$A+C \equiv B+C(mod \ N)$以及$AD \equiv BD(mod N)$。