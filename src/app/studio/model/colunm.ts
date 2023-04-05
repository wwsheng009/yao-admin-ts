import { Studio } from "yao-node-client";
import { YaoForm, YaoList, YaoModel, YaoTable } from "yao-app-ts-types";
import { FormDefinition, TableDefinition } from "../types";

export function toList(modelDsl: YaoModel.ModelDSL) {
  const copiedObject: YaoModel.ModelColumn[] = JSON.parse(
    JSON.stringify(modelDsl.columns)
  );

  let columns = copiedObject || [];

  const table_dot_name = Studio("model.file.DotName", modelDsl.table.name);

  let listTemplate: YaoList.ListDSL = {
    name: modelDsl.name || "列表",
    action: {
      bind: {
        table: table_dot_name,
      },
    },
    layout: {
      list: {
        columns: [],
      },
    },
    fields: {
      list: {},
    },
  };

  //并不知道谁会调用列表，
  //不要显示外部关联ID
  // columns = columns.filter((col) => !/_id$/i.test(col.name));

  columns = MakeColumnOrder(columns);

  columns.forEach((column) => {
    let form: false | FormDefinition = Studio(
      "model.column.list.Cast",
      column,
      modelDsl
    );
    if (form) {
      form.layout.forEach((tc) => {
        listTemplate.layout.list.columns.push(tc);
      });
      form.fields.forEach((c) => {
        // delete c.component.withs;
        listTemplate.fields.list[c.name] = c.component;
      });
    }
  });
  // listTemplate.action.bind.option.withs = Studio("model.relation.GetWiths", modelDsl);
  return listTemplate;
}

//create table from model
export function toTable(modelDsl: YaoModel.ModelDSL) {
  const copiedObject: YaoModel.ModelColumn[] = JSON.parse(
    JSON.stringify(modelDsl.columns)
  );

  let columns = copiedObject || [];

  const table_dot_name = Studio("model.file.DotName", modelDsl.table.name);

  let tableTemplate: YaoTable.TableDSL = {
    name: modelDsl.name || "表格",
    action: {
      bind: {
        model: table_dot_name,
        option: { withs: {}, option: { form: table_dot_name } },
      },
    },
    layout: {
      primary: "id",
      header: { preset: {}, actions: [] },
      filter: {
        columns: [],
        actions: [
          {
            title: "添加",
            icon: "icon-plus",
            width: 3,
            action: [
              {
                name: "OpenModal",
                type: "Common.openModal",
                payload: {
                  Form: { type: "edit", model: table_dot_name },
                },
              },
            ],
          },
        ],
      },
      table: {
        columns: [],
        operation: {
          fold: false,
          actions: [
            {
              title: "查看",
              icon: "icon-eye",
              action: [
                {
                  payload: {
                    Form: {
                      model: table_dot_name,
                      type: "view",
                    },
                  },
                  name: "OpenModal",
                  type: "Common.openModal",
                },
              ],
            },
            {
              title: "编辑",
              icon: "icon-edit-2",
              action: [
                {
                  name: "OpenModal",
                  type: "Common.openModal",
                  payload: {
                    Form: {
                      type: "edit",
                      model: table_dot_name,
                    },
                  },
                },
              ],
            },
            {
              title: "删除",
              icon: "icon-trash-2",
              action: [
                {
                  name: "Confirm",
                  type: "Common.confirm",
                  payload: {
                    title: "确认删除",
                    content: "删除后不可撤销！",
                  },
                },
                {
                  name: "Delete",
                  type: "Table.delete",
                  payload: {
                    model: table_dot_name,
                  },
                },
              ],
            },
          ],
        },
      },
    },
    fields: {
      filter: {},
      table: {},
    },
  };
  columns = MakeColumnOrder(columns);

  columns.forEach((column) => {
    let table: false | TableDefinition = Studio(
      "model.column.table.Cast",
      column,
      modelDsl
    );
    if (table) {
      table.layout.table.columns.forEach((tc) => {
        tableTemplate.layout.table.columns.push(tc);
      });
      table.fields.table.forEach((c) => {
        // let cop = c.component.withs || [];
        // cop.forEach((fct: { name: string }) => {
        //   tableTemplate.action.bind.option.withs[fct.name] = {};
        // });
        // delete c.component.withs;
        tableTemplate.fields.table[c.name] = c.component;
      });

      table.fields.filter.forEach((ff) => {
        tableTemplate.layout.filter.columns.push({ name: ff.name, width: 4 });
        tableTemplate.fields.filter[ff.name] = ff.component;
      });
    }
  });
  tableTemplate.action.bind.option.withs = Studio(
    "model.relation.GetWiths",
    modelDsl
  );
  return tableTemplate;
}

