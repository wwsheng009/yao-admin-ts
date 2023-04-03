import { YaoModel } from "yao-app-ts-types";
import { Process, Studio } from "yao-node-client";

const parents = ["parent", "parent_id", "pid"];
const children = ["children", "children_id", "child", "child_id"];
/**
 * 关联关系分析同一个表中关联关系
 * @param {*} modelName
 * @param {*} columns
 * @param {*} tableStruct
 */
export function child(
  modelName: string,
  columns: YaoModel.ModelColumn[],
  tableStruct: YaoModel.ModelDSL
): YaoModel.ModelDSL {
  const dotName = Studio("model.file.DotName", modelName);
  const childColumns = columns.filter(
    (column) => column.type === "integer" && children.includes(column.name)
  );
  if (childColumns.length > 0) {
    tableStruct.relations.children = {
      type: "hasMany",
      model: dotName,
      key: childColumns[0].name,
      foreign: "id",
      query: {},
    };
  }
  return tableStruct;
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
  const dotName = Studio("model.file.DotName", model_name);
  const parentColumn = columns.find(
    (column) => column.type === "integer" && parents.includes(column.name)
  );
  if (parentColumn) {
    table_struct.relations.parent = {
      type: "hasOne",
      model: dotName,
      key: "id",
      foreign: parentColumn.name,
      query: {},
    };
  }
  return table_struct;
}

export function other(all_table_struct: YaoModel.ModelDSL[]) {
  for (const table of all_table_struct) {
    const columns = table.columns;
    all_table_struct = hasOne(table.table.name, all_table_struct);
    for (const column of columns) {
      all_table_struct = hasMany(
        table.table.name,
        column.name,
        all_table_struct
      );
    }
  }
  return all_table_struct;
}

// yao studio run model.relation.translate member_id
export function translate(keywordsIn: string) {
  let useTranslate = Process("utils.env.Get", "USE_TRANSLATE");
  if (useTranslate !== "TRUE") {
    return keywordsIn;
  }
  // if (/_id/i.test(keywordsIn)) {
  //   console.log(`id_colume:${keywordsIn}`);
  // }

  let keywords = keywordsIn.split("_");
  let url = "https://brain.yaoapps.com/api/keyword/column";
  let response = Process(
    "xiang.network.PostJSON",
    url,
    {
      keyword: keywords,
    },
    {}
  );
  let res = keywordsIn;
  if (response.status == 200) {
    if (response.data.data) {
      res = "";
      for (let i in response.data.data) {
        res = res + response.data.data[i]["label"];
      }
    }
  }
  return res;
}

/**
 * 批量翻译
 * @param {*} keywords
 * @returns
 */
export function BatchTranslate(keywords: string) {
  let useTranslate = Process("utils.env.Get", "USE_TRANSLATE");
  if (useTranslate !== "TRUE") {
    return keywords;
  }

  // return keywords;
  let url = "https://brain.yaoapps.com/api/keyword/batch_column";
  let response = Process(
    "xiang.network.PostJSON",
    url,
    {
      keyword: keywords,
    },
    {}
  );
  if (response.status == 200) {
    if (response.data.data) {
      // console.log(response.data.data);
      return response.data.data;
    }
  }
  return keywords;
}
/**
 * Model dsl全部翻译翻译
 * @param {*} keywords
 * @returns
 */
export function BatchModel(keywords: YaoModel.ModelDSL[]): YaoModel.ModelDSL[] {
  let useTranslate = Process("utils.env.Get", "USE_TRANSLATE");
  if (useTranslate !== "TRUE") {
    return keywords;
  }
  const models = keywords;
  models.forEach((model) => {
    model.columns.forEach((col) => {
      col.label = Studio("model.relation.translate", col.label); //col.label.replace(/_id$/i, "");
      // col.name = col.name.replace(/_id$/i, "");
    });

    model.comment = Studio("model.relation.translate", model.name);
    model.table.comment = model.table.name;
    model.table.name = Studio("model.relation.translate", model.table.name);
  });
  return models;

  let url = "https://brain.yaoapps.com/api/keyword/batch_model";
  let response = Process(
    "xiang.network.PostJSON",
    url,
    {
      keyword: models,
    },
    {}
  );

  if (response.status == 200) {
    if (response.data.data) {
      // console.log(response.data.data);
      return response.data.data;
    }
  }
  return keywords;
}

export function hasOne(
  table_name: string,
  all_table: YaoModel.ModelDSL[]
): YaoModel.ModelDSL[] {
  const foreignIds = [`${table_name}_id`, `${table_name}ID`, `${table_name}Id`];
  const prefix: string[] = Studio("model.schema.TablePrefix");
  if (prefix.length) {
    foreignIds.push(
      `${Studio("model.schema.ReplacePrefix", prefix, table_name)}_id`
    );
    foreignIds.push(
      `${Studio("model.schema.ReplacePrefix", prefix, table_name)}ID`
    );
    foreignIds.push(
      `${Studio("model.schema.ReplacePrefix", prefix, table_name)}Id`
    );
  }
  const dotName: string = Studio("model.file.DotName", table_name);
  return all_table.map((table) => {
    table.columns.forEach((column) => {
      if (foreignIds.includes(column.name)) {
        table.relations[table_name] = {
          type: "hasOne",
          model: dotName,
          key: "id",
          foreign: column.name,
          query: {},
        };
      }
    });
    return table;
  });
}

export function hasMany(
  tableName: string,
  fieldName: string,
  allTables: YaoModel.ModelDSL[]
) {
  const relationSuffixes = ["_id", "_ID", "_Id"];
  const tablePrefixes: string[] = Studio("model.schema.TablePrefix");
  const dotName = Studio("model.file.DotName", tableName);

  for (const suffix of relationSuffixes) {
    for (const table of allTables) {
      if (fieldName.endsWith(suffix)) {
        const target = fieldName.replace(suffix, "");
        if (
          target === table.table.name ||
          tablePrefixes.some(
            (prefix) => `${prefix}_${target}` === table.table.name
          )
        ) {
          table.relations[tableName] = {
            type: "hasMany",
            model: dotName,
            key: fieldName,
            foreign: "id",
            query: {},
          };
        }
      }
    }
  }

  return allTables;
}