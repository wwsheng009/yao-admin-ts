//yao studio run model.Create

import { FS, Studio } from "yao-node-client";

/**
 * 创建模型
 */
export function Create() {
  console.log(Date.now() / 1000);
  const model_dsl = CreateModels();
  console.log(Date.now() / 1000);
  // 创建表格dsl
  Studio("table.Create", model_dsl);
  version10_0_3();
  login();
  // 创建菜单
  Studio("menu.Create", model_dsl);
  console.log(Date.now() / 1000);
}

/**
 * yao studio run model.CreateModels
 * @returns
 */
export function CreateModels() {
  const model_dsl = Studio("schema.Relation");
  const fs = new FS("dsl");
  for (const i in model_dsl) {
    let table_name = Studio("file.SlashName", model_dsl[i]["table"]["name"]);
    const table_file_name = table_name + ".mod.json";
    const table = JSON.stringify(model_dsl[i]);
    Studio("move.Move", "models", table_file_name);
    console.log(`create model:/models/"${table_file_name}.mod.json`);
    fs.WriteFile("/models/" + table_file_name, table);
  }
  return model_dsl;
}
//创建单个表格的studio
///yao studio run model.CreateOne address
export function CreateOne(model_name: string) {
  let model_file_name = Studio("file.SlashName", model_name);
  console.log("进入studio");
  // console.log(model_name);
  const fs = new FS("dsl");
  let model_dsl = [];

  model_dsl.push(
    JSON.parse(fs.ReadFile("models/" + model_file_name + ".mod.json"))
  );

  // for (const i in model_dsl) {
  //   let model_name = Studio("file.SlashName", model_dsl[i]["table"]["name"]);
  //   let model_file_name = model_name + ".mod.json";
  //   let model = JSON.stringify(model_dsl[i]);
  //   Studio("move.Move", "models", model_file_name);
  //   fs.WriteFile("/models/" + model_file_name, model);
  // }

  // 创建表格dsl
  Studio("table.Create", model_dsl);
  //version10_0_2();
  //login();
}

/**
 * 写入10.3版本的
 */
export function version10_0_3() {
  const fs = new FS("dsl");

  fs.WriteFile(
    "app.json",
    JSON.stringify({
      xgen: "1.0",
      name: "::Demo Application",
      short: "::Demo",
      description: "::Another yao application",
      version: "0.10.3",
      menu: {
        process: "flows.app.menu",
        args: ["demo"],
      },
      setup: "studio.model.Create",
      adminRoot: "yao",
      optional: {
        hideNotification: true,
        hideSetting: false,
      },
    })
  );
}
export function login() {
  const fs = new FS("dsl");
  // const menu = Process("models.xiang.menu.get", {
  //   limit: 1,
  // });
  const table_name = "admin.login.json";
  const table = JSON.stringify({
    name: "::Admin Login",
    action: {
      process: "yao.login.Admin",
      args: [":payload"],
    },
    layout: {
      entry: "/x/Chart/dashboard",
      // captcha: "yao.utils.Captcha",
      //cover: "/assets/images/login/cover.svg",
      slogan: "::Make Your Dream With Yao App Engine",
      site: "https://yaoapps.com?from=yao-admin",
    },
  });
  Studio("move.Move", "logins", table_name);
  fs.WriteFile("/logins/" + table_name, table);
}
