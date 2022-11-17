import { CheckboxValueType } from "antd/lib/checkbox/Group";

export interface INewAuthorized {
  name: string;
  description: string;
  dataPermissionRelIds: string[];
  members: string[];
  pagePermissions: {[key: string] : string[]};
  type: number;
}

export interface IFunctionList {
  pageId: string;
  pageName: string;
  permissions: IPermissions[];
  checked: boolean;
  checkedValue: CheckboxValueType[] | undefined
}

export interface IPermissions {
  id: string;
  pageId: string;
  permission: string;
  type: string;
}