import { YaoModel } from "yao-app-ts-types";
import { Studio } from "yao-node-client";

const parents = ["parent", "parent_id", "pid"];
const children = ["children", "children_id", "child", "child_id"];
/**
 * 关联关系分析同一个表中关联关系
 * @param {*} model_name
 * @param {*} columns
 * @param {*} table_struct
 */
export function child(
  model_name: string,
  columns: YaoModel.ModelColumn[],
  table_struct: YaoModel.ModelDSL
) {
  const dotName = Studio("file.DotName", model_name);
  for (const i in columns) {
    if (columns[i]["type"] != "integer") {
      continue;
    }
    if (children.indexOf(columns[i]["name"]) != -1) {
      table_struct.relations.children = {
        type: "hasMany",
        model: dotName,
        key: columns[i]["name"],
        foreign: "id",
        query: {},
      };
      return table_struct;
    }
  }
  return table_struct;
}

/**
 * 分析子集
 * @param {*} model_name
 * @param {*} columns
 * @param {*} table_struct
 * @returns
 */
export function parent(
  model_name: string,
  columns: YaoModel.ModelColumn[],
  table_struct: YaoModel.ModelDSL
) {
  const dotName = Studio("file.DotName", model_name);
  for (let i in columns) {
    if (columns[i]["type"] != "integer") {
      continue;
    }
    if (parents.indexOf(columns[i]["name"]) != -1) {
      table_struct.relations.parent = {
        type: "hasOne",
        model: dotName,
        key: "id",
        foreign: columns[i]["name"],
        query: {},
      };
      return table_struct;
    }
  }
  return table_struct;
}

export function other(all_table_struct: YaoModel.ModelDSL[]) {
  for (const i in all_table_struct) {
    // console.log(
    //   `process table Relation:${all_table_struct[i]["table"]["name"]}`
    // );

    const temp = all_table_struct[i]["columns"];
    all_table_struct = Studio(
      "hasone.hasOne",
      all_table_struct[i]["table"]["name"],
      all_table_struct
    );
    for (const j in temp) {
      all_table_struct = Studio(
        "hasmany.hasMany",
        all_table_struct[i]["table"]["name"],
        temp[j].name,
        all_table_struct
      );
    }
    //console.log("debugger:===>done", all_table_struct[i]["table"]["name"]);
  }
  return all_table_struct;
}

// yao studio run relation.translate icon
export function translate(keywords: string) {
  if (keywords == "id" || keywords == "ID") {
    return "id";
  }
  // let keywords = keywords.split("_");
  //console.log(keywords);
  // let url = "https://brain.yaoapps.com/api/keyword/column";
  // let response = Process(
  //   "xiang.network.PostJSON",
  //   url,
  //   {
  //     keyword: keywords,
  //   },
  //   {}
  // );
  let res = keywords;
  // if (response.status == 200) {
  //   if (response.data.data) {
  //     let res = "";
  //     for (let i in response.data.data) {
  //       let res = res + response.data.data[i]["label"];
  //     }
  //   }
  // }
  return res;
}

/**
 * 批量翻译
 * @param {*} keywords
 * @returns
 */
export function BatchTranslate(keywords: string) {
  return keywords;
  // let url = "https://brain.yaoapps.com/api/keyword/batch_column";
  // let response = Process(
  //   "xiang.network.PostJSON",
  //   url,
  //   {
  //     keyword: keywords,
  //   },
  //   {}
  // );
  // let res = keywords;
  // if (response.status == 200) {
  //   if (response.data.data) {
  //     // console.log(response.data.data);
  //     return response.data.data;
  //   }
  // }
  // return res;
}
/**
 * Model dsl全部翻译翻译
 * @param {*} keywords
 * @returns
 */
export function BatchModel(keywords: string) {
  return keywords;
  // let url = "https://brain.yaoapps.com/api/keyword/batch_model";
  // let response = Process(
  //   "xiang.network.PostJSON",
  //   url,
  //   {
  //     keyword: keywords,
  //   },
  //   {}
  // );

  // let res = keywords;
  // if (response.status == 200) {
  //   if (response.data.data) {
  //     // console.log(response.data.data);
  //     return response.data.data;
  //   }
  // }
  // return res;
}
