---
title: 02.cors解决跨域请求
subtitle: cocos3d项目结构
date: 2024-04-15
updated: 2024-04-15
categories: cocos
tags:
  - game
  - cocos
top: 1
aplayer: true
---

## 登录

在前端有个这样的login组件，后续解释代码

```ts
import { _decorator, Component, EditBox, Node } from 'cc';
const { ccclass, property } = _decorator;
import Crypt from 'jsencrypt'
import { PublicKey } from '../common';

const crypt = new Crypt()
crypt.setKey(PublicKey)

@ccclass('LoginManger')
export class LoginManger extends Component {
    account: EditBox
    password: EditBox

    /**
     * Method called when the component is loaded.
     */
    onLoad() {
        this.account = this.node.getChildByName('Account').getComponent(EditBox);
        this.password = this.node.getChildByName('Password').getComponent(EditBox);
    }

    /**
     * A description of the entire function.
     *
     * @param {type} paramName - description of parameter
     * @return {type} description of return value
     */
    async register() {
        const account = crypt.encrypt(this.account.string);
        const password = crypt.encrypt(this.password.string);

        console.log('account :>> ', account);
        console.log('password :>> ', password);

        const res = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ account, password }),
        })
            .then((response) => response.json())
        console.log('res :>> ', res);
    }
}
```
使用fetch发送请求

后端代码改成
由于express没有对body做处理，所以还需要这个包`body-parser`
相当于中间件直接use就行了

```ts
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) => {
  console.log('req :>> ', req.body);
  let { account, password } = req.body

  res.json({
    code: 200,
    account,
    password,
  })
  console.log('account :>> ', account); ``
  console.log('password :>> ', password);
})

app.listen(port, () => console.log(`Example app listening on port https://localhost:${port}`))

console.log("auth 服务");
```
## 问题
用cocos打开之后也简单
但是输入密码发送请求的时候发现是明文发送 这个其实不太好，下一篇文章解决
