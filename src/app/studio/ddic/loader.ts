import {
  ddic_model_element,
  ddic_model,
  ddic_model_column,
  ddic_model_relation,
} from "./types";
import { MapAny, YaoModel } from "yao-app-ts-types";
import { FS, Process, Studio } from "yao-node-client";

export function LoadModel(modelDsls: YaoModel.ModelDSL[]) {
  modelDsls.forEach((modelDsl) => {
    let tableName: string = Studio("model.file.DotName", modelDsl.table.name);

    const { data }: { data: ddic_model } = Process(
      "models.ddic.model.Paginate",
      {
        wheres: [{ column: "table_name", value: tableName }],
        with: {},
      },
      1,
      1
    );

    let id = data?.id;

    let model: ddic_model = {
      id,
      ...data,
      // ...modelDsl,
      // ...modelDsl.option,
      // columns: modelDsl.columns,
    };
    //TODO map the columns
    model = UpdateTableFromDsl(model, modelDsl);
    id = Process("yao.form.Save", "ddic.model", model);
  });
}

export function UpdateTableFromDsl(
  model: ddic_model,
  modelDsl: YaoModel.ModelDSL
) {
  let tableName: string = Studio("model.file.DotName", modelDsl.table.name);

  model.table_name = tableName.replaceAll(".", "_");
  model.comment = modelDsl.comment;
  model.table_comment = modelDsl.table?.comment;

  let dots = tableName.split(".");
  dots.pop();
  model.name = tableName;

  model.soft_deletes = modelDsl.option?.soft_deletes ? true : false;
  model.timestamps = modelDsl.option?.timestamps ? true : false;

  model.columns = modelDsl.columns.map((item) =>
    UpdateColumnFromDsl(model, item)
  );

  //关联关系
  if (modelDsl.relations) {
    model.relations = [];
    let relations: ddic_model_relation[] = [];
    for (const key in modelDsl.relations) {
      relations.push(UpdateRelationFromDsl(key, modelDsl.relations[key]));
    }
    model.relations = relations;
  }

  return model;
}

export function UpdateColumnFromDsl(
  model: ddic_model,
  modelCol: YaoModel.ModelColumn
): ddic_model_column {
  let col = modelCol as ddic_model_column;

  //save element for column
  if (modelCol.option || modelCol.validations) {
    let element: ddic_model_element = {
      name: model.name + "_" + modelCol.name,
    };
    element.type = modelCol.type;
    element.comment = modelCol.comment;
    element.length = modelCol.length;
    element.precision = modelCol.precision;
    element.scale = modelCol.scale;

    element.options = modelCol.option?.map((item) => {
      return { label: item, value: item };
    });
    element.validations = modelCol.validations;

    //查找是否存在相同的对象
    const { data }: { data: ddic_model_element } = Process(
      "models.ddic.model.element.Paginate",
      {
        wheres: [{ column: "name", value: element.name }],
        with: {},
      },
      1,
      1
    );
    let id = data?.id;

    let data1: ddic_model_element = {
      id,
      ...element,
    };
    id = Process("models.ddic.model.element.Save", data1);

    col.element_id = id;
  }
  return col;
}

export function UpdateRelationFromDsl(
  key: string,
  rel: YaoModel.Relation
): ddic_model_relation {
  let data = rel as unknown as ddic_model_relation;

  data.name = key;
  data.model = rel.model;
  //must do this in case xgen will dump
  data.query = JSON.stringify(rel.query);
  return data;
}

/**
 * yao studio run ddic.loader.LoadModelFromFile
 */
export function LoadModelFromFile() {
  const files: string[] = Studio("model.model.GetModelFnameList");
  const fs = new FS("dsl");
  const modelDsl = files.map((file) => {
    return JSON.parse(fs.ReadFile(file));
  });
  LoadModel(modelDsl);
}

export function LoadModelSingleFromFile(model: string) {
  let table_name: string = Studio("model.file.SlashName", model);

  const file = `models/${table_name}.mod.json`;
  const fs = new FS("dsl");
  const modelDsl = [JSON.parse(fs.ReadFile(file))];
  LoadModel(modelDsl);
}

function copyObject(target: MapAny, source: MapAny) {
  if (
    typeof target !== "object" ||
    target == null || //mybe undefined
    typeof source !== "object" ||
    source == null //mybe undefined
  ) {
    return target;
  }

  for (let key in source) {
    if (typeof source[key] === "object") {
      target[key] = {};
      copyObject(source[key], target[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}
