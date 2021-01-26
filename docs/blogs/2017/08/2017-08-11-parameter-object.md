---
title:  "Refactoring: Parameter Object"
date:   2017-08-11 11:57:37 +0000
tags:   [refactoring, parameter-object]
---
对于方法参数过多的时候,重构的时候需要将多个参数封装成一个`参数对象`:

封装前
```java
// Consumer
amountInvoicedIn (start : Date, end : Date)
amountReceivedIn (start : Date, end : Date)amountOverdueIn (start : Date, end : Date)
```

封装后
```java
amountInvoicedIn (: DateRange)
amountReceivedIn (: DateRange)
amountOverdueIn (: DateRange)
```

## Spring中的命令对象

命令对象是对Form参数的封装,为了简单,Spring中可以将 Command Object 和 Business Entity 共用.

以下摘自: [difference-between-command-form-business-and-entity-objects-in-spring-terms](https://stackoverflow.com/questions/11475673/difference-between-command-form-business-and-entity-objects-in-spring-terms)

1. Technically, business objects and business entities (or "entity objects" as you call them) are not the same.

Business entities contain the data. Whereas business objects contain the logic about your business entities (how you create your entity, how you update it, etc.). Business objects are technically an old J2EE pattern, I haven't really seen it in current codes so I cannot go into specifics. Some people would say that business objects correspond to DAOs, others would rather say Services. And some developers just say that business objects and entities are the same because they think that "object" and "entity" have the same granularity, or because their business entities also contain logic, or just because they don't know. I just prefer to talk about "(business) entities" for objects containing the data, and I never use the term "business object" because it can have different interpretations.

2. According to Spring MVC documentation, a command object is a JavaBean which will be populated with the data from your forms. On the other hand, what is a form object, but an object backing your form ?

So yes, a command object is semantically the same as a form object. I prefer the term form object, that I find immediately understandable.

3. As you said, according to Spring MVC documentation, one feature of the framework is

> Reusable business code, no need for duplication. Use existing business objects as command or form objects instead of mirroring them to extend a particular framework base class.

So yes, you can -and you should, according to Spring- use a business entity as your command/form object. If you are not convinced, here are some reasons :

  - For the sake of simplicity. And god knows that our Java software architectures need more simplicity. Some companies use way too much layers to do very simple stuff. Lots of initiatives are done to counter this, led by Spring, Java (see below) and whatnot.
  - For your own sake, because it makes programming simpler, easier and funnier
  - Because Spring and Java (through JSRs) say it. Indeed : what do we expect from a form object ? Form backing and probably some validation. How would we do this validation ? Spring MVC 3 supports the validation of @Controller inputs with the JSR-303 @Valid annotation. Where would we put the constraints to validate ? According to JSR-303, the best place to store these constraints (@NotNull, @Length etc.) is within the business entity itself. Bottom line: it is better to use a business entity as your command/form object.
  - The separation of concerns is still respected. It's just that one concern (form backing) is not a concern any more ! Spring MVC handles it for you. :-) You just have to worry about your business entities.

---
Links:
- [重构参数对象](https://www.refactoring.com/catalog/introduceParameterObject.html)
- [difference-between-command-form-business-and-entity-objects-in-spring-terms](https://stackoverflow.com/questions/11475673/difference-between-command-form-business-and-entity-objects-in-spring-terms)
- http://www.importnew.com/6600.html
- [what-is-the-command-object-in-spring-framework](https://stackoverflow.com/questions/7583577/what-is-the-command-object-in-spring-framework)

---
END
