---
title:  "Arduino: 01. Getting Started"
date:   2017-07-15 00:27:37
tags:   [arduino]
---
今天想起来以前买的Arduino板子,已经放在公司一年多了.晚上带回家里充上电,重新玩儿一下.

首先下载Arduino Ide, 然后配置权限,如果不配置的话也可以`sudo`启动.

打开程序配置 `Tools > Board` 和 `Tools | Serial Port`, 
打开样例 `File > Examples > 1.Basics > Blink`,
`Upload`程序,就可以看到开发板上的等一闪一闪了.

```c
// the setup function runs once when you press reset or power the board
void setup() {
  // initialize digital pin LED_BUILTIN as an output.
  pinMode(LED_BUILTIN, OUTPUT);
}

// the loop function runs over and over again forever
void loop() {
  digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(1000);                       // wait for a second
  digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
  delay(1000);                       // wait for a second
}
```

---
Links:
- [Getting Started](http://www.arduino.org/learning/getting-started)
- [Permission On Linux](http://www.arduino.org/learning/getting-started/arduino-ide-on-linux-based-os)
- 

---
END
