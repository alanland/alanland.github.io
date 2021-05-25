---
title:  "TypeScript 中的 any, never, unknown"
date:   2021-05-19 10:16:58
tags:   [typescript, web]
categories: [前端]
---

## any

any 类型包含 JavaScript 中的所有值，如果引用了没有类型注释的 JavaScript 库，使用`any`类型可以通过编译。

```js {9}
let looselyTyped: any = 4;
// OK, ifItExists might exist at runtime
looselyTyped.ifItExists();
// OK, toFixed exists (but the compiler doesn't check)
looselyTyped.toFixed();

let strictlyTyped: unknown = 4;
strictlyTyped.toFixed();
/ Object is of type 'unknown'.
```

## unknown

`unknown`也是 TypeScript 中的超类型，可以表示所有的类型。

如果生命为 unknown 类型，TypeScript 不允许对该类行进行任何操作，只有在通过类型检查（Type Narrowing）之后才能进行调用。

```ts {4,11,19}
declare const maybe: unknown;
// 'maybe' could be a string, object, boolean, undefined, or other types
const aNumber: number = maybe;
/Type 'unknown' is not assignable to type 'number'.

if (maybe === true) {
  // TypeScript knows that maybe is a boolean now
  const aBoolean: boolean = maybe;
  // So, it cannot be a string
  const aString: string = maybe;
/Type 'boolean' is not assignable to type 'string'.
}

if (typeof maybe === "string") {
  // TypeScript knows that maybe is a string
  const aString: string = maybe;
  // So, it cannot be a boolean
  const aBoolean: boolean = maybe;
/Type 'string' is not assignable to type 'boolean'.
}
```

## never
The `never` type represents the type of values that never occur. 
For instance, `never` is the return type for a function expression or 
an arrow function expression that always throws an exception or one 
that never returns. Variables also acquire the type `never` when 
narrowed by any type guards that can never be true.

The `never` type is a subtype of, and assignable to, every type; however, 
no type is a subtype of, or assignable to, `never` (except `never` itself). 
Even `any` isn’t assignable to `never`.

Some examples of functions returning never:

```ts
// Function returning never must not have a reachable end point
function error(message: string): never {
  throw new Error(message);
}

// Inferred return type is never
function fail() {
  return error("Something failed");
}

// Function returning never must not have a reachable end point
function infiniteLoop(): never {
  while (true) {}
}
```

---
- [TypeScript Basic Types](https://www.typescriptlang.org/docs/handbook/basic-types.html)
