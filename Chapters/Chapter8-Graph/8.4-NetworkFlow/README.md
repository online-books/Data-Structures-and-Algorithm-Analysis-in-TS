<!-- @format -->

## 网络流问题

在有向图$G=(V,E)$中，任意一条边$(v,w)$设有容量$c_{v,w}$，这些容量可以代表通过一个管道的水的容量或在两个交叉路口之间马路上的交通流量。最大流问题就是确定从发点$s$到收点$t$可以通过的最大容量。对既不是发点$s$又不是收点$t$的任一顶点$v$来说，总的进入的流必须等于总的发出的流。对于图 8-7 中的左边的图，最大流是 5。

<image src="../../../Assets/Images/ch8/8-7.png"/>

图 8-7 一个图的最大流

### 算法描述

---

解决最大流问题也是分阶段进行的。在开始阶段，我们遍历图$G$并构造一个流图$G_f$。$G_f$表示在算法的任意阶段已经达到的流。开始时$G_f$的所有的边都没有流，当算法终止时$G_f$包含最大流。另外再构造一个残余图$G_r$，它表示对于每条边还能再添加多少流。对于残余图中的每一条残余边，我们可以从图$G$中边的容量中减去流图$G_f$中对应边的流而计算出残余的流。

在循环阶段，我们不停地寻找$G_r$中从$s$到$t$的一条增长通路（augmenting path），增长通路上的最小容量值就是可以添加到路径上每一条边上的流量。直到在$G_r$中没有从$s$到$t$的路径时算法终止。图 8-8 展示了图、流图、残余图的初始阶段。

<image src="../../../Assets/Images/ch8/8-8.png"/>

图 8-8 图、流图以及残余图的初始阶段

在残余图中有许多从$s$到$t$的路径。假设我们选择$s、b、d、t$，此时有两个单位的流通过这条路径的每一边。一旦一条边中剩余的容量为$0$，这条边就要从残余图中除去。如图 8-9 所示。

<image src="../../../Assets/Images/ch8/8-9.png"/>

图 8-9 沿$s、b、d、t$加入 2 个单位的流后的$G$、$G_f$、$G_r$

然后，我们可以选择路径$s、a、c、t$，该路径也容许 2 个单位的流通过。如图图 8-10。

<image src="../../../Assets/Images/ch8/8-10.png"/>

图 8-10 沿$s、b、d、t$加入 2 个单位的流后的$G$、$G_f$、$G_r$

剩下唯一可以选择的路径是$s、a、d、t$，这条路径能够容纳 1 个单位的流通过。结果如图 8-11 所示。

<image src="../../../Assets/Images/ch8/8-11.png"/>

图 8-11 沿$s、a、d、t$加入 1 个单位的流后的$G$、$G_f$、$G_r$

由于现在从$t$到$s$没有路径可以到达，算法终止。结果是 5 个单位的流是最大值。

#### 错误的算法

设从初始图开始我们选择路径$s、a、d、t$这条路径容纳 3 个单位的流，那么这样选择的结果使得在残余图中不再有从$s$到$t$的任何路径。因此，这种贪婪算法不能找到最优解。图 8-12 指出为什么算法会失败。

<image src="../../../Assets/Images/ch8/8-12.png"/>

图 8-12 如果初始选择是沿着$s、a、d、t$加入三个单位的流得到$G$、$G_f$、$G_r$，算法终止但解不是最优的。

为了使算法有效，对于流图中具有流$f_{v,w}$的每条边$(v,w)$，我们在残余图中添加一条容量为$f_{v,w}$的边$(w,v)$。从原始的图开始并选择增长通路$s、a、d、t$,得到图 8-13。

<image src="../../../Assets/Images/ch8/8-13.png"/>

图 8-13 使用正确算法沿$s、a、d、t$加入 3 个单位的流后的图

下一步，算法找到流为 2 的增长通路$s、b、d、a、c、t$，得到图 8-14。

<image src="../../../Assets/Images/ch8/8-14.png"/>

图 8-14 使用正确算法沿$s、b、d、a、c、t$加入 2 个单位的流后的图

在这个图中没有增长通路，算法终止。

如果图的最大流为$f$，那么，由于每条增长通路使流的值至少增加 $1$，故至多只需要查找$f$个增长通路。因为通过无权最短路径算法找到一条增长通路需要$O(|E|)$时间，从而总的运行时间为$O(f \cdot |E|)$。但这个运行时间并不好，在图 8-15 所示的图中，若每次的增长通路都包含$(a,b)$边只发送 1 个单位的流，则总共需要 2000 次循环才能得到最大流，但最优解是仅通过 2 条增长通路就能得到最大流。

<image src="../../../Assets/Images/ch8/8-15.png"/>

避免这个问题的简单方法是总选择使得流增长最大的增长通路。寻找这样一条路径类似于求解一个赋权最短路径问题，通过对 Dijkstra 算法的修改就可以完成。如果$cap_{max}$为最大边容量，那么$O(|E| \\log cap_{max})$条增长通路足以找到最大流。在这种情况下，对于增长通路的每一次计算都需要$O(|E|\cdot \log |V|)$时间，因此总的时间界为$O(|E|^2 \cdot \log|V|\\log cap_{max})$。如果容量均为小整数，那么该界可以减为$O(|E|^2\\log|V|)$

另一种选择增长通路的方法是总选取具有最少边数的路径。使用这种方法，需要$O(|E|\cdot|V|)$步增长，每一步花费$O(|E|)$，再使用无权最短路径算法，产生运行时间界为$O(|E|^2|V|)$。

### 代码位置

---

[SourceCode/Graph/NetworkFlow.ts](../../../SourceCode/Graph/NetworkFlow.ts)