---
layout: post
title:  "Binary search tree"
date:   2017-07-27 14:27:37 +0000
tags:   [tree, algorithm]
author: Alan Wang
---
### 定义 [BST]
二叉排序树或者是一棵空树，或者是具有下列性质的二叉树：
- 若左子树不空，则左子树上所有结点的值均小于或等于它的根结点的值；
- 若右子树不空，则右子树上所有结点的值均大于或等于它的根结点的值；
- 左、右子树也分别为二叉排序树；


### 查找
- 若根结点的关键字值等于查找的关键字，成功。
- 否则，若小于根结点的关键字值，递归查左子树。
- 若大于根结点的关键字值，递归查右子树。
- 若子树为空，查找不成功。

复杂度: O(logn)

### 插入
![](/assets/images/2017-07-27-binary-search-tree/insert.png)
![](/assets/images/2017-07-27-binary-search-tree/insert-anmi.gif)

### 删除
- 标记删除

![](/assets/images/2017-07-27-binary-search-tree/delete1.png)
- 无子节点

![](/assets/images/2017-07-27-binary-search-tree/delete2.png)
- 单个子节点
直接返回自己的另一个孩子，让自己的父亲节点指向自己的另一个孩子

![](/assets/images/2017-07-27-binary-search-tree/delete3.png)
- 两个子节点
找自己右孩子里面的最小值（最左）然后替换自己和它，然后删除自己

![](/assets/images/2017-07-27-binary-search-tree/delete4.png)

### Summary

![](/assets/images/2017-07-27-binary-search-tree/summary.png)



---
Links:
- http://blog.csdn.net/hk2291976/article/details/51407287
- http://blog.csdn.net/hk2291976/article/details/51407569
- https://baike.baidu.com/item/%E4%BA%8C%E5%8F%89%E6%8E%92%E5%BA%8F%E6%A0%91

---
END
