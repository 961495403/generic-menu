import { Suspense } from "react";
import Transiton from "./components/transiton";
import './App.sass';
import {RouteObject, useRoutes } from "react-router-dom";
import routes from "routes/route/hooks";
import login from "./routes/route/login/login";
import { useAction } from "routes/route/layout/hooks";
import LayoutPage from "page/layout";



function App() {
  const layoutRoute= useAction()
  const route = {
    path:"/",
    element: <LayoutPage></LayoutPage>,
    children: layoutRoute
  } as RouteObject
  const routes: Array<RouteObject> = [login];
  routes.push(route)
  let element = useRoutes(routes)

  return (
    <div className="App">

      <Suspense fallback={<Transiton />}>{element}</Suspense>
   
    </div>
  );
}

export default App;
