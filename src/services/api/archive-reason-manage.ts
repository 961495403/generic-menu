import { IPagination } from "types/api";
import { IArchiveReason } from "types/archive-reason-manage";
import { api } from "./api";

/**
 * 获取归档原因列表
 */
export const getArchiveReasonListApi = async (params: IPagination) => {
  const result = await api.post("/archiveReason/page", params);
  return result.data.data;
};

/**
 * 获取归档原因详情
 */
export const getArchiveReasonByIdApi = async (id: string) => {
  const result = await api.get(`/archiveReason/findById?id=${id}`);
  return result.data;
};

/**
 * 新增归档原因
 */
export const addArchiveReasonApi = async (params: IArchiveReason) => {
  return await api.post("/archiveReason/add", params);
};

/**
 * 更新归档原因
 */
export const updateArchiveReasonApi = async (params: IArchiveReason[]) => {
  return await api.post("/archiveReason/update", params);
};

/**
 * 删除归档原因
 */
export const deleteArchiveReasonApi = async (params: string[]) => {
  return await api.post("/archiveReason/delete", params);
};
