---
layout: post
title:  "Location Pick Seq Generator"
date:   2017-05-22 20:27:37 +0000
tags:   [wms]
author: Alan Wang
---
晚上库位初始化的时候，库位属性包含`区`，`道`，`列`，`层`。
库位编码的时候是同向的，要根据S形的拣货路线维护拣货顺序。

用groovy写了个小程序，读取Execl，填充值然后结果写入一个新文件里面：

```groovy

import com.ittx.cbt.general.excel.ExcelBuilder
import com.ittx.cbt.general.excel.ExcelSlurper
import org.apache.poi.ss.usermodel.Workbook

/**
 * @author 王成义
 * @version 5/22/17
 */
class Location {
    String id
    String code
    String area
    Integer hang
    Integer col
    Integer seq
}

class LocationTest extends GroovyTestCase {
    void test() {
        String file = '/tmp/location.xlsx'
        def sp = new ExcelSlurper(file)
        List<Location> locs = []
        sp.eachLine([labels: true]) {
            if (cell(0) != null && cell(3) != null && cell(4) != null) {
                locs.add(new Location(
                        id: cell(0),
                        code: cell(1),
                        area: cell(2),
                        hang: Integer.parseInt(cell(3)),
                        col: Integer.parseInt(cell(4))
                ))
            }
        }

        List order = ['KS-SJ', 'KS-GB', 'KS-DK']
        Integer step = 1, seq0 = 1, seq1 = 1

        Map<String, List<Location>> areaMap = locs.groupBy { it.area }
        areaMap.sort({ v1, v2 ->
            Integer.compare(order.indexOf(v1.key), order.indexOf(v2.key))
        }).each { k, v ->
            Map hangMap = v.groupBy { it.hang }
            hangMap.each { hang, List<Location> hangList ->
                Map colMap = hangList.groupBy { it.col }.sort({ v1, v2 ->
                    Integer.compare(order.indexOf(v1.key), order.indexOf(v2.key))
                })
                colMap.each { col, List<Location> colList ->
                    if (col % 2 == 0) {
                        colList.each { it.seq = seq0 }
                        seq0 += 1
                    } else {
                        colList.each { it.seq = seq1 }
                        seq1 += 1
                    }
                }
                step *= -1
                seq0 = 1
                seq1 = 1
            }
        }

        locs.groupBy { "$it.area $it.hang $it.col" }.each { k, List<Location> v ->
            println(k + '\t' + v[0].seq) // print to check
        }

        Workbook workbook = new ExcelBuilder().workbook {
            data {
                sheet("Location") {
                    header(['Id', 'Code', 'Area', 'Hang', 'Col', 'Seq'])
                    locs.each {
                        row([it.id, it.code, it.area, it.hang, it.col, it.seq])
                    }
                }
            }
            writeToFile(new File("/tmp/LocationSeqed.xls"))
        }
    }
}
```

---
END
