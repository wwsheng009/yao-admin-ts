import { MapAny } from "yao-app-ts-types";
import { Process } from "yao-node-client";

let DbType = "";
export function getDBType() {
  if (DbType === "") {
    DbType = Process("utils.env.Get", "YAO_DB_DRIVER");
  }
  return DbType;
}

/**
 * yao studio run model.utils.IsMysql
 * @returns boolean
 */
export function IsMysql() {
  return /mysql/i.test(getDBType());
}

/**
 * 合并两个js对象，并返回新对象。
 * yao studio run model.utils.MergeObject
 * @param target 目标对象
 * @param source 源对象
 * @returns
 */
export function MergeObject(target: MapAny, source: MapAny) {
  if (
    typeof target !== "object" ||
    target == null || //mybe undefined
    typeof source !== "object" ||
    source == null //mybe undefined
  ) {
    return target;
  }

  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      if (
        target[key] &&
        typeof target[key] === "object" &&
        typeof source[key] === "object"
      ) {
        target[key] = MergeObject(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}
