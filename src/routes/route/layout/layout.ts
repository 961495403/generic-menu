import React, { lazy, useState } from "react";
import { RouteObject } from "react-router-dom";


const Layout = ():RouteObject => {
    const route = {
        path:"/",
        element: React.createElement(lazy(() => import("page/layout"))),

    } as RouteObject
    return route
}

export default Layout;
