import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";


const Main = () => {
    return (
        <div className=" mx-auto md:mb-10 mb-5" >
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;