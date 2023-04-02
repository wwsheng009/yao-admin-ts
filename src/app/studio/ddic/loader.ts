import { ddic_model } from "./types";
import { YaoModel } from "yao-app-ts-types";
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
    model.table_name = tableName;
    model.model_comment = modelDsl.comment;
    model.table_comment = modelDsl.table?.comment;

    id = Process("yao.form.Save", "ddic.model", model);
  });
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
