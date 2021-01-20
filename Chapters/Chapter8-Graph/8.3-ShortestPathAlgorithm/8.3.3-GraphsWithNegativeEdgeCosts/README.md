<!-- @format -->

## 具有负边值的图

如果图具有负边值，那么 Dijkstra 算法就无法解决。问题在于，一旦一个顶点$u$被声明是已知的，那就可能从某个另外的未知顶点$v$有一条回到$u$的负的路径。在这样的情形下，选取从$s$到$v$再回到$u$的路径要比从$s$到$u$但不经过$v$更好。

通过把赋权的和无权的算法结合起来可以解决这个问题，但运行时间会激烈地增长。开始时，我们把$s$放到队列中，然后在每个阶段我们让一个顶点$v$出队，找出所有与$v$邻接的顶点$w$，对满足$d_w>d_v+c{v,w}$的顶点更新$d_w$，并在$w$不在队列中的情况下把它放进到队列中。重复这个过程直到队列为空。

如果没有负值圈，该算法能够正常工作，每个顶点最多可以出队$|V|$次。因此，使用邻接表的运行时间是$O(|E|\cdot|V|)$。如果负值圈存在，那么算法将无限循环下去，可以通过在任一顶点已经出队$|V|+1$次后终止循环。

### 代码位置

---

SourceCode/Graph/ShortestPaths/WeightedNegative.ts