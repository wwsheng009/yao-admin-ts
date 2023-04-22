import { YaoComponent, YaoField, YaoForm } from "yao-app-ts-types";

/**从数据库表中获取的字段定义 */
export type FieldColumn = YaoField.ColumnDSL & {
  /**是否下拉框 */
  is_select?: boolean;
  /**是否上传 */
  is_upload?: boolean;
  /**关联表 */
  // withs?: MapAny;
}; // & MapAny;

export interface TableDefinition {
  /**布局定义 */
  layout: {
    /**页面布局上筛选字段列表 */
    filter: {
      /**页面布局上显示字段列表 */
      columns: YaoComponent.LayoutColumns;
    };
    table: {
      /**显示字段列表 */
      columns: YaoComponent.LayoutColumns;
    };
  };
  /**字段类型定义 */
  fields: {
    /**筛选字段列表 */
    filter: {
      /**字段名称 */
      name: string;
      /**字段对应的组件定义 */
      component: FieldColumn;
    }[];
    /**表格字段列表 */
    table: {
      /**字段名称 */
      name: string;
      /**字段对应的组件定义 */
      component: FieldColumn;
    }[];
  };
}

export interface FormDefinition {
  /**布局定义 */
  layout: YaoForm.Column[];
  /**字段类型定义 */
  fields: {
    /**字段名称 */
    name: string;
    /**字段对应的组件定义 */
    component: FieldColumn;
  }[];
}
