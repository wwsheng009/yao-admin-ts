import { Process } from "yao-node-client";

/**
 * 转换图片显示格式
 *
 * scripts.file.image.ImagesView
 * @param data 图片字段设置
 * @returns string[] 数组格式的图片地址
 */
export function ImagesView(data: string): string[] {
  if (!data || !data.length) {
    return null;
  }
  let isArray = true;
  try {
    isArray = Array.isArray(JSON.parse(data));
  } catch (error) {
    isArray = false;
  }

  let array: string[] = Array.isArray(data)
    ? data
    : isArray
    ? JSON.parse(data)
    : data.includes(",")
    ? data.split(",")
    : [data];

  if (!array || array.length == 0) {
    return null;
  }
  return array;
}

/**
 * scripts.file.image.ImagesEdit
 * @param row 行数据
 * @param name 字段名称
 * @param model_name 模型名称
 * @returns 处理后的图片地址
 */
export function ImagesEdit(
  row: { [key: string]: any },
  name: string,
  model_name: string
): string {
  const table = Process("schemas.default.TableGet", model_name);
  const column = table.columns.find(
    (col: { name: string }) => col.name === name
  );

  if (!column || column.type === "json") {
    return row[name];
  }

  return JSON.stringify(row[name]);
}
