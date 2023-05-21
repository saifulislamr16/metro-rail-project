import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../Home/Home";
import MRT from "../MRT/MRT";
import MapWithForm from "../MapWithForm/MapWithForm";
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
            },
            {
                path:"/route",
                element:<MapWithForm></MapWithForm>
            }
        ]
    },
    {
        
    }
])

export default routes;