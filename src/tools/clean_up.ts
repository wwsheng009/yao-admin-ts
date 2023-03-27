import fs from "fs";
import path from "node:path";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

//清理转换esm格式的js代码为yaojs脚本。
//注释外部引用，import/require
//删除fuction的export关键字
//替换ProcessEnum为字符串

function checkIsJsFile(filePath: string) {
  const ext = path.extname(filePath);
  return ext === ".js";
}
/**
 * 读取一个目录下所有的js文件
 * @param dir 目录
 * @returns
 */
function getAllJsFiles(dir: string) {
  let filesall = [] as string[];

  let getFile = (d: string) => {
    const files = fs.readdirSync(d);

    files.forEach(function (file: string) {
      const filePath = d + "/" + file;
      const fileStat = fs.lstatSync(filePath);

      if (fileStat.isDirectory()) {
        getFile(filePath);
      } else {
        if (checkIsJsFile(filePath)) {
          filesall.push(filePath);
        }
      }
    });
  };
  getFile(dir);

  return filesall;
}

/**
 * 简单处理js文件
 * @param filename 文件名
 */
function processComment(filename: string) {
  if (!fs.existsSync(filename)) {
    return;
  }
  const data = fs.readFileSync(filename, "utf8");

  // add comment
  const comment = "// ";
  const lines = data.split("\n");
  // lines[0] = comment + lines[0];

  let needProcess = false;
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    if (line.startsWith("import ") || line.startsWith("export {")) {
      lines[index] = comment + line;
      needProcess = true;
    } else if (line.startsWith("export function")) {
      lines[index] = line.slice("export ".length);
      needProcess = true;
    } else if (/ProcessEnum\.([\._\-a-zA-Z\d]*)/.test(line)) {
      lines[index] = line.replaceAll(
        /ProcessEnum\.([\._\-a-zA-Z\d]*)/g,
        `"$1"`
      );
    }
    // $ENV.只会在json文件里出现，脚本文件里使用处理器utils.env.Get获取变量·
    // else if (line.indexOf("process.env.") > -1) {
    //   lines[index] = line.replaceAll("process.env.", "$ENV.");
    // }
  }
  if (!needProcess) {
    return;
  }
  const commentedData = lines.join("\n");
  // save to new file
  fs.writeFileSync(filename, commentedData);
  console.log(`File ${filename} updated and saved!`);
}

function renameFile(filename: string) {
  if (!filename.endsWith("index.js")) {
    return;
  }
  let res = path.resolve(filename);
  if (!fs.existsSync(res)) {
    return;
  }
  let newname = res.substring(0, res.indexOf(`${path.sep}index.js`)) + ".js";

  fs.renameSync(filename, newname);
}

const deleteEmptyFolders = (dir: string) => {
  let files = fs.readdirSync(dir);
  if (files.length > 0) {
    files.forEach((file) => {
      let fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        deleteEmptyFolders(fullPath);
        if (fs.readdirSync(fullPath).length === 0) {
          fs.rmdirSync(fullPath);
        }
      }
    });
  }
};

function fixCodes(folder: string) {
  let files = getAllJsFiles(folder);
  //rename first
  for (const file of files) {
    renameFile(file);
  }

  deleteEmptyFolders(folder);

  files = getAllJsFiles(folder);
  for (const file of files) {
    processComment(file);
  }
}
function fixFile(fname: string) {
  if (!checkIsJsFile(fname)) {
    console.log("Not js file");
    return;
  }
  processComment(fname);
}
/**
 * 清理与修正nodejs打包生成生成的代码。
 */
function main() {
  const argv = yargs(hideBin(process.argv))
    .options({
      dir: {
        alias: "d",
        type: "string",
        default: "./dist_esm/app",
      },
      file: {
        alias: "f",
        type: "string",
        default: "./dist_esm/app/scripts/jsproxy.js",
      },
    })
    .parseSync();

  let folder = path.resolve(argv.dir);
  if (fs.existsSync(folder)) {
    fixCodes(folder);
  } else {
    console.log(`directory not exist ${folder}`);
  }
  if (argv.file) {
    fixFile(argv.file);
  }
}
main();

function testReplace() {
  let line = ` let setting = Process(ProcessEnum.yao.table.Setting, table);`;

  if (/ProcessEnum\.([\._\-a-zA-Z\d]*)/.test(line)) {
    let newLine = line.replaceAll(/ProcessEnum\.([\._\-a-zA-Z\d]*)/g, `"$1"`);
    console.log(newLine);
  }
}
// testReplace();
