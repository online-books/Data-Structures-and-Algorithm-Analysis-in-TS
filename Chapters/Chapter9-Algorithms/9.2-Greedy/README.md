<!-- @format -->

## 贪婪算法

贪婪算法，是一种在每一步选择中都采取在当前状态下最好或最优（即最有利）的选择，从而希望结果是最优的算法。比如在求无向图的最小生成树问题中用的就是贪婪算法。

### 1.哈夫曼算法

#### 1.1 哈夫曼编码

哈夫曼编码是一种用于无损数据压缩的熵编码，它使用变长编码表对字母进行编码。其中变长编码表是通过对字母的出现次数得到，出现次数高的字母使用较短的编码，而出现次数低的字母使用较长的编码。

假设一个文件$F$中有 10 个 a、15 个 e、12 个 i、3 个 s、4 个 t、13 个空格以及 1 个 newline，那么这个字母一共需要$58\times 3=174$个比特。

代表这些字母的二进制代码可以用二叉树来表示，如图 9-9 所示。

<image height="240" src="../../../assets/images/ch9/9-1.png" />

图 9-1 的树只在树叶上有数据。每个字符从根节点开始用 0 表示左分支用 1 表示右分支，那么字符 s 就被编码成 011，这样的编码方式叫做前缀码。如果字符$c_j$在深度$d_j$处且出现$f_j$次，那么该字母代码的值就等于$\sum d_jf_j$。

因此，这种编码方式的关键就在于找到总价值最小的满二叉树。图 9-2 显示了这些字母的最优树，而这种编码只用了 146 个比特。

<image height="240" src="../../../assets/images/ch9/9-2.png" />

|  字符   | 编码  | 频率 | 总比特数 |
| :-----: | :---- | :--- | -------- |
|    d    | 001   | 10   | 30       |
|    e    | 01    | 15   | 30       |
|    i    | 10    | 12   | 24       |
|    s    | 00000 | 3    | 15       |
|    t    | 0001  | 4    | 16       |
|  space  | 11    | 13   | 26       |
| newline | 00001 | 1    | 5        |
|  总和   | -     | -    | 146      |

#### 1.2 哈夫曼算法

哈夫曼算法可以描述如下：算法对一个由树组成的森林进行。一棵树的权等于它的树叶的频率的和。任意选取最小权的两棵树$T_1$和$T_2$，并任意形成以$T_1$和$T_2$为子树的新树。假设字符的个数为$C$。那么这样的过程将进行$C-1$次。在算法的开始节点，存在$C$棵单节点树，在算法结束时得到一棵树，这棵树就是最优哈夫曼编码树。

将文件$F$中的 58 个字符应用哈夫曼算法生成的最优编码树如图 9-3 和 9-5 所示。

<image height="240" src="../../../assets/images/ch9/9-3.png" />

图 9-3

<image height="240" src="../../../assets/images/ch9/9-4.png" />

图 9-4

<image height="240" src="../../../assets/images/ch9/9-5.png" />

图 9-5

如果我们依权排序将这些树保存在一个优先队列中，那么对元素个数不超过$N$的优先队列将进行一次$BuildHeap$、$2C-2$次$DeleteMin$和$C-2$次$Insert$，因此算法的运行时间为$O(N\log N)$。

### 代码位置

[SourceCode/Algorithms/Greedy/HuffmanCode.ts](/SourceCode/Algorithms/Greedy/HuffmanCode.ts)