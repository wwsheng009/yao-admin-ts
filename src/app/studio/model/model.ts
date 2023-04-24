import { YaoModel } from "yao-app-ts-types";
import { FS, Studio } from "yao-node-client";

/**
 * 根据本地的模型文件创建表格与表单配置
 *
 * yao studio run model.model.CreateFromFile
 */
export function CreateFromFile() {
  const files = GetModelFnameList();
  const fs = new FS("dsl");
  const modelDsls: YaoModel.ModelDSL[] = files.map((file) => {
    return JSON.parse(fs.ReadFile(file));
  });

  // 创建表格与表单dsl
  Studio("model.dsl.form.CreateByModels", modelDsls);
  Studio("model.dsl.table.CreateByModels", modelDsls);

  // 创建菜单
  Studio("model.dsl.menu.Create", modelDsls);
  Studio("model.dsl.app.Create");
  Studio("model.dsl.login.Create");

  //生成模型ts定义
  Studio("model.ts.CreateModelTypes", "ddic");
}

/**
 * 根据模型定义创建xgen菜单配置文件
 *
 * yao studio run model.model.CreateMenuFromModels
 */
export function CreateMenuFromModels() {
  const files = GetModelFnameList();
  const fs = new FS("dsl");
  const modelDsls = files.map((file) => {
    return JSON.parse(fs.ReadFile(file));
  });

  Studio("model.dsl.menu.Create", modelDsls);
}

/**
 * 读取单个模型的定义
 *
 * yao studio run model.model.GetModel
 * @param modelName 模型名称
 * @returns 模型定义或是false
 */
export function GetModel(modelName: string): YaoModel.ModelDSL | boolean {
  const fs = new FS("dsl");
  let model_file_name = Studio("model.file.SlashName", modelName);
  const fname = "models/" + model_file_name + ".mod.json";
  if (!fs.Exists(fname)) {
    return false;
  }
  const data = JSON.parse(fs.ReadFile(fname));
  return data;
}
/**
 * 读取所有的模型文件列表
 *
 * yao studio run model.model.GetModelFnameList
 * @returns model file list
 */
export function GetModelFnameList(): string[] {
  const fs = new FS("dsl");
  const files: string[] = fs.ReadDir("models/", true);

  return files.filter((file) => !fs.IsDir(file) && file.endsWith(".mod.json"));
}

/**
 * 从模型定义DSL文件中获取模型定义
 *
 * yao studio run model.model.GetModelsFromFile
 * @returns all models from files
 */
export function GetModelsFromFile(): YaoModel.ModelDSL[] {
  const files: string[] = GetModelFnameList();
  const fs = new FS("dsl");
  return files.map((file) => {
    return JSON.parse(fs.ReadFile(file));
  });
}

/**
 * 创建单个模型对应的Table/Form
 *
 * yao studio run model.model.CreateOne model
 * @param modelName 模型名称
 */
export function CreateOne(modelName: string) {
  let model_file_name = Studio("model.file.SlashName", modelName);

  const fs = new FS("dsl");
  let modelDsls: YaoModel.ModelDSL[] = [];

  modelDsls.push(
    JSON.parse(fs.ReadFile("models/" + model_file_name + ".mod.json"))
  );
  // 创建表格dsl
  Studio("model.dsl.form.CreateByModels", modelDsls);
  Studio("model.dsl.table.CreateByModels", modelDsls);
  console.log(`处理完成：${modelName}`);
  return `处理完成：${modelName}`;
}
/**
 * Create List DSL By Model Name
 *
 * yao studio run model.model.CreateList
 * @param modelName model name
 */
export function CreateList(modelName: string) {
  const model = GetModel(modelName);
  if (model) {
    Studio("model.dsl.list.CreateByModel", model as YaoModel.ModelDSL);
    console.log(`处理完成：${modelName}`);
  } else {
    console.log("读取模型失败" + modelName);
  }
}
