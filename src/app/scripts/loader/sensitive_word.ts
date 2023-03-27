import { FS, FSSAPCE, Process, Query } from "yao-node-client";

/**
 * 从文件加载敏感词到数据库表中
 * @returns
 */
function Run() {
  var fs = new FS("system"); // /app_root/data
  var data = fs.ReadFile("/word.txt"); // /app_root/data/xxx

  const words = data.split("\n");
  var qb = new Query("xiang");
  let rc = qb.Get({
    sql: {
      stmt: "delete from sensitive_word",
    },
  });
  let wordArray: string[][] = [];
  words.forEach((word: string) => wordArray.push([word]));
  rc = Process("Models.sensitive_word.Insert", ["word"], wordArray);

  console.log(rc);
  return rc;
}

Run();
