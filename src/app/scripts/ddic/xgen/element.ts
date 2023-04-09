import { XgenForm, MapAny, XgenCommon } from "yao-app-ts-types";
import { Process } from "yao-node-client";

interface OnChangeEvent {
  key: string;
  value: any;
  params?: MapAny;
  isOnload?: MapAny | undefined;
}
/**
 * xgen form field onchange event
 * yao run scripts.ddic.xgen.element.onChange '::{"key":"type","value":"enum"}'
 * 根据界面的字段类型的值，更新界面配置
 * @param query 字段新旧值
 * @returns 新值与界面配置
 */
export function onChange(query: OnChangeEvent): {
  data?: MapAny;
  setting?: XgenForm.Setting;
} {
  const { key, value, params, isOnload } = query;

  let setting: XgenForm.Setting = Process(
    "yao.form.Setting",
    "ddic.model.element"
  ); // 根据新数值生成配置信息;

  if (key === "type") {
    if (value === "enum") {
      setting.form.sections = filterColumns(
        ["描述", "数据类型", "可选项", "备注"],
        setting.form.sections
      );
    } else if (value === "string") {
      setting.form.sections = filterColumns(
        ["描述", "数据类型", "备注", "校验规则"],
        setting.form.sections
      );
    } else if (value === "test") {
      setting.form.sections = filterColumns(["可选项"], setting.form.sections);
    }
  }
  return { setting };
}

/**
 * 根据字段名称列表筛选界面显示控件
 * @param fields 需要包含的字段列表
 * @param sections 配置节点
 * @returns 新配置节点
 */
function filterColumns(fields: string[], sections: XgenForm.Section[]) {
  if (!sections || !sections.length || !fields || !fields.length) {
    return sections;
  }

  let newSecs: XgenForm.Section[] = [];
  sections.forEach((sec) => {
    let cols = [] as XgenForm.Column[];

    sec.columns.forEach((col: XgenForm.Column) => {
      //check tabs first
      if (col.hasOwnProperty("tabs")) {
        let tab = col as XgenForm.RawTab;

        tab.tabs = filterColumns(fields, tab.tabs);
        if (tab.tabs?.length) {
          cols.push(tab);
        }
      } else {
        let baseCol = col as XgenCommon.BaseColumn;
        if (fields.includes(baseCol.name)) {
          cols.push(baseCol);
        }
      }
    });
    if (cols.length) {
      //don't forget the title for tabs
      newSecs.push({ columns: cols, title: sec.title });
    }
  });
  return newSecs;
}