export function toForm(modelDsl: YaoModel.ModelDSL) {
  const copiedObject: YaoModel.ModelColumn[] = JSON.parse(
    JSON.stringify(modelDsl.columns)
  );
  let columns = copiedObject || [];

  const table_dot_name = Studio("model.file.DotName", modelDsl.table.name);

  const actions = [
    {
      title: "重新生成代码",
      icon: "icon-layers",
      showWhenAdd: true,
      showWhenView: true,
      action: [
        {
          name: "StudioModel",
          type: "Studio.model",
          payload: { method: "CreateOne", args: [table_dot_name] },
        },
        {
          name: "Confirm",
          type: "Common.confirm",
          payload: {
            title: "提示",
            content: "处理完成",
          },
        },
      ],
    },
    {
      title: "返回",
      icon: "icon-arrow-left",
      showWhenAdd: true,
      showWhenView: true,
      action: [
        {
          name: "CloseModal",
          type: "Common.closeModal",
          payload: {},
        },
      ],
    },
    {
      title: "保存",
      icon: "icon-check",
      style: "primary",
      showWhenAdd: true,
      action: [
        {
          name: "Submit",
          type: "Form.submit",
          payload: {},
        },
        {
          name: "Back",
          type: "Common.closeModal",
          payload: {},
        },
      ],
    },
    {
      icon: "icon-trash-2",
      style: "danger",
      title: "Delete",
      action: [
        {
          name: "Confirm",
          type: "Common.confirm",
          payload: {
            title: "提示",
            content: "确认删除，删除后数据无法恢复？",
          },
        },
        {
          name: "Delete",
          payload: {
            model: table_dot_name,
          },
          type: "Form.delete",
        },
        {
          name: "Back",
          type: "Common.closeModal",
          payload: {},
        },
      ],
    },
  ];

  let tableTemplate: YaoForm.FormDSL = {
    name: modelDsl.name || "表单",
    action: {
      bind: {
        model: table_dot_name,
        option: { withs: {} },
      },
    },
    layout: {
      primary: "id",
      actions,
      form: {
        props: {},
        sections: [
          {
            columns: [],
          },
        ],
      },
    },
    fields: {
      form: {},
    },
  };
  columns = MakeColumnOrder(columns);
  columns.forEach((column) => {
    let form: false | FormDefinition = Studio(
      "model.column.form.Cast",
      column,
      modelDsl
    );
    if (form) {
      // col.layout.filter.columns.forEach((fc) => {});
      form.layout.forEach((tc) => {
        tableTemplate.layout.form.sections[0].columns.push(tc);
      });
      form.fields.forEach((ft) => {
        // let cop = ft.component.withs || [];
        // cop.forEach((fct: { name: string | number }) => {
        //   tableTemplate.action.bind.option.withs[fct.name] = {};
        // });
        // delete ft.component.withs;
        tableTemplate.fields.form[ft.name] = ft.component;
      });
      // col.fields.filter.forEach((ff) => {});
    }
  });
  tableTemplate.action.bind.option.withs = Studio(
    "model.relation.GetWiths",
    modelDsl
  );

  tableTemplate = Studio("model.relation.List", tableTemplate, modelDsl);
  return tableTemplate;
}

export function MakeColumnOrder(columns: YaoModel.ModelColumn[]) {
  const typeMapping = Studio("model.column.component.GetTypes");

  let columns1: YaoModel.ModelColumn[] = [];
  let columns2: YaoModel.ModelColumn[] = [];
  columns.forEach((column) => {
    if (
      ["TextArea"].includes(typeMapping[column.type]) ||
      column.type === "json"
    ) {
      columns2.push(column);
    } else {
      columns1.push(column);
    }
  });
  return columns1.concat(columns2);
}
