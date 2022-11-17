import { IPagination } from "types/api";
import { INewAuthorized } from "types/authorized";
import { api } from "./api";

/**
 * 获取角色权限列表
 */
export const getRoleListApi = async (params: IPagination) => {
  const result = await api.post("/role/page", params);
  return result.data.data;
};

/**
 * 获取角色详情-角色信息
 */
export const getRoleInfoByIdApi = async (roleId: string) => {
  const result = await api.get(`/role/findById?id=${roleId}`);
  return result.data.data;
};

/**
 * 新建角色
 */
export const addRoleApi = async (params: INewAuthorized) => {
  return await api.post("/role/add", params);
};

/**
 * 删除角色
 */
export const deleteRoleApi = async (id: string[]) => {
  return await api.post("/role/delete", id);
};

/**
 * 更新角色
 */
export const updateRoleApi = async (params: INewAuthorized[]) => {
  return await api.post("/role/update", params);
};

/**
 * 获取角色权限内的功能菜单
 */
 export const getRoleFunctionMenuApi = async () => {
  const result = await api.get("/page/findAllPageWithPermission");
  return result.data;
};