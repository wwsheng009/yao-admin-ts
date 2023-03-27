import { WebSocket } from "yao-node-client";

/**
 * 发送通知
 * @param {*} data
 */
function Notify(data: { hello: string }) {
  var socket = new WebSocket(
    "ws://localhost:5099/websocket/message",
    "yao-message-01"
  );
  socket.push(JSON.stringify(data));
}

Notify({ hello: "world" });
