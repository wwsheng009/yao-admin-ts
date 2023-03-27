# YAO 应用开发 Typescript 模板使用

使用 typescript 进行 yao 应用开发,包含必要的 TS 编译脚本配置。TS 开发测试脚本。

## 说明

在目录 src/app 这个目录下使用 ts 格式进行脚本编程

在脚本文件中可以引用 yao 各种的对象的方法

```js
import { Process, log, Exception, WebSocket } from "yao-node-client";
```

## 开发环境准备

YAO 引擎并不能直接运行 ts 脚本，需要把 ts 脚本转换成 js 后 yao 才能执行。在代码开发阶段,TS 与 YAO-JS 之间利用 CLIENT-SERVER 架构进行调试与测试。需要先进行开发环境的配置。


先编译 jsproxy 代理TS脚本，yao 应用需要用到这个脚本作HTTP代理。

```
pnpm run yao:compile:jsproxy
```

复制 src/app/apis/proxy.http.json 到 YAO 应用目录的 apis 目录下

复制 dist_esm/app/scripts/jsproxy.js 到 YAO 应用目录的 scripts 子目录下

复制 src/app/scripts/remote.js 到 YAO 应用目录的 scripts 子目录下，后面如果需要从 yao 调用开发目录的脚本就按这个格式进行封装代码。

在本地开发环境启动服务器

```sh
pnpm run start
```

在 yao 目录下的.env 文件里加上环境变量

```sh
REMOTE_DEBUG_SERVER="http://localhost:8082/api/proxy/call"
```

## 测试调试代理是否成功

在 yao app 目录下执行

```
yao run scripts.remote.Ping 'hello'
```

调用成功会返回以下内容

```sh
$ yao run scripts.remote.Ping 'hello'

运行: scripts.remote.Ping
args[0]: hello
--------------------------------------
scripts.remote.Ping 返回结果
--------------------------------------
{
    "code": 200,
    "data": "Pong",
    "message": ""
}
--------------------------------------
✨完成✨
```

## 双向调用

> 在开发中的 typescript 代码中调用 yao 的功能.

这个场景按 yao 脚本的格式进行处理即可。比如调用处理器就使用 Process 函数。调用查询就用 new Query()对象。在 nodejs 中已经封装了相关的函数与对象。

> 在 yao 中调用开发中的 typescript 代码。

在有些场景下，需要从 yao 的 json 配置文件中访问开发目录中的 ts 代码。那么就按`src/app/scripts/remote.js`的格式封装一个函数。如果调用处理的地方支持自定义函数，也可以使用以下的格式。

- 参数 1(scripts.jsproxy.RemoteProcess)是一个代理调用函数，
- 参数 2(scripts.ping.Ping),开发中的 ts 处理器,
- 剩余的是处理器的参数。

```js
Process("scripts.jsproxy.RemoteProcess", "scripts.ping.Ping", ...args);
```

## 调试 API

在执行完`pnpm run start`后，在开发目录下也会启动一个 express 的 web 服务器，服务器会加载 yao 的 api 下的 http 路由配置并进行监听，同时会加载 yao 目录下的 public 的内容。可以直接使用 web 服务器提供的地址进行 api 测试。最大的好处的是可以调试代码。

**注意:**需要配置环境变量 YAO_APP_ROOT.

## 读取文件

使用 FS 对象读取文件时，需要考虑环境变量 YAO_APP_ROOT 的设置。处理器会读取此目录下 data 子目录的数据。
