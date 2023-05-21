import { Link } from "react-router-dom";
import { Bars3Icon } from '@heroicons/react/24/solid'
import { useState } from 'react';
import { HashLink } from "react-router-hash-link";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [isLogged, setIsLogged] = useState(true);
    return (
        <div>
            <div className=" text-black hover:text-white navbar flex flex-row justify-between rounded-sm backdrop-blur-3xl bg-transparent hover:bg-gray-900">
                <Link to="/">
                    <div className="flex flex-row">
                        <img src="/public/dmtcl-logo.png" className="h-8 w-12"></img>
                        <a className="md:text-2xl sm:text-xl ml-2 normal-case">Dhaka Metro</a>
                    </div>
                </Link>

                <ul className="menu menu-horizontal px-1 hidden md:flex mx-2 text-xl">
                    <li><NavLink to="/" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-teal-300" : ""}>Home</NavLink></li>
                    <li><HashLink smooth to="/#scroll">Buy Ticket </HashLink></li>
                    <li><NavLink to="/mrt" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-teal-300" : ""}> MRT Pass</NavLink></li>
                    <li><NavLink to="/route" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-teal-300" : ""}>Route & Stations</NavLink></li>

                </ul>
                <div className={` gap-2 hidden  ${isLogged ? "md:flex z-30": ""}`}>
                    <p className="text-lg">Saiful Islam rumon</p>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} onClick={() => setOpen(!open)} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </label>
                        <ul tabIndex={0} className={` ${open ? "mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 text-black" : 'absolute -top-36'}`}>
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            {
                                isLogged ? <li><a>Logout</a></li> : ""
                            }
                        </ul>
                    </div>
                </div>
                <div className={` gap-2 hidden  ${isLogged ? "": " md:flex btn btn-ghost text-xl normal-case"}`}>
                    Sign In
                </div>
                <div className="flex-none md:hidden">

                    <div className="dropdown dropdown-end">
                        <label onClick={() => setOpen(!open)} tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <span>
                                <Bars3Icon className="h-6 w-6" />
                            </span>
                        </label>
                        <ul tabIndex={0} className={` ${open ? 'text-black mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-40' : 'absolute -top-96'}`}>
                            <li><NavLink to="/" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-teal-300" : ""}>Home</NavLink></li>
                            <li><HashLink smooth to="/#scroll">Buy Ticket </HashLink></li>
                            <li><Link to="/mrt">MRT Pass</Link></li>
                            <li><Link to="/route">Routes & Stations</Link></li>
                            {
                                isLogged ? <div>
                                    <li><a>Logout</a></li><li><a>Profile</a></li>
                                </div> : <li><a>Sign In</a></li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Navbar;