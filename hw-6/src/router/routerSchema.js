import Layout from "../layout";
import Popular from "../popular";
import Battle from "../battle";
import BattleResults from "../results";

const routerSchema = [{
    path: "/",
    element: <Layout/>,
    children: [
        {
            path: "",
            element: <Popular/>
        },
        {
            path: "Popular",
            element: <Popular/>
        },
        {
            path: "Battle",
            element: <Battle/>,
        },
        {
            path: "battle/results",
            element: <BattleResults/>
        }
    ]
}];

export default routerSchema;