import path from "node:path";
// import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import alias from "@rollup/plugin-alias";
import json from "@rollup/plugin-json";

import glob from "glob";
import { fileURLToPath } from "node:url";

const __dirname = path.resolve();

// 命令行定义环境变量，在脚本中可以直接获取
// console.log(process.env.TEST);

export default {
  input: Object.fromEntries(
    glob
      .sync("dist_esm/app/**/index.js")
      .map((file) => [
        path.relative(
          "dist_esm/app/",
          file.slice(0, file.length - path.extname(file).length)
        ),
        fileURLToPath(new URL(file, import.meta.url)),
      ])
  ),
  output: {
    // file: "./dist/app/scripts/rollup/index.esm.js",
    // format: "esm",
    sourcemap: false,
    format: "es",
    dir: "yao/app",
  },

  plugins: [
    nodeResolve({ preferBuiltins: true }),
    json(),
    //路径别名
    alias({
      entries: [
        {
          find: "@",
          replacement: path.resolve(__dirname, "dist_esm"),
        },
      ],
    }),
    // typescript({ module: "esnext" }),
    commonjs({ include: "node_modules/**" }),
  ],
  external: [/.*yao-node-client$/], //yao的代理客户端不要打包
};
