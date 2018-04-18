---
layout: post
title:  "Spring Get Queue Size"
date:   2018-04-18 12:23:37 +0000
tags:   [spring, rabbitmq]
author: Alan Wang
---
```groovy
import org.springframework.amqp.rabbit.core.RabbitAdmin
import org.springframework.amqp.rabbit.core.RabbitTemplate
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class AisMessageSender {
    @Autowired
    RabbitTemplate rabbit

    final void sendMessage(AisMessage msg) {
        rabbit.convertAndSend(msg.queue, msg)
    }

    @Autowired
    private RabbitAdmin admin;
    @Autowired
    private List<Queue> rabbitQueues;

    public void getCounts() {
        Properties props;
        Integer messageCount;
        for (Queue queue : rabbitQueues) {
            props = admin.getQueueProperties(queue.getName())
            messageCount = Integer.parseInt(props.get("QUEUE_MESSAGE_COUNT").toString())
            System.out.println(queue.getName() + " has " + messageCount + " messages")
        }
    }
}
```