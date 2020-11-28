<!-- @format -->

## 网络流问题

设给定边容量为$c_{v,w}$的有向图$G=(V,E)$。这些容量可以代表通过一个管道的水的容量活在两个交叉路口之间马路上的交通流量。有两个顶点，一个是$s$，成为*发点*（source），一个是$t$，成为*收点*（sink）。对于任一条边$(v,w)$，最多有“流”的$c_{v,w}$个单位可以通过。在既不是发点$s$又不是收点$t$的任一顶点$v$，总的进入的流必须等于总的发出的流，最大流问题就是确定从$s$到$t$可以通过的最大流量。例如，对于图 9-3-1 中的左边的图，最大流是 5。

<image src="../../../Assets/Images/ch9/9-3-1.png"/>

图 9-3-1 一个图的最大流

### 一个简单的最大流算法

---

解决这个问题的首要想法是分阶段进行。我们从图$G$开始并构造一个流图$G_f$。$G_f$表示在算法的任意阶段已经达到的流。开始时$G_f$的所有的边都没有流，当算法终止时$G_f$包含最大流。我们还构造一个图$G_r$，成为*残余图*（residual graph），它表示对于每条边还能再添加多少流。对于每一条边，我们可以从容量中减去当前的流而计算出残余的流。$G_r$的边叫做残余边。

在每个阶段，我们寻找$G_r$中从$s$到$t$的一条路径，这条路径叫做*增长通路（augmenting path）*。这条路径上的最小值边就是可以添加到路径上每一条边上的流量。通过叫做$G_f$和重新计算$G_r$做到这一点。当发现在$G_r$中没有从$s$到$t$的路径时算法终止。这个算法是不确定的，因为从$s$到$t$的路径是任意选择的。图 9-3-2 显示了图、流图、残余图的初始阶段。

<image src="../../../Assets/Images/ch9/9-3-2.png"/>

图 9-3-2 图、流图以及残余图的初始阶段

在残余图中有许多从$s$到$t$的路径。假设我们选择$s、b、d、t$，此时我们可以发送两个单位的流通过这条路径的每一边。一旦注满一条边，则这条边就要从残余图中除去。这样，我们得到图 9-3-3。

<image src="../../../Assets/Images/ch9/9-3-3.png"/>

图 9-3-3 沿$s、b、d、t$加入 2 个单位的流后的$G$、$G_f$、$G_r$

下面，我们可以选择路径$s、a、c、t$，该路径也容许 2 个单位的流通过。进行必要的调整后，我们得到图 9-3-4。

<image src="../../../Assets/Images/ch9/9-3-4.png"/>

图 9-3-4 沿$s、b、d、t$加入 2 个单位的流后的$G$、$G_f$、$G_r$

唯一剩下要选择的路径是$s、a、d、t$，这条路径能够容纳 1 个单位的流通过。结果得到图 9-3-5 所示的图。

<image src="../../../Assets/Images/ch9/9-3-5.png"/>

图 9-3-5 沿$s、a、d、t$加入 1 个单位的流后的$G$、$G_f$、$G_r$

由于从$t$到$s$是不可到达的，因此算法终止。结果正好是 5 个单位的流是最大值。

### 算法存在的问题

设从初始图开始我们选择路径$s、a、d、t$这条路径容纳 3 个单位的流，选择的结果使得在残余图中不再有从$s$到$t$的任何路径，因此，我们的算法不能找到最优解，这是贪婪算法行不通的一个例子。图 9-3-6 指出为什么算法会失败。

<image src="../../../Assets/Images/ch9/9-3-6.png"/>

图 9-3-6 如果初始选择是沿着$s、a、d、t$加入三个单位的流得到$G$、$G_f$、$G_r$，算法终止但解不是最优的。

为了使算法有效，我们需要让算法改变它的意向。为此，对于流图中具有流$f_{v,w}$的每条边$(v,w)$，我们在残余图中添加一条容量为$f_{v,w}$的边$(w,v)$。我们从原始的图开始并选择增长通路$s、a、d、t$,得到图 9-3-7。

<image src="../../../Assets/Images/ch9/9-3-7.png"/>

图 9-3-7 沿$s、a、d、t$加入 3 个单位的流后的图

下一步，算法找到流为 2 的增长通路$s、b、d、a、c、t$，得到图 9-3-8。

<image src="../../../Assets/Images/ch9/9-38.png"/>

图 9-3-8 沿$s、b、d、a、c、t$加入 2 个单位的流后的图

在这个图中没有增长通路，因此，算法终止。如果边的容量都是有理数，那么该算法总以最大流终止。

如果容量都是整数且最大流为$f$，那么，由于每条增长通路使流的值至少增加 1，古$f$个阶段足够，从而总的运行时间为$O(f \cdot |E|)$。因为通过无权最短路径算法一条增长通路可以以$O(|E|)$时间找到。图 9-3-9 说明了这个运行时间为什么不好。

最大流通过沿每条边发送 1000000 并查验到 2000000 而得到。随机的增长通路可以沿着包含由$a$和$b$连接的边的路径连续增长。若这种情况反复发生，那就需要 2000000 条增长路径，而此时我们仅用 2 条增长通路就能得到最大流。

避免这个问题的简单方法是总选择使得流增长最大的增长通路。寻找这样一条路径类似于求解一个赋权最短路径问题而对 Dijkstra 算法的单线修改就可以完成。如果$cap_{max}$为最大边容量，那么$O(|E| \log cap_{max})$条增长通路足以找到最大流。在这种情况下，对于增长通路的每一次计算都需要$O(|E| \log |V|)$时间，因此总的时间界为$O(|E|^2\log|V|\log cap_{max})$。如果容量均为小整数，那么该界可以减为$O(|E|^2\log|V|)$

另一种选择增长通路的方法是总选取具有最少边数的路径。使用这种法则，需要$O(|E|\cdot|V|)$步增长，每一步花费$O(|E|)$，再使用无权最短路径算法，产生运行时间界为$O(|E|^2|V|)$。

### 代码位置

---

SourceCode/Graph/NetworkFlow.ts