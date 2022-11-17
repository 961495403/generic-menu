import { api } from "./api";
import { Env } from "../../config/env";
import { IAsLoginParams } from "../../types/user";
import {IPagePermissionProps, IPageProps} from "../../types/page"

export const getPageTree =async () => {
    const result = await api.get("/page/getPageTree");
    return result.data;
}


export const addPage =async (param:IPageProps) => {
    return await api.post("/page/addPage", param);
}

export const updatePage =async (param:IPageProps) => {
    return await api.post("/page/updatePage", param);
}

export const deletePage =async (param:string[]) => {
    return await api.post("/page/deletePage", param);
}

export const findPageById =async (param:string) => {
    const result = await api.get(`/page/findById?id=${param}`)
    return result.data;
}

export const addPermission =async (params:IPagePermissionProps) => {
    return await api.post("/page/addPermission", params)
}

export const updatePermission =async (params:IPagePermissionProps) => {
    return await api.post("/page/updatePermission", params)
}

export const deletePermission =async (param:string[]) => {
    return await api.post("/page/deletePermission", param);
}