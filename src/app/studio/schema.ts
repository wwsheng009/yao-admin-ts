import { YaoModel } from "yao-app-ts-types";
import { Exception, log, Process, Studio } from "yao-node-client";

/**yao studio run schema.GetTable role
 * 获取单个表字段
 * @param {*} name
 * @returns
 */
export function GetTable(name: string): YaoModel.ModelDSL {
  return Process("schemas.default.TableGet", name);
}
/**
 * 获取所有表格名称
 */
export function GetTableName(): string[] {
  return Process("schemas.default.Tables");
}

/**
 * 分析关联关系处理器
 * @param {*} type
 * yao studio run schema.Relation
 */
export function Relation() {
  let all_table = GetTableName();
  let table_num = all_table.length;
  if (table_num > 80) {
    log.Error("Data tables cannot exceed 80!");
    throw new Exception("Data tables cannot exceed 80!", 500);
  }
  let table_arr: YaoModel.ModelDSL[] = [];

  // 不需要的表格白名单
  let guards = ["xiang_menu", "xiang_user", "xiang_workflow", "pet"];
  let prefix = TablePrefix(all_table);

  for (let i = 0; i < all_table.length; i++) {
    //   const element = all_table[index];
    // }
    // for (let i in all_table) {
    if (guards.indexOf(all_table[i]) != -1) {
      continue;
    }
    console.log(`process table Relation:${all_table[i]}`);
    const col = GetTable(all_table[i]);
    //col.columns = Studio("relation.BatchTranslate", col.columns);
    // console.log(col.columns);
    // return;

    let id_flag = false;
    for (const j in col.columns) {
      if (col.columns[j]["name"] == "id" || col.columns[j]["name"] === "ID") {
        id_flag = true;
      }
      if (col.columns[j]["label"]) {
        col.columns[j]["label"] = FieldHandle(col.columns[j]["label"]);
      } else {
        col.columns[j]["label"] = col.columns[j]["name"];
      }
      if (col.columns[j]["type"] == "dateTime") {
        col.columns[j]["type"] = "datetime";
      }
      if (col.columns[j]["type"] == "BIT" || col.columns[j]["type"] == "bit") {
        col.columns[j]["type"] = "boolean";
      }
      if (
        col.columns[j]["type"] == "MEDIUMINT" ||
        col.columns[j]["type"] == "mediumint"
      ) {
        col.columns[j]["type"] = "tinyInteger";
      }
    }
    // 如果没有id的表就不要显示了
    if (!id_flag) {
      all_table.splice(i, 1);
      continue;
    }

    // 去除表前缀
    let trans = ReplacePrefix(prefix, all_table[i]);

    col.name = trans;
    //col.name = Studio("relation.translate", trans);
    col.decription = col.name;
    col.table = {};
    col.table.name = all_table[i];
    // console.log("col.table.name", col.table.name);
    col.table.comment = col.name;
    col.relations = {};
    let parent: YaoModel.ModelDSL = Studio(
      "relation.parent",
      all_table[i],
      col.columns,
      col
    );
    parent = Studio("relation.child", all_table[i], col.columns, parent);

    table_arr.push(parent);
  }

  table_arr = Studio("relation.other", table_arr);
  // console.log("debugger:===>relation.BatchModel");

  // table_arr = Studio("relation.BatchModel", table_arr);
  // console.log("debugger:===>relation.BatchModel down");

  return table_arr;
}

export function FieldHandle(labelin: string) {
  if (labelin && labelin.length >= 8) {
    let label = labelin.split(";")[0];
    label = label.split("；")[0];
    label = label.split("，")[0];
    label = label.split(";")[0];
    label = label.split("。")[0];
    label = label.split(":")[0];
    label = label.split("：")[0];
    label = label.split(",")[0];
    label = label.split("，")[0];
    return label;
  }

  return labelin;
}
//yao studio run schema.TablePrefix
export function TablePrefix(all_table_name: string[]) {
  if (!all_table_name || !all_table_name.length) {
    all_table_name = GetTableName();
  }
  let prefix = [];
  for (let i in all_table_name) {
    const temp = all_table_name[i].split("_");
    // 如果表格下划线有3个以上,有可能有表前缀
    if (temp.length >= 3 && prefix.indexOf(temp[0]) == -1) {
      prefix.push(temp[0]);
    }
  }
  return prefix;
}

// 把表前缀替换掉
export function ReplacePrefix(prefix: string[], target: string) {
  if (prefix.length) {
    for (let i in prefix) {
      target = target.replace(prefix[i] + "_", "");
    }
  }
  return target;
}
