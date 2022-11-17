export interface IFieldGroup {
  id: string;
  name: string;
  remark: string;
  nestable: boolean;
  enable: boolean;
}

export interface INewFieldItem {
  fields: IFieldItem[];
  groupId: string;
}

export interface IFieldItem {
  id?: string;
  parentId: string;
  name: string;
  remark: string;
}