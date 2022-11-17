import { IPagination } from "types/api";
import { IFieldGroup, INewFieldItem } from "types/field-management";
import { api } from "./api";

/**
 * 获取字段组列表
 */
export const getFieldGroupListApi = async (params: IPagination) => {
  const result = await api.post("/fieldGroup/page", params);
  return result.data.data;
};

/**
 * 新增字段组
 */
export const addFieldGroupApi = async (params: IFieldGroup[]) => {
  return await api.post("/fieldGroup/add", params);
};

/**
 * 编辑字段组
 */
export const updateFieldGroupApi = async (params: IFieldGroup[]) => {
  return await api.post("/fieldGroup/update", params);
};

/**
 * 删除字段组
 */
export const deleteFieldGroupApi = async (params: string[]) => {
   return await api.post("/fieldGroup/delete", params);
};

/**
 * 获取字段组详情
 */
export const getFieldGroupByIdApi = async (id: string) => {
  const result = await api.get(`/fieldGroup/findById?id=${id}`);
  return result.data;
};

/**
 * 获取字段组下的字段列表
 */
export const getFieldListApi = async (params: IPagination) => {
  const result = await api.post("/field/page", params);
  return result.data.data;
};

/**
 * 查找字段组下所有字段
 */
export const getfindByGroupIdApi = async (groupId: string) => {
  const result = await api.get(`/field/findByGroupId?groupId=${groupId}`);
  return result.data;
};

/**
 * 新增字段组下的字段
 */
export const addFieldApi = async (params: INewFieldItem) => {
  return await api.post("/field/add", params);
};

/**
 * 获取字段详情
 */
export const getFieldByIdApi = async (id: string) => {
  const result = await api.get(`/field/findById?id=${id}`);
  return result.data;
};

/**
 * 删除字段
 */
export const deleteFieldApi = async (params: string[]) => {
  return await api.post("/field/delete", params);
};

/**
 * 编辑字段
 */
export const updateFieldApi = async (params: INewFieldItem) => {
  return await api.post("/field/update", params);
};

/**
 * 获取字段对应的下级
 */
export const getFieldChildrenByIdApi = async (id: string) => {
  const result = await api.get(`/field/findByParentId?parentId=${id}`);
  return result.data;
};
