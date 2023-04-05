import { YaoModel } from "yao-app-ts-types";
import { Studio } from "yao-node-client";
import { FormDefinition, FieldColumn } from "../../types";

/**
 *根据模型定义生成Form定义
 * yao studio run model.column.list.Cast
 * @param column 模型列定义
 * @param modelDsl 模型定义
 * @param type 类型
 * @returns
 */
export function Cast(
  column: YaoModel.ModelColumn,
  modelDsl: YaoModel.ModelDSL
): false | FormDefinition {
  const types = Studio("model.column.component.GetTypes");

  const title = column.label || column.name;
  const name = column.name;

  if (!name) {
    //log.Error("castFormColumn: missing name");
    return false;
  }

  if (!title) {
    // log.Error("castFormColumn: missing title");
    return false;
  }

  // 不展示隐藏列
  const hidden = Studio("model.column.component.HiddenFields", false);
  if (hidden.indexOf(name) != -1) {
    return false;
  }

  let res: FormDefinition = {
    layout: [],
    fields: [],
  };

  let component: FieldColumn = {
    bind: name,
    edit: {
      type: "Input",
      props: {},
    },
  };

  let width = 8;

  const bind = name;
  if (column.type == "json") {
    component = Studio("model.column.file.IsFormFile", column, null, modelDsl);
    if (!component) {
      component = {
        bind: bind,
        edit: {
          type: "TextArea",
        },
      };
    }
  } else if (column.type == "enum") {
    component = {
      bind: bind,
      edit: {
        props: {
          options: Studio("model.column.component.Enum", column["option"]),
          placeholder: "请选择" + title,
        },
        type: "Select",
      },
    };
  } else if (column.type === "boolean") {
    const ismysql: boolean = Studio("model.utils.IsMysql");

    let checkedValue: boolean | number = true;
    let unCheckedValue: boolean | number = false;

    if (ismysql) {
      checkedValue = 1;
      unCheckedValue = 0;
    }
    component = {
      bind: bind,
      edit: {
        type: "RadioGroup", //RadioGroup是单选项，CheckboxGroup是多选项
        props: {
          options: [
            {
              label: "是",
              value: checkedValue,
            },
            {
              label: "否",
              value: unCheckedValue,
            },
          ],
        },
      },
    };
  } else if (/color/i.test(column.name)) {
    component.edit.type = "ColorPicker";
  } else if (column.crypt === "PASSWORD") {
    component.edit.type = "Password";
  } else {
    if (column.type in types) {
      component.edit.type = types[column.type];
    }
  }

  if (["TextArea"].includes(types[column.type]) || column.type === "json") {
    width = 24;
  }
  component = Studio("model.relation.EditSelect", column, modelDsl, component);

  // component = Studio(
  //   "model.column.file.IsFormFile",
  //   column,
  //   component,
  //   modelDsl
  // );

  if (component.is_image) {
    width = 24;
  }

  res.layout.push({
    name: title,
    width: width,
  });

  delete component.is_image;
  component = Studio("model.column.component.EditPropes", component, column);
  if (column.name === "validations") {
    console.log("validations");
  }

  component = updateListCompFromModelXgen(component, column, modelDsl);

  res.fields.push({
    name: title,
    component: component,
  });

  return res;
}

function updateListCompFromModelXgen(
  component: FieldColumn,
  column: YaoModel.ModelColumn,
  modelDsl: YaoModel.ModelDSL
) {
  return Studio(
    "model.column.component.ModelXgen",
    component,
    column,
    modelDsl,
    "list"
  );
}
