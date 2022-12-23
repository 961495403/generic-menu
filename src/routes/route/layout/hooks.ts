import { useMount, useRequest } from "ahooks"
import React, { lazy, useState } from "react"
import { IRouteProps } from "../props"
import { RouteObject } from "react-router-dom";
import { IUserMenuProps } from "page/layout/props";
import { getUserMenuApi } from "services/api";

export const useAction = () => {

    const [page, setPage] = useState<RouteObject[]>([])

    function getRouteItem(
        path: string,
        pagePath: string,
        children?: RouteObject[]
    ): RouteObject {
        const ImportComponent = lazy(() => import(`page/${pagePath}`))
        const r: RouteObject = {
            path: path,
            element: React.createElement(ImportComponent),
            children: children
        }

        return r
    }

    const getRoutes = (data: IRouteProps[]): RouteObject[] => {
        return data.map(item => getRouteItem(item.path, item.pagePath, item.children ? getRoutes(item.children) : undefined))
    }

    const getRouteProp = (path: string | undefined, pagePath: string | undefined, children: IRouteProps[] | undefined): IRouteProps => {
        return {
            path: path,
            pagePath: pagePath,
            children: children
        } as IRouteProps
    }

    const getRouteProps = (data: IUserMenuProps[]): IRouteProps[] => {
        return data.map(item => getRouteProp(item.url, item.pagePath, item.children ? getRouteProps(item.children) : undefined))
    }
    const getUserMenuRequest = useRequest(getUserMenuApi, {
        manual: true,
        onSuccess: (result) => {
            const userRouteProps = getRouteProps(result);
            const route = getRoutes(userRouteProps)
            setPage(route)
        }
    })
    useMount(() => {
        getUserMenuRequest.run()
    })

    return page
}
