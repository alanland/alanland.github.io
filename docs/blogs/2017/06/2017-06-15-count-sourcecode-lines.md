---
layout: post
title:  "Count Source Code Lines"
date:   2017-06-15 14:57:37 +0000
tags:   [linux, shell]
author: Alan Wang
---
使用命令行：
```shell
$ find . -name "*.py" | xargs wc -l
```

使用工具：
```shell
$ sudo apt-get install cloc
$ find . -name "*.py" | xargs cloc
```

```shell
$ cloc .

   28301 text files.
   13200 unique files.                                          
    5638 files ignored.

http://cloc.sourceforge.net v 1.60  T=78.23 s (139.1 files/s, 19679.4 lines/s)
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
Javascript                    5410          76853         164518         667226
HTML                          2578          30165           5116         304381
CSS                           1120           3706           5034          85328
Groovy                         556           6332          10584          49939
CoffeeScript                   343           4808           3387          41011
LESS                           412           3364           1836          27906
PHP                            120           2125           2274          12588
XML                            208            290             20          12000
Java                            10            288            647           3098
C                               11            299           1679           2655
XSLT                             6            105            292           1907
SASS                            29             66             50           1730
YAML                            23            232            121           1188
SQL                              2              2             14            932
Bourne Shell                    22            140             95            538
ActionScript                     4            128            158            406
Ant                              2             65             59            325
C/C++ Header                    11             86              6            323
Perl                             1             41              3            183
Pascal                           1             52            305            170
make                             1             15              9             63
DOS Batch                       10             13              3             57
sed                              1             12             17             38
JavaServer Faces                 1              0              0             19
Ruby                             1              1             18             11
-------------------------------------------------------------------------------
SUM:                         10883         129188         196245        1214022
-------------------------------------------------------------------------------

```

---
END
