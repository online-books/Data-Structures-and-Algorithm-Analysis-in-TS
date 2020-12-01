<!-- @format -->

## 双连通性

如果一个连通的无向图中的任一顶点删除之后，剩下的图仍然连通，那么这样的无向连通图就称为是*双连通的(biconnected)*。图 9-5-1 是双连通的，如果图中的节点是计算机，边是链路，那么若有任一台计算机出故障而不能运行，则网络不受影响。

<image  src="../../../../Assets/Images/ch9/9-5-1.png"/>

图 9-5-1 一个双连通图

如果一个图不是双连通的，那么将其删除后图将不再连通的那些顶点叫做*割点(articulation point)*。图 9-5-2 中的图不是双连通的：顶点$C$和$D$是割点。删除顶点$C$使图$G$不连通，而删除顶点$D$则使$E$和$F$从图$G$的其余部分断离。

<image  src="../../../../Assets/Images/ch9/9-5-2.png"/>

图 9-5-2 具有割点$C$和$D$的图

深度优先搜索提供一种找出连通图中的所有割点的线性时间算法。首先，从图中任一顶点开始，执行深度优先搜索并在顶点被访问时给它们编号。对于每一个顶点$v$，我们称其先序编号为$Num(v)$。然后，对于深度优先搜索生成树上的每一个顶点$v$，计算编号最低的顶点，我们称之为$Low(v)$，该点从$v$开始，通过树的零条或多条边且可能还有一条背向边而达到。图 9-5-3 中的深度优先搜索树首先指出先序编号，然后指出在上述法则下可达到的最低编号顶点。

<image  src="../../../../Assets/Images/ch9/9-5-3.png"/>

图 9-5-3 上图的深度优先树，节点标有$Num$和$Low$

从$A$、$B$和$C$开始的可达到最低编号顶点为$1(A)$，因为它们都能通过树的边到$D$，然后再由一条背向边回到$A$。我们可以通过对该深度优先生成树执行一次后续遍历有效地算出$Low$。根据$Low$的定义可知$Low(v)$是

1. $Num(v)$
2. 所有背向边$(v,w)$中的最低$Num(w)$
3. 树的所有边$(v,w)$中的最低$Low(w)$

对于任一条边$(v,w)$，我们只要检查$Num(v)$和$Num(w)$就可以直到它是树的一条边还是背向边。因此，$Low(w)$容易计算：我们仅需扫描$v$的邻接表，应用适当的法则，并记住最小值。所有的计算花费$O(|E|+|V|)$时间。

剩下要做的就是利用这些信息找出所有的割点。根是割点当且仅当它有多余一个的儿子，因为如果它有两个儿子，那么删除根则使得节点不连通而分布在不同的子树上；如果根只有一个儿子，那么除去根只不过是断离该根。对于任何其他顶点$v$，它是割点当且仅当它有某个儿子$w$使得$Low(w) \geq Num(v)$。

### 代码为止

---

[SourceCode/Graph/Biconnectivity.ts](../../../../SourceCode/Graph/Biconnectivity.ts)