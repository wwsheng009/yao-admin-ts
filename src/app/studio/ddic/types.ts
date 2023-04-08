/**
 * Model=> ddic.domain (::Domain)
 *
 * Table=> ddic_domain (域)
 */
export interface ddic_domain {
  /**标识 */
  id?: number;
  /**undefined */
  name: string;
  /**数据类型定义 */
  type?: string;
  /**字段长度，对string等类型字段有效 */
  length?: number;
  /**字段位数(含小数位)，对float、decimal等类型字段有效 */
  precision?: number;
  /**字段小数位位数，对float、decimal等类型字段有效 */
  scale?: number;
  /**字段的可选项，对enum类型字段有效 */
  options?: string;
}

/**
 * Model=> ddic.element (::Data Element)
 *
 * Table=> ddic_element (数据元素)
 */
export interface ddic_element {
  /**标识 */
  id?: number;
  /**undefined */
  name: string;
  /**数据类型定义 */
  type?: string;
  /**字段长度，对文本类型字段有效 */
  length?: number;
  /**位数(含小数位)，对float、decimal类型字段有效 */
  precision?: number;
  /**字段小数位位数，对float、decimal类型字段有效 */
  scale?: number;
  /**字段的可选项，对enum类型字段有效 */
  options?: any[];
  /**字段校验规则 */
  validations?: any[];
}

/**
 * Model=> ddic.form.action (::Form Action)
 *
 * Table=> ddic_form_action (表单动作)
 */
export interface ddic_form_action {
  /**表名 */
  id?: number;
  /**字段所属的表单 */
  form_id: number;
  /**标题 */
  title: string;
  /**图标 */
  icon: string;
  /**按钮样式 */
  style: string;
  /**表单修改数据时显示 */
  showWhenAdd?: boolean;
  /**表单修改数据时显示 */
  showWhenView?: boolean;
  /**Action列表 */
  action: string;
  /** Relation: form=> ddic.form */
  form?: ddic_form;
}

/**
 * Model=> ddic.form.field (::Form Field)
 *
 * Table=> ddic_form_field (表单字段列表)
 */
export interface ddic_form_field {
  /**表名 */
  id?: number;
  /**字段所属的表单 */
  form_id: number;
  /**字段名称 */
  name: string;
  /**绑定的模型字段 */
  bind: string;
  /**编辑控件类型 */
  edit_type: string;
  /**编辑控件属性 */
  edit_props: string;
  /**查看控件类型 */
  view_type: string;
  /**查看控件属性 */
  view_props: string;
  /**字段介绍 */
  description: string;
  /**字段显示长度 */
  width: number;
  /**字段是否是否必输 */
  required?: boolean;
  /**字段许可值 */
  option: string;
  /**启用 */
  enable?: boolean;
  /**字段默认值 */
  default: string;
  /**是否显示 */
  is_dispaly?: boolean;
  /** Relation: form=> ddic.form */
  form?: ddic_form;
}

/**
 * Model=> ddic.form (::Form)
 *
 * Table=> ddic_form (表单定义)
 */
export interface ddic_form {
  /**标识 */
  id?: number;
  /**undefined */
  name: string;
  /**显示主键 */
  primary?: string;
  /**表单关联的模型 */
  model_id: number;
  /**表单关联的表格 */
  table_id?: number;
  /**绑定模型选项 */
  bind_option: string;
  /**表注释 */
  comment: string;
  /** Relation: fields=> ddic.form.field */
  fields?: ddic_form_field[];
  /** Relation: model=> ddic.model */
  model?: ddic_model;
  /** Relation: table=> ddic.table */
  table?: ddic_table;
}

/**
 * Model=> ddic.model.column.type (::Model Column Type)
 *
 * Table=> ddic_model_column_type (模型数据类型)
 */
export interface ddic_model_column_type {
  /**标识 */
  id?: number;
  /**undefined */
  type: string;
  /**undefined */
  name: string;
  /**注释 */
  comment?: string;
}

/**
 * Model=> ddic.model.column (::Model Column)
 *
 * Table=> ddic_model_column (模型字段列表)
 */
export interface ddic_model_column {
  /**标识 */
  id?: number;
  /**字段所属的模型 */
  model_id: number;
  /**数据库表的字段名name */
  name: string;
  /**字段显示名称label，用于在管理表单，开发平台等成场景下呈现 */
  label: string;
  /**字段是否为索引index，默认为 false */
  index?: boolean;
  /**字段是否为唯一索引unique，默认为 false , 如为 true 无需同时将 `index` 设置为 true */
  unique?: boolean;
  /**数据元素ID，element_id */
  element_id?: number;
  /**数据类型定义type */
  type?: string;
  /**字段长度length，对 `string` 等类型字段有效 */
  length?: number;
  /**字段位数(含小数位)precision，对 `float`、`decimal` 等类型字段有效 */
  precision?: number;
  /**字段小数位位数scale，对 `float`、`decimal` 等类型字段有效 */
  scale?: number;
  /**是否允许空值nullable，默认为 false */
  nullable?: boolean;
  /**字段加密存储方式。许可值 `AES(MySQL Only)`, `PASSWORD` */
  crypt?: "PASSWORD" | "AES";
  /**string|number|float|字段默认值default */
  default?: string;
  /**注释，comment */
  comment?: string;
  /** Relation: element=> ddic.element */
  element?: ddic_element;
  /** Relation: model=> ddic.model */
  model?: ddic_model;
}

