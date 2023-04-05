import { YaoModel } from "yao-app-ts-types";
import { Studio } from "yao-node-client";

/**
 * yao studio run model.column.utils.MakeColumnOrder
 * @param columns 类型定义数据列
 * @returns 排序后的数据列
 */
export function MakeColumnOrder(columns: YaoModel.ModelColumn[]) {
  const typeMapping = Studio("model.column.component.GetTypes");

  let columns1: YaoModel.ModelColumn[] = [];
  //json或是textarea控件放在最后
  let columns2: YaoModel.ModelColumn[] = [];
  columns.forEach((column) => {
    if (
      ["TextArea"].includes(typeMapping[column.type]) ||
      column.type === "json"
    ) {
      columns2.push(column);
    } else {
      columns1.push(column);
    }
  });
  return columns1.concat(columns2);
}
