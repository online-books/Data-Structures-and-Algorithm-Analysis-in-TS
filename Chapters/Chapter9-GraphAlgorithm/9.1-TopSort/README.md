<!-- @format -->

## 拓扑排序

拓扑排序是对有向无圈图的顶点的一种排序，它使得如果存在一条从$v_i$到$v_j$的路径，那么在排序中$v_j$出现在$v_i$的后面。如果图含有圈，那么拓扑排序是不可能的。此外，排序不必是唯一的，任何合理的顺序都可以。在图 9-1 中，$v_1,v_2,v_5,v_4,v_3,v_7,v_6$和$v_1,v_2,v_5,v_4,v_7,v_3,v_6$两个都是拓扑排序。

<image src="../../../Assets/Images/ch9/9-1-1.png" />

图 9-1 一个简单的无圈图

一个简单的求拓扑排序的算法是先找出任意一个没有入边的顶点，我们将它和它的边一起从图中删除。然后我们对图的其余部分应用同样的方法处理。

我们把顶点$v$的入度(indegree)定义为边$(u,v)$的条数。首先，我们对每一个顶点计算它的入度并找出入度为$0$的顶点，如果这样的顶点不存在，那这就意味着该图有圈。然后，将所有入度为$0$的顶点放入一个初始为空的队列中。当队列不为空时返回并删除队列中的第一个顶点$v$，并将与$v$邻接的所有的顶点的入度减$1$。只要一个顶点的入度降为$0$，就把该顶点放入队列中。此时，拓扑排序就是顶点出队的顺序。

如果使用邻接表，那么执行这个算法所用的运行时间是$O(|E|+|V|)$。

### 代码位置

---

SourceCode/Graph/TopSort.ts