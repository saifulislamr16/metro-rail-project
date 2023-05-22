import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../Home/Home";
import MRT from "../MRT/MRT";
import MapWithForm from "../MapWithForm/MapWithForm";
import Login from "../component/Login";
import SignUp from "../component/SignUp";
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
            },
            {
                path:"/login",
                element:<Login></Login>
            },
            {
                path:"/Signup",
                element:<SignUp></SignUp>
            }
        ]
    },
    {
        
    }
])

export default routes;