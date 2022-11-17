import { lazy } from "react";

const Login = lazy(() => import("page/login"));

const login = {
  path: "/login",
  element: <Login />,
};

export default login;
