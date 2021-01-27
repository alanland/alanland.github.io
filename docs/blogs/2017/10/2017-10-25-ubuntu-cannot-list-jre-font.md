---
title:  "Ubuntu Java List Font failed"
date:   2017-10-25 08:57:37
tags:   [ubuntu, java, font]
---

```java
import java.awt.*;

/**
 * Created by ttx on 2017/10/25.
 */
public class ListFont {
    public static void main(String[] args){
        GraphicsEnvironment e = GraphicsEnvironment.getLocalGraphicsEnvironment();
        for (String font: e.getAvailableFontFamilyNames()){
            System.out.println(font);
        }
    }
}
```

## error1

```
java.lang.UnsatisfiedLinkError: jre/lib/amd64/libawt_xawt.so:
libXrender.so.1: cannot open shared object file: No such file or directory
```

```
apt-get install libxrender-dev
```

## error2

```
java.lang.UnsatisfiedLinkError: /mnt/jdk1.8/jre/lib/amd64/libawt_xawt.so:
libXtst.so.6: cannot open shared object file: No such file or directory
```

```
apt-get install libxtst-dev
```

---
END

