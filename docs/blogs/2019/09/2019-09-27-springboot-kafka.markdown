---
layout: post
title:  "Kafka With Docker and SpringBoot"
date:   2019-09-27 14:58:00 +0000
tags:   [docker, kafka, spring]
categories: [Java]
author: Alan Wang
---

Docker Compose 运行 Kafka，结合 SpringBoot 进行生产和消费消息。

### 安装

选择 wurstmeister 的 kafka 镜像：

```yaml
version: '2'
services:
  zookeeper:
    image: wurstmeister/zookeeper
    ports:
      - "2181:2181"
  kafka:
    image:  wurstmeister/kafka:2.12-2.3.0
    depends_on:
      - zookeeper
    ports:
      - "9092:9092"
    environment:
      KAFKA_ADVERTISED_HOST_NAME: 101.101.101.101
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock


  kafka_manager:
    image: hlebalbau/kafka-manager:stable
    depends_on:
      - zookeeper
      - kafka
    ports:
      - "9000:9000"
    environment:
      ZK_HOSTS: "zookeeper:2181"
      APPLICATION_SECRET: "random-secret"
    command: -Dpidfile.path=/dev/null
```

使用命令行测试：

创建 Topic：
```sh
kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic test
```

查看 Topic：
```sh
kafka-topics.sh --list --bootstrap-server localhost:9092
```

发送消息
```sh
> kafka-console-producer.sh --broker-list localhost:9092 --topic test
This is a message
This is another message
```

消费消息：
```sh
kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic test --from-beginning
```


### SpringBoot

build.gradle

```groovy
compile 'org.springframework.kafka:spring-kafka:2.2.8.RELEASE'
```

生产者：

```java
import java.util.HashMap;
import java.util.Map;

import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;

@Configuration
public class KafkaProducerConfig {
   @Bean
   public ProducerFactory<String, String> producerFactory() {
      Map<String, Object> configProps = new HashMap<>();
      configProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
      configProps.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
      configProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
      return new DefaultKafkaProducerFactory<>(configProps);
   }
   @Bean
   public KafkaTemplate<String, String> kafkaTemplate() {
      return new KafkaTemplate<>(producerFactory());
   }
}
```

To publish a message, just autowired KafkaTemplate and produce a message:

```java
@Autowired
private KafkaTemplate<String, String> kafkaTemplate;
 
public void sendMessage(String msg) {
   kafkaTemplate.send(topicName, msg);
}
```

#### Consumer

```java

import java.util.HashMap;
import java.util.Map;

import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;

@EnableKafka
@Configuration
public class KafkaConsumerConfig {
   @Bean
   public ConsumerFactory<String, String> consumerFactory() {
      Map<String, Object> props = new HashMap<>();
      props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
      props.put(ConsumerConfig.GROUP_ID_CONFIG, "group-id");
      props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
      props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
      return new DefaultKafkaConsumerFactory<>(props);
   }
   @Bean
   public ConcurrentKafkaListenerContainerFactory<String, String> kafkaListenerContainerFactory() {
      ConcurrentKafkaListenerContainerFactory<String, String> 
      factory = new ConcurrentKafkaListenerContainerFactory<>();
      factory.setConsumerFactory(consumerFactory());
      return factory;
   }
}  
```

Write a listener to listen to the messages:

```java
@KafkaListener(topics = "test", groupId = "group-id")
public void listen(String message) {
   System.out.println("Received Messasge in group - group-id: " + message);
}
```

一个测试程序：
```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;

@SpringBootApplication
public class KafkaDemoApplication implements ApplicationRunner {
   @Autowired
   private KafkaTemplate<String, String> kafkaTemplate;

   public void sendMessage(String msg) {
      kafkaTemplate.send("test", msg);
   }
   public static void main(String[] args) {
      SpringApplication.run(KafkaDemoApplication.class, args);
   }
   @KafkaListener(topics = "test", groupId = "group-id")
   public void listen(String message) {
      System.out.println("Received Messasge in group - group-id: " + message);
   }
   @Override
   public void run(ApplicationArguments args) throws Exception {
      sendMessage("Hi Welcome to Spring For Apache Kafka");
   }
}
```



---
- https://hub.docker.com/r/wurstmeister/kafka/
- https://kafka.apache.org/quickstart
- https://www.tutorialspoint.com/spring_boot/spring_boot_apache_kafka.htm