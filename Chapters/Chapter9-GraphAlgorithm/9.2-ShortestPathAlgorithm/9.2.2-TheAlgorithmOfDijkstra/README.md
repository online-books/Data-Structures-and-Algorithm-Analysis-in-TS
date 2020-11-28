<!-- @format -->

## Dijkstra 算法

在有向赋权图中，解决单源最短路径的一般方法叫*Dijkstra*算法。这个算法是贪婪算法最好的例子。贪婪算法一般地分阶段求解一个问题，在每个阶段它都把当前出现的当作是最好的去处理。

### 算法描述

Dijkstra 算法像无权最短路径算法一样，按阶段进行。在算法开始的时候，将输入的顶点$s$标记为已知(known)的，将所有其他的顶点标记为未知(unknown)的，同时对每个顶点记录一个临时距离$d_v$，其初始值是$\infty$，这个距离实际上是使用已知顶点作为中间顶点从$s$到$v$的最短路径长。在其后的每个阶段，Dijkstra 算法选择一个顶点$v$，它在所有的未知顶点中具有最小的距离$d_v$，同时将$s$到$v$的路径标为已知，阶段的其余部分由更新与$v$邻接的顶点的临时距离组成。

我们假设顶点$w$是$v$的邻接顶点，$c_w$是$v$与$w$之间的权重值，若$d_w<d_v+c_w$，则置$d_w=d_v+c_w$。

图 9-2-4 是一个例子。

<image src="../../../../Assets/Images/ch9/9-2-4.png" />

假设开始节点$s$是$v_1$。第一个选择的顶点是$v_1$，距离值为$0$，将该顶点标记为已知。$v_1$的邻接顶点是$v_2$和$v_4$，分别将它们的距离值更新为$d_{v_2}=d_{v_1}+2=0+1=2,d_{v_4}=d_{v_1}+1=0+1=1$。

下一步，在$v_1$的邻接顶点中选取$v_4$标记为已知。顶点$v_3,v_5,v_6,v_7$是$v_4$邻接的顶点，更新它们到$s$的距离值为$d_{v_3}=d_{v_4}+2=3,d_{v_5}=d_{v_4}+2=3,d_{v_6}=d_{v_4}+8,d_{v_7}=d_{v_4}+4$。

接着选择$v_2$。$v_4$是其邻接的顶点，但已经是已知的，因此无需操作。$v_5$是邻接的点但不做调整，因为经过$v_2$的距离值为$2+10=12$，而长为$3$
的路径是已知的。

下一个被选取的点是$v_5$，其距离值为$3$。$v_7$是其唯一的邻接点，但不需要调整。然后选取$v_3$，对$v_6$的距离更新为$3+5=8$。

再下一个选取的顶点是$v_7$。$v_6$的距离值更新为$5+1=6$。

最后，我们选择$v_6$。

### 运行时间分析

利用反证法可以证明，只要没有边的值为负，该算法总能顺利完成。运行时间依赖于对表的处理方法。如果通过使用扫描表来找出最小值$d_v$，那么每一步将花费$O(|V|)时间找到最小值，从而整个算法过程将花费$O(|V|^2)$时间查找最小值。每次更新$d_w$的时间是常数，而每条边最多有一次更新，总计为$O(|E|)$，因此，总的运行时间是$O(|E|+|V|^2)。如果图是稠密的，边数$|E|=\Theta(|V|^2)$，则该算法不仅简单而且基本上最优，因为它的运行时间于边数成线性关系。

如果图是稀疏的，边数$|E|=\Theta(|V|)$，那么这种算法就太慢了。在这种情况下，距离需要存储在优先队列中。为了获取顶点中距离最小的那个，我们首先初始化一个二叉堆，并将起始节点$s$和距离值$d_s$插入堆中。在每次对与$s$邻接的顶点$w$执行操作时，将顶点$w$和新的$d_w$值插入到堆中。这样，在堆中的每个顶点就有可能有多余一个的表示。当$DeleteMin$操作把最小的顶点从堆中删除时，必须检查它以确定它是未知的，这样找到下一个被选取的点就是执行$DeleteMin$直到一个未知的顶点为止。这种方法虽然编程容易但堆的大小有可能达到$|E|$这么大。由于$|E| \leq |V|^2$意味着$log|E| \leq 2log|V|$，因为我们仍然得到一个$O(|E|log|V|)$算法，不过，空间需求确实增加了，在某些应用中这可能是严重的。不仅如此，因为该方法需要$|E|$次而不仅仅是$|V|$次$DeleteMin$，所以它在实践中可能要慢。

### 代码位置

---

SourceCode/Graph/ShortestPaths/TheAlgorithmOfDijkstra.ts