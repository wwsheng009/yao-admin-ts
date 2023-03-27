import { FS } from "yao-node-client";

/**
 * 文件复制移动逻辑
 */
export function Move(dir: string, name: string) {
  const fs = new FS("dsl");
  const base_dir = ".trash";

  // 判断文件夹是否存在.不存在就创建
  Mkdir(base_dir);
  const new_dir = String(Date.now() / 1000);
  // models的文件移动到
  const target_name = dir + "/" + name;

  // 如果表已经存在,则
  if (Exists(dir, name)) {
    // console.log("makdir:", base_dir + "/" + new_dir);
    Mkdir(base_dir + "/" + new_dir);
    Copy(target_name, base_dir + "/" + new_dir, name);
    // 复制完成后,删除文件
    fs.Remove(target_name);
  } else {
    return false;
  }
}
export function Mkdir(name: string) {
  const fs = new FS("dsl");
  const res = fs.Exists(name);
  if (res !== true) {
    fs.MkdirAll(name);
  }
}

export function Copy(from: string, to: string, name: string) {
  const fs = new FS("dsl");
  fs.Copy(from, to + "/" + name);
}
/**
 * 查看模型是否存在
 * @param {*} file_name
 * @returns
 */
export function Exists(dir: string, file_name: string) {
  const fs = new FS("dsl");
  const res = fs.Exists(dir + "/" + file_name);
  return res;
}
