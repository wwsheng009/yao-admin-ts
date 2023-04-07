import { XgenForm, MapAny, XgenCommon } from "yao-app-ts-types";
import { Process } from "yao-node-client";

interface OnChangeEvent {
  key: string;
  value: any;
  params: MapAny;
  isOnload: MapAny | undefined;
}
export function onChange(query: OnChangeEvent): {
  data?: MapAny;
  setting?: XgenForm.Setting;
} {
  const { key, value, params, isOnload } = query;

  let setting: XgenForm.Setting = Process("yao.form.Setting", "ddic.element"); // 根据新数值生成配置信息;

  if (key === "type" && value === "enum") {
    setting.form.sections[0].columns = setting.form.sections[0].columns.filter(
      (item: XgenCommon.BaseColumn) => {
        return ["描述", "数据类型", "可选项"].includes(item.name);
      }
    );
  }
  return { setting };
}
