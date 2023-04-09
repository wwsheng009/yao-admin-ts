import { YaoModel } from "yao-app-ts-types";
import { Process, Studio } from "yao-node-client";

/**
 * //根据关联关系找到列，并查找列对应的模型
 * yao studio run model.remote.select
 * @param relation_name
 * @param relation
 * @returns
 */
export function select(relation_name: string, releation: YaoModel.Relation) {
  //首先从关联关系的模型中找到模型
  let model: YaoModel.ModelDSL = Studio(
    "model.model.GetModel",
    releation.model
  );
  if (!model) {
    model = Process("schemas.default.TableGet", relation_name);
  }

  const columns = model.columns;
  let res = Speculation(columns);
  if (!res) {
    res = Other(columns);
  }
  //CreateScripts(relation_name, res, relation);
  return res;
}

/**
 * 字段推测
 * @param {*} column
 * @returns
 */
export function Speculation(columns: YaoModel.ModelColumn[]) {
  const target = ["name", "title"];
  for (const t of target) {
    const res = GetTarget(t, columns);
    if (res) {
      return res;
    }
  }
  return false;
}

export function GetTarget(
  target: string,
  columns: YaoModel.ModelColumn[]
): string | false {
  const columnNames = columns.map((col) => col.name);

  return (
    columnNames.find((name) => name === target) ??
    columnNames.find((name) => name.includes(target)) ??
    false
  );
}
/**
 * 没有其他的话,就找个string类型的
 * @param {*} columns
 * @returns
 */
export function Other(columns: YaoModel.ModelColumn[]): string {
  const stringColumn = columns.find((col) => col.type === "string");
  return stringColumn?.name ?? "id";
}

/**
 * 生成查询的js脚本
 * @param {*} relation_name
 * @param {*} name
 */
export function CreateScripts(
  relation_name: string,
  name: string,
  relation: YaoModel.Relation
) {
  const field_name = relation_name + "_query.js";
  const script = `export function GetSelect() {
    let query = new Query();
    let res = query.Get({
      select: ["id as value", "${name} as label"],
      from: "${relation.model}",
    });
    return res;
  }
  `;
  Studio("model.file.WriteScript", `${relation.model}/${field_name}`, script);
}
