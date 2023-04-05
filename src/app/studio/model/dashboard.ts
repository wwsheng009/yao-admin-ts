import { YaoChart, YaoComponent, YaoMenu } from "yao-app-ts-types";
import { FS, Query, Studio } from "yao-node-client";

/**
 * 根据菜单创建图表
 * @param menu_arr 菜单列表
 * @param type 类型，1是二级菜单，2是一级菜单
 */
export function Create(menu_arr: YaoMenu.MenuItem[], type: number) {
  // const fs = new FS("dsl");

  // Studio("model.move.Move", "charts", "dashboard.chart.json");
  let dsl = ChartDsl(menu_arr);
  //console.log(`create dashboard:/charts/dashboard.chart.json"`);
  // fs.WriteFile("/charts/" + "dashboard.chart.json", JSON.stringify(dsl));

  Studio("model.file.MoveAndWrite", "charts", "dashboard.chart.json", dsl);
}
/**
 * 根据菜单创建图表
 * @param menu_arr 菜单列表
 * @returns
 */
export function ChartDsl(menu_arr: YaoMenu.MenuItem[]) {
  let dsl: YaoChart.ChartDSL = {
    name: "数据图表",
    action: {
      data: { process: "scripts.dashboard.Data", default: ["2023-03-27"] },
    },
    layout: {
      operation: {
        actions: [],
      },
      filter: {},
      chart: {
        columns: [],
      },
    },
    fields: {
      filter: {},
      chart: {},
    },
  };
  let chart: { [key: string]: any } = {
    表格数量: {
      bind: "table_count",
      view: { type: "Number", props: { unit: "个" } },
    },
    模型数量: {
      bind: "model_count",
      view: { type: "Number", props: { unit: "个" } },
    },
  };
  let columns: YaoComponent.LayoutColumnDSL[] = [
    { name: "表格数量", width: 12 },
    { name: "模型数量", width: 12 },
  ];
  let script: { [key: string]: any } = {
    table_count: 0,
    model_count: 0,
  };

  script.table_count = menu_arr.length;
  script.model_count = script.table_count;

  menu_arr.forEach((col) => {
    if (col.id != 1) {
      const dotName = Studio("model.file.DotName", col.extra);
      const title = dotName + "记录数";
      // if (col.name != col.model) {
      //   title = col.name + "(" + dotName + ")" + "记录数";
      // }
      script[col.extra] = GetCount(col.extra);
      chart[title] = {
        bind: col.extra,
        link: "/x/Table/" + dotName,
        view: { type: "Number", props: { unit: "条" } },
      };
      columns.push({ name: title, width: 6 });
    }
  });

  dsl.layout.chart.columns = columns;
  dsl.fields.chart = chart;
  WriteScript(script);
  return dsl;
}
export function WriteScript(datai: object) {
  let data = JSON.stringify(datai);

  // let sc = new FS("script");
  let scripts = `function Data() {
    return ${data}
  }`;
  Studio("model.file.WriteScript", "dashboard.js", scripts);

  // sc.WriteFile("/dashboard.js", scripts);
}

export function GetCount(model: string) {
  try {
    let query = new Query();
    let res = query.Get({
      select: [":COUNT(id) as 数量"],
      from: model,
    });
    if (res && res.length && res[0]["数量"] > 0) {
      return res[0]["数量"];
    }
  } catch (e) {
    return 0;
  }

  return 0;
}
