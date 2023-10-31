---
title: 数组
subtitle: 数据结构与算法
date: 2023-10-31
# updated: 2022-04-01
categories: algorithm
tags:
  - algorithm
top: 1
aplayer: true

---

## 数组

### 创建

● new Array().fill()

● Array.of()

● const arr: any[] = []

### 增删改查

push pop unshift shift  splice(第几个位置开始，删除几个，添加的元素)
排序
sort (（x,y）=> y - x) 正序

### 合并数组

...

### 遍历

● map：接受一个回调函数，返回新的数组

● filter： 接受一个回调函数，返回符合过滤条件的数组

● some： 接受一个回调函数，只要有一个满足的元素，返回true/或者false

● every： 接受一个回调函数，必须所有的元素都满足条件，才返回true

● reduce:

    ○ 接受一个2个参数，第一个初始化的值，第二个是一个回调函数，回调函数最多接受4个参数

    ○ pre,next,index,arr

● foreach

    ○ 通常无法打断，不过可以throw new Error()

● for...in/for of

    ○ 优点可以break/continue

### 类数组转化

● Array.from

### 迭代器

```ts
const arr  = [1,2,3]
let ite = arr[Symbol.iterator]()
console.log(ite.next()) // 即可拿到迭代器对象
// 或者for...of
for (let i of arr) {
 console.log(i)
}

console.log(arr.entries()) // 迭代器对象
```

### 数组的特殊遍历

```ts
const arr = [1,2,3]
arr.keys（） // 拿到数组/对象的所有的key形成一个数组
arr.values() // 拿到数组/对象的所有values形成一个数组
arr.entries() // 拿到数组的key/values形成多个数组 然后遍历即可获得数组的每一项的key-value映射
```

### 搜索

● indexOf,includes 判断某个元素是否在数组里

● find,findLast , 接受回调函数，返回第一个/最后一个满足的元素

● findIndex,findLastIndex 接受一个回调函数，返回第一个/最后一个满足元素的索引

```js
const arr = [1,2,3]
const res = arr.find(item=>item>1) // 1
```

### 二维数组

创建

```js
const arr = [
 [1,2,3],
 [2,3,4],
]

// 遍历 双重for循环
for(let i =0; i<arr.length; i++) {
 console.log(`第${i+1}个数组`)
 for(let j=0; j<arr[i].length; j++){
  console.log(arr[i][j])
 }
}
```
