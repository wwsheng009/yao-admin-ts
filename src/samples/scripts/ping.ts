import { Process } from "yao-node-client";

//在开发阶段在yao应用里可以只写一个空的函数体，通过远程调用的方式调用nodejs写的ts脚本。
//
//封装远程调用的处理器
function Ping(...args: any[]) {
  //scripts.jsproxy.RemoteProcess是向代理请求的处理器
  //scripts.ping.Ping是需要远程调用的处理器
  //
  return Process("scripts.jsproxy.RemoteProcess", "scripts.ping.Ping", ...args);
}
