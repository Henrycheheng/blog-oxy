---
title: 06.uuid生成token
subtitle: uuid
date: 2024-04-22
updated: 2024-4-22
categories: uuid
tags:
  - game
  - 游戏登录
  - cocos
top: 1
aplayer: true
---

### uuid

```bash
pnpm install uuid
```

### token
![alt text](./image.png)

### login
登录和注册一样，从表里面查对应account和password就行了

```ts
const cache = new Map()

app.post('/login', (req, res) => {
  console.log('req :>> ', req.body)
  let { account, password } = req.body
  account = crypt.decrypt(account)
  password = crypt.decrypt(password)

  const hash = createHash('md5');
  const passwordHash = hash.update(password).digest('hex');

  connection.execute(
    'SELECT * FROM user WHERE account = ? AND password = ?',
    [account, passwordHash],
    (err, results: any[], fields): void => {
      if (err) {
        console.log('err :>> ', err);
        return;
      }
      if (results.length > 0) {
        const token = uuidv4()
        cache.set(token, account),
          res.json({
            code: 200,
            message: '登录成功',
            token
          })
        console.log('cache :>> ', cache);
      } else {
        res.json({
          code: 400,
          message: '登录失败,账号不存在或密码错误'
        })
      }
    }
  );
})
```
