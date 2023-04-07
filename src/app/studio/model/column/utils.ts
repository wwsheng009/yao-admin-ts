import { YaoModel } from "yao-app-ts-types";
import { Studio } from "yao-node-client";

/**
 * yao studio run model.column.utils.MakeColumnOrder
 * @param columns 类型定义数据列
 * @returns 排序后的数据列
 */
export function MakeColumnOrder(columns: YaoModel.ModelColumn[]) {
  const typeMapping = Studio("model.column.component.GetDBTypeMap");

  let columnsBefore: YaoModel.ModelColumn[] = [];
  //json或是textarea控件放在最后
  let columnsAfter: YaoModel.ModelColumn[] = [];
  columns.forEach((column) => {
    if (
      ["TextArea"].includes(typeMapping[column.type]) ||
      column.type === "json"
    ) {
      columnsAfter.push(column);
    } else {
      columnsBefore.push(column);
    }
  });
  return columnsBefore.concat(columnsAfter);
}
