import Popular from "./popular/Popular";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Battle from "./battle/Battle";
import BattleResults from "./battle/BattleResults";
import Layout from "./components/Layout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "",
                element: <Popular/>
            },
            {
                path: "popular",
                element: <Popular/>
            },
            {
                path: "battle",
                element: <Battle/>,
            },
            {
                path: "battle/results",
                element: <BattleResults/>
            }
        ]
    },

]);

function App() {
    return <RouterProvider router={router}/>
}

export default App;
