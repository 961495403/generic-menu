import { api } from "./api";
import { Env } from "../../config/env";
import { IAsLoginParams } from "../../types/user";

/**
 * AS登录
 */
export const asLoginApi = async (loginParams: IAsLoginParams) => {
  const {username, password} = loginParams;
  let params = `grant_type=password&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
  const result = await api.post(Env.authUrl, params, {
    headers: {
      Authorization: Env.authCode,
    },
  });
  return result.data;
};

/**
 * JWT登录
 */
 export const getJwtLoginApi = async (token: string) => {
  const result = await api.get("/foundation/getJwtAuthorizationToken", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return result.data.data;
};

/**
 * 获取用户权限菜单
 */
 export const getUserMenuApi = async () => {
  const result = await api.get("/foundation/getCurrentUserPagePermissions");
  return result.data.data;
};

/**
 * 组织架构
 */
export const getFoundationTreeApi = async () => {
  const result =  await api.get("/foundation/getFoundationTree");
  return result.data.data;
};


