import { ReactElement } from "react";
import { RouteObject } from "react-router-dom";
import layout from "./layout/layout";
import login from "./login/login";



const routes: Array<RouteObject> = [layout(), login];

export default routes;
