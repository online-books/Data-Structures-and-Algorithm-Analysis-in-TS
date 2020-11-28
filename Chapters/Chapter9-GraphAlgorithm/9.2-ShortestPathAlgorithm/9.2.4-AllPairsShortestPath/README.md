<!-- @format -->

## 所有点对最短路径

找出所有点对的最短路径，经典算法是 Floyd-Warshall。这个算法的运行时间是$O(|V^3|)$，它不是对 Dijsktra 算法的$|V|$次迭代的一种渐进改进但对非常稠密的图可能更快，原因是它的循环更紧凑。如果存在一些负的边值但没有负值圈，那么该算法也能正常运行，而 Dijkstra 算法此时是失效的。

### 从 Dijkstra 算法中思考

---

Dijkstra 算法在顶点$s$开始并分阶段工作。图中的每个顶点最终都要被选作中间顶点。如果当前所选的顶点是$v$，那么对于每个$w \in V$，置$d_w=min(d_w,d_v+c_{w,v})$。也就是说从$v$到$w$的最佳距离或者是前面直到的从$s$到$w$的距离，或者是从$s$到$v$然后在直接从$v$到$w$的结果。

Dijkstra 算法提供了动态规划算法的想法：我们依序选择这些顶点。将$D_{k,i,j}$定义为从$v_i$到$v_j$只使用$v_1,v_2,v_3,...,v_k$作为中间顶点的最短路径。则根据定义:$D_{0,i,j}=c_{i,j}即直接等于连接权值，其中若$(v*i,v_j)$不是该图的边则$c*{i,j}是$\infty$。再有，根据定义，$D_{|V|,i,j}$是图中从$v_i$到$v_j$的最短路径。

当$k>0$时，$D_{k,i,j}$有两种可能的结果：一是不借助第$k$个顶点$v_k$作为中间顶点的最短路径；二是借助第$k$个顶点$v_k$作为中间顶点由$v_i \to v_k$和$v_k \to v_j$形成的最短路径，其中每条路径只借助前$k-1$个顶点作为中间顶点。用公式描述为：

$$D_{k,i,j}=min \{ D_{k-1,i,j},D_{k-1,i,k}+D_{k-1,k,j} \}$$

从公式可以看出，第$k$阶段只依赖于第$k-1$阶段，所以看来只有两个$|V|\times|V|$矩阵需要保存。然而，在用$k$开始或结束的路径上以$k$作为中间顶点对结果没有改进，除非存在一个负的圈。因为$D_{k-1,i,j}=D{k,i,j}$和$D_{k-1,k,j}=D{k,k,j}$，这意味着右边的项都不改变值且都不需要存储，因此只需要一个矩阵即可。

### 与 Dijkstra 算法比较

---

Dijkstra 算法的时间复杂度为$O(|V|^2)$，对稀疏图运行更快。动态规划算法求最短路径时间复杂度为$O(|V|^3)$，因为紧凑的循环，对稠密的图会运行更快。

### 代码位置

---

SourceCode/Graph/ShortestPaths/AllPairsShortestPaths.ts

### 参考

---

[动态规划求图中所有顶点对的最短路径](https://blog.csdn.net/weixin_40170902/article/details/80849250)
[所有点对的最短路径-FloydWarshall 算法](https://blog.csdn.net/midgard/article/details/4314869)