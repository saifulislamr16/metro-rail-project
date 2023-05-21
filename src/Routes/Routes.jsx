import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../Home/Home";
import MRT from "../MRT/MRT";
const routes = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },
            {
                path:"/mrt",
                element:<MRT></MRT>
            }
        ]
    },
    {
        
    }
])

export default routes;