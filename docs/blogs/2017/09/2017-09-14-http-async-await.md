---
title:  "JS async await"
date:   2017-09-14 12:57:37
tags:   [js, es7]
---

- The `async` function declaration defines an asynchronous function, which returns an AsyncFunction object.
- The `await` operator is used to wait for a Promise. It can only be used inside an `async` function.

## from developer.mozilla.org

```js
function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}


async function add1(x) {
  var a = await resolveAfter2Seconds(20);
  var b = await resolveAfter2Seconds(30);
  return x + a + b;
}

add1(10).then(v => {
  console.log(v);  // prints 60 after 4 seconds.
});


async function add2(x) {
  var p_a = resolveAfter2Seconds(20);
  var p_b = resolveAfter2Seconds(30);
  return x + await p_a + await p_b;
}

add2(10).then(v => {
  console.log(v);  // prints 60 after 2 seconds.
});
```

### Rewriting a promise chain with an async function
```js
function getProcessedData(url) {
  return downloadData(url) // returns a promise
    .catch(e => {
      return downloadFallbackData(url); // returns a promise
    })
    .then(v => {
      return processDataInWorker(v); // returns a promise
    });
}
```

To:

```js
async function getProcessedData(url) {
  let v;
  try {
    v = await downloadData(url); 
  } catch(e) {
    v = await downloadFallbackData(url);
  }
  return processDataInWorker(v);
}
```

## tc39 的例子

### Promise

```js
const posts = [
  { title: 'Post 1', content: 'fake content'},
  { title: 'Post 2', content: 'fake content'},
];
const getPosts = () => new Promise(resolve => setTimeout(() => resolve(posts), 1000));

// call
const printPostsToConsole = () => getPosts().then(posts => console.log(posts));
printPostsToConsole();

// catch
const printPostsToConsole = () => getPosts()
  .then(posts => console.log(posts))
  .catch(err => console.log(err));
printPostsToConsole();
```

### async/await

```js
const printPostsToConsole = async () => {
  const posts = await getPosts();
  console.log(posts);
};
printPostsToConsole();
```
或者
```js
async function printPostsToConsole() {
  const posts = await getPosts();
  console.log(posts);
};
printPostsToConsole();
```

catch
```js
const printPostsToConsole = async () => {
  try {
    const posts = await getPosts();
    console.log(posts);
  } catch(err) {
    console.log(err);
  }
};
```

## 使用
`.bebalrc`
```js
{
  "presets": ["es2015", "stage-3"]
}
```
或者
```js
{
  "presets": ["es2015"],
  "plugins": ["transform-async-to-generator"]
}
```


---
Links:
- https://tc39.github.io/ecmascript-asyncawait/
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
- https://jigsawye.com/2016/04/18/understanding-javascript-async-await/
- https://medium.com/@peterchang_82818/javascript-es7-async-await-%E6%95%99%E5%AD%B8-703473854f29-tutorial-example-703473854f29
---
END