/**
 * Model=> ddic.model.relation (::Model Relation)
 *
 * Table=> ddic_model_relation (模型关联关系)
 */
export interface ddic_model_relation {
  /**表名 */
  id?: number;
  /**定义关系名称 */
  name: string;
  /**关系描述 */
  label: string;
  /**与当前数据模型的关系类型. `hasOne` 一对一, `hasMany` 一对多。 */
  type: "hasOne" | "hasMany";
  /**关联的模型 */
  model: string;
  /**外键 */
  foreign: string;
  /**关联模型主键 */
  key: string;
  /**关联条件 */
  query?: string;
}

/**
 * Model=> ddic.model (::Model)
 *
 * Table=> ddic_model (业务模型)
 */
export interface ddic_model {
  /**表名 */
  id?: number;
  /**undefined */
  name: string;
  /**模型定义注释 */
  comment?: string;
  /**undefined */
  table_name?: string;
  /**对应数据表中字段注释 */
  table_comment?: string;
  /**软删除，不直接删除 */
  soft_deletes?: boolean;
  /**增加创建，更新时间戳timestamps */
  timestamps?: boolean;
  /**关联关系 */
  relations?: ddic_model_relation[];
  /** Relation: columns=> ddic.model.column */
  columns?: ddic_model_column[];
}

/**
 * Model=> ddic.table.action (::Table Action)
 *
 * Table=> ddic_table_action (表格动作)
 */
export interface ddic_table_action {
  /**表名 */
  id?: number;
  /**字段所属的表格 */
  table_id: number;
  /**标题 */
  title: string;
  /**图标 */
  icon: string;
  /**按钮样式 */
  style: string;
  /**表单修改数据时显示 */
  showWhenAdd?: boolean;
  /**表单修改数据时显示 */
  showWhenView?: boolean;
  /**Action列表 */
  action: string;
  /** Relation: form=> ddic.form */
  form?: ddic_form;
}

/**
 * Model=> ddic.table.field (::Table Field)
 *
 * Table=> ddic_table_field (表格字段列表)
 */
export interface ddic_table_field {
  /**表名 */
  id?: number;
  /**字段所属的表格 */
  table_id: number;
  /**字段名称 */
  name: string;
  /**绑定的模型字段 */
  bind: string;
  /**编辑控件类型 */
  edit_type: string;
  /**编辑控件属性 */
  edit_props: string;
  /**查看控件类型 */
  view_type: string;
  /**查看控件属性 */
  view_props: string;
  /**字段显示长度 */
  width: number;
  /**字段是否是否必输 */
  required?: boolean;
  /**字段许可值 */
  option: string;
  /**字段默认值 */
  default: string;
  /**启用 */
  enable?: boolean;
  /**是否显示 */
  is_dispaly?: boolean;
  /**是否编辑 */
  is_edit?: boolean;
  /** Relation: table=> ddic.table */
  table?: ddic_table;
}

/**
 * Model=> ddic.table.filter (::Table Filter Field)
 *
 * Table=> ddic_table_filter (表格筛选字段列表)
 */
export interface ddic_table_filter {
  /**表名 */
  id?: number;
  /**字段所属的表格 */
  table_id: number;
  /**字段名称 */
  name: string;
  /**绑定的模型字段 */
  bind: string;
  /**编辑控件类型 */
  edit_type: string;
  /**编辑控件属性 */
  edit_props: string;
  /**查看控件类型 */
  view_type: string;
  /**查看控件属性 */
  view_props: string;
  /**字段显示长度 */
  width: number;
  /**字段是否是否必输 */
  required?: boolean;
  /**字段许可值 */
  option: string;
  /**字段默认值 */
  default: string;
  /**启用 */
  enable?: boolean;
  /**是否显示 */
  is_dispaly?: boolean;
  /**是否编辑 */
  is_edit?: boolean;
  /** Relation: table=> ddic.table */
  table?: ddic_table;
}

/**
 * Model=> ddic.table (::Table)
 *
 * Table=> ddic_table (表格定义)
 */
export interface ddic_table {
  /**表名 */
  id?: number;
  /**undefined */
  name: string;
  /**表关联的表单 */
  form_id: number;
  /**表关联的模型 */
  model_id: number;
  /**表注释 */
  comment: string;
  /**介绍 */
  description: string;
  /** Relation: form=> ddic.form */
  form?: ddic_form;
  /** Relation: fields=> ddic.table.field */
  fields?: ddic_table_field[];
  /** Relation: model=> ddic.model */
  model?: ddic_model;
}

/**
 * Model=> demo.pet (::Pet)
 *
 * Table=> demo_pet (宠物表)
 */
export interface demo_pet {
  /**undefined */
  id?: number;
  /**undefined */
  name?: string;
  /**undefined */
  type: "cat" | "dog" | "others";
  /**undefined */
  status: "checked" | "curing" | "cured";
  /**undefined */
  mode: "enabled" | "disabled";
  /**undefined */
  online?: boolean;
  /**undefined */
  curing_status?: "0" | "1" | "2";
  /**undefined */
  stay: number;
  /**undefined */
  cost: number;
  /**undefined */
  images?: string;
}
