import { YaoModel } from "yao-app-ts-types";
import { Studio } from "yao-node-client";

export function hasMany(
  table_name: string,
  field_name: string,
  all_table: YaoModel.ModelDSL[]
) {
  const relation = [
    "hasMany_id",
    "hasMany_ID",
    "hasMany_Id",
    "PerfixhasMany_id",
    "PerfixhasMany_ID",
    "PerfixhasMany_Id",
  ];
  for (const i in relation) {
    all_table = Studio(
      "hasmany." + relation[i],
      table_name,
      field_name,
      all_table
    );
  }
  return all_table;
}
export function hasMany_id(
  table_name: string,
  field_name: string,
  all_table: YaoModel.ModelDSL[]
) {
  // 判断hasMany
  // 如果包含下划线+id,说明他有可能是别的表的外键
  if (field_name.indexOf("_id") != -1) {
    const dotName = Studio("file.DotName", table_name);

    for (const i in all_table) {
      const target = field_name.replace("_id", "");

      if (target == all_table[i]["table"]["name"]) {
        all_table[i]["relations"][table_name] = {
          type: "hasMany",
          model: dotName,
          key: field_name,
          foreign: "id",
          query: {},
        };
      }
    }
  }
  return all_table;
}
export function hasMany_ID(
  table_name: string,
  field_name: string,
  all_table: YaoModel.ModelDSL[]
) {
  // 判断hasMany
  // 如果包含下划线+id,说明他有可能是别的表的外键
  if (field_name.indexOf("ID") != -1) {
    const dotName = Studio("file.DotName", table_name);

    for (const i in all_table) {
      const target = field_name.replace("ID", "");

      if (target == all_table[i]["table"]["name"]) {
        all_table[i]["relations"][table_name] = {
          type: "hasMany",
          model: dotName,
          key: field_name,
          foreign: "id",
          query: {},
        };
      }
    }
  }
  return all_table;
}
export function hasMany_Id(
  table_name: string,
  field_name: string,
  all_table: YaoModel.ModelDSL[]
) {
  // 判断hasMany
  // 如果包含下划线+id,说明他有可能是别的表的外键
  if (field_name.indexOf("Id") != -1) {
    const dotName = Studio("file.DotName", table_name);

    for (const i in all_table) {
      const target = field_name.replace("Id", "");

      if (target == all_table[i]["table"]["name"]) {
        all_table[i]["relations"][table_name] = {
          type: "hasMany",
          model: dotName,
          key: field_name,
          foreign: "id",
          query: {},
        };
      }
    }
  }
  return all_table;
}
export function PerfixhasMany_id(
  table_name: string,
  field_name: string,
  all_table: YaoModel.ModelDSL[]
) {
  // 判断hasMany
  // 如果包含下划线+id,说明他有可能是别的表的外键

  if (field_name.indexOf("_id") != -1) {
    const prefix = Studio("schema.TablePrefix");
    const dotName = Studio("file.DotName", table_name);

    for (const i in all_table) {
      for (const j in prefix) {
        const target = prefix[j] + "_" + field_name.replace("_id", "");
        if (target == all_table[i]["table"]["name"]) {
          all_table[i]["relations"][table_name] = {
            type: "hasMany",
            model: dotName,
            key: field_name,
            foreign: "id",
            query: {},
          };
        }
      }
    }
  }
  return all_table;
}

export function PerfixhasMany_ID(
  table_name: string,
  field_name: string,
  all_table: YaoModel.ModelDSL[]
) {
  // 判断hasMany
  // 如果包含下划线+id,说明他有可能是别的表的外键

  if (field_name.indexOf("ID") != -1) {
    const prefix = Studio("schema.TablePrefix");
    const dotName = Studio("file.DotName", table_name);

    for (const i in all_table) {
      for (const j in prefix) {
        const target = prefix[j] + "_" + field_name.replace("ID", "");
        if (target == all_table[i]["table"]["name"]) {
          all_table[i]["relations"][table_name] = {
            type: "hasMany",
            model: dotName,
            key: field_name,
            foreign: "id",
            query: {},
          };
        }
      }
    }
  }
  return all_table;
}
export function PerfixhasMany_Id(
  table_name: string,
  field_name: string,
  all_table: YaoModel.ModelDSL[]
) {
  // 判断hasMany
  // 如果包含下划线+id,说明他有可能是别的表的外键

  if (field_name.indexOf("Id") != -1) {
    const prefix = Studio("schema.TablePrefix");
    const dotName = Studio("file.DotName", table_name);

    for (const i in all_table) {
      for (const j in prefix) {
        const target = prefix[j] + "_" + field_name.replace("Id", "");
        if (target == all_table[i]["table"]["name"]) {
          all_table[i]["relations"][table_name] = {
            type: "hasMany",
            model: dotName,
            key: field_name,
            foreign: "id",
            query: {},
          };
        }
      }
    }
  }
  return all_table;
}
