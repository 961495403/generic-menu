import React, { lazy, useState } from "react";
import { RouteObject } from "react-router-dom";
import { useAction } from "./hooks";
import LayoutPage from "page/layout"


const Layout = ():RouteObject => {
    const page = useAction()
    const route = {
        path:"/",
        element: React.createElement(lazy(() => import("page/layout"))),

    } as RouteObject
    return route
}

export default Layout;
