---
title: stack
subtitle: 数据结构与算法
date: 2023-10-31
updated: 2023-10-31
categories: algorithm
tags:
  - algorithm
top: 1
aplayer: true
---

## stack

● 结尾删除和添加

● 后入先出

## 封装

- #item表示是当前类的私有属性。

```ts
// push 一个元素到栈顶
// pop 出栈
// peek 返回栈顶

// isEmpty()
// clear()
// size()
// toString()

class Stack {
 #items = []

 pop() {
  return this.#items.pop()
 }

 push(data){
  this.#items.push(data)
 }

 peek(){
  return this.#items.at(-1)
 }

 size(){
  return this.#items.length
 }

 isEmpty(){
  if(this.size() === 0) return true
  return false
 }

 clear(){
  return this.#items = []
 }

 toString() {
  return this.#items.join(',')
 }
}

let stack = new Stack()
```

## 栈的使用

```ts
function convert(decNumber,convertNum){
 let stack = new Stack()
 let number = decNumber
 let string = '' // 要输出的string

 while(number>0){
  stack.push(number%convertNum) // 余数推入栈
  number = Math.floor(number/convertNum) // 商进行下一次循环
 }

 while(!stack.isEmpty()){
  string+=stack.pop()
 }
}

convert(50,2) // 将一个数字转化成2进制
```
