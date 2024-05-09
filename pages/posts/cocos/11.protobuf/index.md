---
title: 09.protobuf
subtitle: protobuf
date: 2024-04-27 17:10:09
updated: 2024-05-9 23:53:01
categories: protobuf
tags:
  - game
  - 游戏登录
  - cocos
  - protobuf
top: 1
comment: true
aplayer: true
nav: true
---

protobuf是谷歌开源的二进制字节传输，由于手游要适配用户的不同手机，减少网络请求包能减小用户的手机发热耗电等问题，所以webscoket中压缩用户传输的数据就显得很重要

### protobuf
先跟着官网启动一个`grpc`服务
[grpc](https://grpc.io/docs/languages/node/quickstart/)

gRPC 是一个高性能的远程过程调用框架，使用 protobuf 定义二进制的数据结构。相比之下 RESTful API 是基于 http 超文本协议，性能可想而知 gRPC 是高不少的。gRPC 支持node.js，适用微服务、client-server 等场景

### proto
proto文件是谷歌约定的语法，类似于.d.ts对于接口或者类的方法约束
```proto
syntax = "proto3";

option java_multiple_files = true;
option java_package = "io.grpc.examples.helloworld";
option java_outer_classname = "HelloWorldProto";
option objc_class_prefix = "HLW";

package helloworld;

// The greeting service definition.
service Greeter {
  // Sends a greeting
  rpc SayHello (HelloRequest) returns (HelloReply) {}

  rpc SayHelloStreamReply (HelloRequest) returns (stream HelloReply) {}
}

// The request message containing the user's name.
message HelloRequest {
  string name = 1;
}

// The response message containing the greetings
message HelloReply {
  string message = 1;
}
```

## protobuf的应用

### client
```ts
var PROTO_PATH = __dirname + '/../../protos/helloworld.proto';

var parseArgs = require('minimist');
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

function main() {
  var argv = parseArgs(process.argv.slice(2), {
    string: 'target'
  });
  var target;
  if (argv.target) {
    target = argv.target;
  } else {
    target = 'localhost:50051';
  }
  var client = new hello_proto.Greeter(target,
    grpc.credentials.createInsecure());
  var user;
  if (argv._.length > 0) {
    user = argv._[0];
  } else {
    user = 'world111';
  }
  client.sayHello({ name: user }, function (err, response) {
    console.log('Greeting:', response.message);
  });
}

main();
```

### server
```ts
var PROTO_PATH = __dirname + '/../../protos/helloworld.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

/**
 * Implements the SayHello RPC method.
 */
function sayHello(call, callback) {
  callback(null, {message: 'Hello ' + call.request.name});
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addService(hello_proto.Greeter.service, {sayHello: sayHello});
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}

main();
```

## 开拔
上面呢是个demo，简单的protobuf使用，很简单我就不详细介绍了
接下来引入protobuf包的js cli和生成js文件的包，自动生成的js

```bash
import protoRoot from "../common/idl/auto-gen-ws";
```
如果没有的话cd到root然后yarn common

### server to client
这个方法在之前是ws通信的时候校验了token的，然后需要调用发送信息实现一个sendMessgae方法

```ts
  import { AuthClient, CheckTokenReq, RpcFunc, getProtoPathByRpcFunc } from '../common';

   async handleMessage(ws: WebSocket, buffer: Buffer): Promise<void> {
    const name = buffer.readUint8(0);
    const path = getProtoPathByRpcFunc(name, 'req')
    const coder = protoRoot.lookup(path)
    const data = coder.decode(buffer.slice(1))

    if (name === RpcFunc.enterGame) {
      const res = await this.checkTocken(data)
      this.sendMessage(ws, name, res)
    } else {
      // TODO 和副本通信
    }
  }

  sendMessage(ws: Webscoket, name: RpcFunc,res: any){
    const headerBuffer = Buffer.alloc(1)
    headerBuffer.writeUInt8(name)

    const path = getProtoPathByRpcFunc(name, 'res')
    const coder = protoRoot.lookup(path)
    const dataBuffer = coder.encode(res).finish()

    const buffer = Buffer.concat([headerBuffer, dataBuffer])
    ws.send(buffer)
  }

  // checkTocken也需要改成promise
  checkTocken({ token }: { token: string }) {
    return new Promise((rs) => {
      const client = new AuthClient('localhost:3333', grpc.credentials.createInsecure());
      const req = new CheckTokenReq()
      req.setToken(token);

      client.checkToken(req, (err, message) => {
        rs(message.toObject())
      })
    })
  }
```

### client to server

```ts
  this.ws.onmessage = (e) => {
    try {
      const ta = new Uint8Array(e.data);
      const name = ta[0];
      const path = getProtoPathByRpcFunc(name, 'res')
      const coder = protoRoot.lookup(path)
      const data = coder.decode(ta.slice(1))
      try {
        if (this.maps.has(name) && this.maps.get(name).length) {
          this.maps.get(name).forEach(({ cb, ctx }) => cb.call(ctx, data));
        } else {
          console.log(`no ${name} message or callback, maybe timeout`);
        }
      } catch (error) {
        console.log("call error:", error);
      }
    } catch (error) {
      console.log("onmessage parse error:", error);
    }
  };
```
在onmessage里面需要把typeArray转成数组

send里面同样需要改造一下

```ts
  async send(name: RpcFunc, data: IData) {
    const path = getProtoPathByRpcFunc(name, 'req')
    const coder = protoRoot.lookup(path)
    const typeArrayData = coder.encode(data).finish()
    const arraybufferData = new ArrayBuffer(typeArrayData.length + 1)
    const view = new DataView(arraybufferData)
    let index = 0
    view.setUint8(index++, name)
    for (let i = 0; i < typeArrayData.length; i++) {
      view.setUint8(index++, typeArrayData[i])
    }

    this.ws.send(view.buffer)
  }
```

