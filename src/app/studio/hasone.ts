import { YaoModel } from "yao-app-ts-types";
import { Studio } from "yao-node-client";

export function hasOne(table_name: string, all_table: YaoModel.ModelDSL[]) {
  const relation = [
    "hasOne_id",
    "hasOneID",
    "hasOneId",
    "PrefixHasOne_id",
    "PrefixhasOneID",
    "PrefixhasOneId",
  ];
  for (let i in relation) {
    all_table = Studio("hasone." + relation[i], table_name, all_table);
  }
  return all_table;
}

export function hasOne_id(table_name: string, all_table: YaoModel.ModelDSL[]) {
  // 先判断hasOne
  const foreign_id = table_name + "_id";
  const model_name = Studio("file.DotName", table_name);

  for (const i in all_table) {
    const temp_column = all_table[i]["columns"];
    for (const j in temp_column) {
      if (temp_column[j]["name"] == foreign_id) {
        all_table[i]["relations"][table_name] = {
          type: "hasOne",
          model: model_name,
          key: "id",
          foreign: foreign_id,
          query: {},
        };
      }
    }
  }
  return all_table;
}
export function hasOneID(table_name: string, all_table: YaoModel.ModelDSL[]) {
  // 先判断hasOne
  const foreign_id = table_name + "ID";
  const model_name = Studio("file.DotName", table_name);

  for (const i in all_table) {
    const temp_column = all_table[i]["columns"];
    for (const j in temp_column) {
      if (temp_column[j]["name"] == foreign_id) {
        all_table[i]["relations"][table_name] = {
          type: "hasOne",
          model: model_name,
          key: "id",
          foreign: foreign_id,
          query: {},
        };
      }
    }
  }
  return all_table;
}
export function hasOneId(table_name: string, all_table: YaoModel.ModelDSL[]) {
  // 先判断hasOne
  const foreign_id = table_name + "Id";
  const model_name = Studio("file.DotName", table_name);

  for (const i in all_table) {
    const temp_column = all_table[i]["columns"];
    for (const j in temp_column) {
      if (temp_column[j]["name"] == foreign_id) {
        all_table[i]["relations"][table_name] = {
          type: "hasOne",
          model: model_name,
          key: "id",
          foreign: foreign_id,
          query: {},
        };
      }
    }
  }
  return all_table;
}
/**
 * 有表前缀的hasone
 * @param {*} table_name
 * @param {*} all_table
 * @param {*} prefix
 * @returns
 */
export function PrefixHasOne_id(
  table_name: string,
  all_table: YaoModel.ModelDSL[]
) {
  const prefix = Studio("schema.TablePrefix");

  if (prefix.length) {
    const model_name = Studio("file.DotName", table_name);

    // 获取表前缀
    const target = Studio("schema.ReplacePrefix", prefix, table_name);
    const foreign_id = target + "_id";

    for (const i in all_table) {
      const temp_column = all_table[i]["columns"];
      for (const j in temp_column) {
        if (temp_column[j]["name"] == foreign_id) {
          all_table[i]["relations"][table_name] = {
            type: "hasOne",
            model: model_name,
            key: "id",
            foreign: foreign_id,
            query: {},
          };
        }
      }
    }
  }
  return all_table;
}
/**
 * 有表前缀的hasone
 * @param {*} table_name
 * @param {*} all_table
 * @param {*} prefix
 * @returns
 */
export function PrefixhasOneID(
  table_name: string,
  all_table: YaoModel.ModelDSL[]
) {
  const prefix = Studio("schema.TablePrefix");
  if (prefix.length) {
    // 获取表前缀
    const target = Studio("schema.ReplacePrefix", prefix, table_name);
    const foreign_id = target + "ID";
    const model_name = Studio("file.DotName", table_name);

    for (const i in all_table) {
      const temp_column = all_table[i]["columns"];
      for (const j in temp_column) {
        if (temp_column[j]["name"] == foreign_id) {
          all_table[i]["relations"][table_name] = {
            type: "hasOne",
            model: model_name,
            key: "id",
            foreign: foreign_id,
            query: {},
          };
        }
      }
    }
  }
  return all_table;
}
/**
 * 有表前缀的hasone
 * @param {*} table_name
 * @param {*} all_table
 * @param {*} prefix
 * @returns
 */
export function PrefixhasOneId(
  table_name: string,
  all_table: YaoModel.ModelDSL[]
) {
  const prefix = Studio("schema.TablePrefix");
  if (prefix.length) {
    // 获取表前缀
    const target = Studio("schema.ReplacePrefix", prefix, table_name);
    const foreign_id = target + "Id";
    const model_name = Studio("file.DotName", table_name);

    for (const i in all_table) {
      const temp_column = all_table[i]["columns"];
      for (const j in temp_column) {
        if (temp_column[j]["name"] == foreign_id) {
          all_table[i]["relations"][table_name] = {
            type: "hasOne",
            model: model_name,
            key: "id",
            foreign: foreign_id,
            query: {},
          };
        }
      }
    }
  }
  return all_table;
}
