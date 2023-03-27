import { MapAny, YaoComponent, YaoField } from "yao-app-ts-types";
import { FS } from "yao-node-client";
import { SchemaColumn } from "./types";
// 图片组件推测
export function File(
  column: MapAny,
  component: YaoField.ColumnDSL
): YaoField.ColumnDSL {
  var guard = [
    "img",
    "image",
    "_pic",
    "pic_",
    "picture",
    "oss",
    "photo",
    "icon",
    "avatar",
    "Img",
    "logo",
    "cover",
    "url",
    "gallery",
    "pic",
  ];
  const name = column.name;
  for (var i in guard) {
    if (name.indexOf(guard[i]) != -1) {
      var component: YaoField.ColumnDSL = {
        bind: name,
        view: {
          type: "Image",
          compute: "scripts.file.image.ImagesView",
          props: {},
        },
        edit: {
          type: "Upload",
          //compute: "scripts.file.image.ImagesEdit",
          props: {
            filetype: "Image",
            disabled: true,
            $api: {
              process: "fs.system.Upload",
            },
          },
        },
      };
      return component;
    }
  }

  return component;
}

export function FormFile(
  column: { name: string },
  component: YaoField.ColumnDSL & MapAny,
  model_dsl: MapAny
): SchemaColumn {
  var guard = [
    "img",
    "image",
    "_pic",
    "pic_",
    "picture",
    "oss",
    "photo",
    "icon",
    "avatar",
    "Img",
    "logo",
    "cover",
    "url",
    "gallery",
    "pic",
  ];
  const name = column.name;
  for (var i in guard) {
    if (name.indexOf(guard[i]) != -1) {
      var component: SchemaColumn = {
        is_image: true,
        bind: name,
        view: {
          type: "Image",
          compute: "scripts.file.image.ImagesView",
          props: {},
        },
        edit: {
          type: "Upload",
          compute: {
            process: "scripts.file.image.ImagesEdit",
            args: ["$C(row)", "$C(type)", name, model_dsl["table"]["name"]],
          },
          // compute: "scripts.file.image.ImagesEdit",
          props: {
            filetype: "Image",
            $api: { process: "fs.system.Upload" },
          },
        },
      };
      return component;
    }
  }

  return component;
}

/**
 * yao studio run file.DotName table_name
 * yao studio run file.DotName /file/name
 * @param {string} pathname
 * @returns model name with dot
 */
export function DotName(pathname: string) {
  let str = pathname;
  str = str.replace(/\\/g, "/");
  str = str.replace(/\/\//g, "/");
  str = str.replace(/\//g, ".");
  str = str.replace(/-/g, ".");
  str = str.replace(/_/g, ".");
  let newStr = str.replace(/^\.+|\.+$/g, "");
  return newStr;
}

/**
 * yao studio run file.SlashName crm_help
 * @param {string} pathname
 * @returns pathname
 */
export function SlashName(pathname: string) {
  let str = pathname;
  str = str.replace(/\\/g, "/");
  str = str.replace(/_/g, "/");
  str = str.replace(/-/g, "/");
  str = str.replace(/\./g, "/");
  str = str.replace(/\/\//g, "/");
  let newStr = str.replace(/^\/+|\/+$/g, "");
  return newStr;
}
/**
 * yao studio run file.FileNameConvert "/models/cms__help.mod.json"
 * yao studio run file.FileNameConvert "/models/cms.help.mod.json"
 * yao studio run file.FileNameConvert "/models/cms.json"
 * @param {string} filename
 * @returns new filename
 */
export function FileNameConvert(filename: string) {
  let str = filename;
  str = str.replace(/_/g, "/");
  str = str.replace(/-/g, "/");
  str = str.replace(/\\/g, "/");
  str = str.replace(/\/\//g, "/");
  let arr = str.split(".");
  if (arr.length < 3) {
    return str;
  }
  let suffix = arr.slice(-2);
  let header = arr.slice(0, -2);
  let str1 = header.join("/");
  str1 = str1 + "." + suffix.join(".");
  return str1;
}
/**
 * write file
 * yao studio run file.WriteFile "/models/cms_help.mod.json"
 * yao studio run file.WriteFile "/models/cms.help.mod.json"
 * yao studio run file.WriteFile "/models/cms.json"
 * @param {string} filename filename
 * @param {object} data
 */
export function WriteFile(filename: string, data: object) {
  let nfilename = FileNameConvert(filename);

  let fs = new FS("dsl");
  if (!fs.Exists(nfilename)) {
    let paths = nfilename.split("/");
    paths.pop();
    let folder = paths.join("/");

    if (!fs.Exists(folder)) {
      // console.log("make folder", folder);
      fs.MkdirAll(folder);
    }
  }
  // console.log("write file:", nfilename);
  fs.WriteFile(filename, JSON.stringify(data));
}
