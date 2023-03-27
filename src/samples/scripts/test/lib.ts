import { Process } from "yao-node-client";

export function GetTime() {
  return Process("utils.now.DateTime");
}
