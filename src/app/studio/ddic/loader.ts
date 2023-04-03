import { ddic_model, ddic_model_column, ddic_model_relation } from "./types";
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
  model.model_comment = modelDsl.comment;
  model.table_comment = modelDsl.table?.comment;

  let dots = tableName.split(".");
  dots.pop();
  model.namespace = dots.join(".");
  model.name = tableName;

  model.soft_deletes = modelDsl.option?.soft_deletes ? true : false;
  model.timestamps = modelDsl.option?.timestamps ? true : false;

  model.columns = modelDsl.columns.map((item) => UpdateColumnFromDsl(item));

  if (modelDsl.relations) {
    model.relations = "";
  }
  let relations: ddic_model_relation[] = [];
  for (const key in modelDsl.relations) {
    relations.push(UpdateRelationFromDsl(key, modelDsl.relations[key]));
  }
  model.relations = JSON.stringify(relations);
  return model;
}

export function UpdateColumnFromDsl(
  modeCol: YaoModel.ModelColumn
): ddic_model_column {
  return modeCol as unknown as ddic_model_column;
}
export function UpdateRelationFromDsl(
  key: string,
  rel: YaoModel.Relation
): ddic_model_relation {
  let data = rel as unknown as ddic_model_relation;

  data.name = key;

  return data;
}

/**
 * yao studio run ddic.loader.LoadModelFromFile
 */
export function LoadModelFromFile() {
  const files: string[] = Studio("model.cmd.GetModelFnameList");
  const fs = new FS("dsl");
  const modelDsl = files.map((file) => {
    return JSON.parse(fs.ReadFile("models/" + file));
  });
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
