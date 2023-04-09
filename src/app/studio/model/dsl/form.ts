import { YaoModel } from "yao-app-ts-types";
import { Studio } from "yao-node-client";

/**
 * yao studio run model.dsl.form.CreateByModels
 * 创建表格
 */
export function CreateByModels(modelDsl: YaoModel.ModelDSL[]) {
  // let fs = new FS("dsl");
  for (const i in modelDsl) {
    let tableName = Studio("model.file.SlashName", modelDsl[i].table.name);

    let formFileName = tableName + ".form.json";
    let formDsl = Studio("model.column.form.toForm", modelDsl[i], "edit"); //这里有studio js读取操作

    Studio("model.file.MoveAndWrite", "forms", formFileName, formDsl);

    let formDslView = Studio("model.column.form.toForm", modelDsl[i], "view");
    let formFileNameView = tableName + "_view.form.json";

    Studio("model.file.MoveAndWrite", "forms", formFileNameView, formDslView);
  }
}
