import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../Home/Home";
const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>,
    },
    {
        path: "/main",
        element: <Main></Main>,
        children: [

        ]
    }
])

export default routes;