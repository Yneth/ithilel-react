import {createBrowserRouter, RouterProvider} from "react-router-dom";
import routerSchema from "./routerSchema";

const router = createBrowserRouter(routerSchema);

function Router() {
    return <RouterProvider router={router}/>
}

export default Router;
