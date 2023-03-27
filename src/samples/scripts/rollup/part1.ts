import { Process } from "yao-node-client";

export function Add(a: number, b: number) {
  console.log(Process("utils.str.Concat", "test", "cha"));
  return a + b;
}
