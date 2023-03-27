import { FS, FSSAPCE } from "yao-node-client";
function createTemp() {
  const fs1 = new FS(FSSAPCE.system);
  fs1.MkdirTemp("test", "test-*");
}

// function createTemp() {
//     const fs1 = new FS(FSSAPCE.System);
//     fs1.MkdirTemp("test", "test-*");
//   }
export function Add(a: number, b: number) {
  return a + b;
}

export function Print(file: object) {
  console.log(">>>>>>fs script is called<<<<<");
  console.log(JSON.stringify(file));
  return file;
}
