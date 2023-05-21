
import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";
import gmail from "../../public/gmail.png"
import info from "../../public/info.png"
import Ticket from "../../public/ticket.png"
import news from "../../public/megaphone.png"
import './Home.css'
const Home = () => {

    const weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=23.8103&lon=90.4125&appid=1d978d91ed6f50a0d6ea61d8136e8caf`;
    const dateApi = 'https://worldtimeapi.org/api/timezone/Asia/Dhaka';
    const [weather, setWeather] = useState(null);
    const [date, setDate] = useState(null);
    const [dateM, setDateM] = useState("");
    const [time, setTime] = useState("");
    const [error, setError] = useState({});
    const [email, setEmail] = useState(false);
    const [ticket, setTicket] = useState({});
    const [data, setData] = useState(null);
    const fetchWeatherData = () => {
        fetch(weatherApi)
            .then(res => res.json())
            .then(data => setWeather(data));
    }
    useEffect(() => {
        fetchWeatherData();

        const interval = setInterval(() => {
            fetchWeatherData();
        }, 3600000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    useEffect(() => {
        fetch(dateApi)
            .then(res => res.json())
            .then(data => {
                setDate(data)
                const dateTime = data.datetime.split('T');
                setDateM(getDate(dateTime[0]));

                const [hours, minutes] = dateTime[1].split(':');
                let hours12 = parseInt(hours, 10);
                const meridiem = hours12 >= 12 ? 'PM' : 'AM';
                if (hours12 === 0) {
                    hours12 = 12;
                } else if (hours12 > 12) {
                    hours12 -= 12;
                }
                const time12 = `${hours12}:${minutes} ${meridiem}`;
                setTime(time12);
            });

    }, []);
    const updateTime = (p) => {
        let str = p.split(':');
        const hours = parseInt(str[0], 10);

        if (typeof str[1] !== 'undefined') {
            const str2 = str[1].split(' ');
            const minutes = parseInt(str2[0], 10);
            if (typeof str2[1] !== 'undefined') {
                let med = str2[1];
                let hr = parseInt(hours, 10);
                let min = parseInt(minutes, 10);
                console.log(hr, min, med);
                min += 1;
                if (min == 60) {
                    hr++;
                    min = 0;
                }
                if (hr > 12) {
                    hr -= 11
                    if (med === 'AM') {
                        med = 'PM'
                    } else {
                        med = 'AM'
                    }
                }
                let t = `${hr}:${min} ${med}`
                if (min <= 9) {
                    t = `${hr}:0${min} ${med}`
                }
                return t;
            }
        }
    }
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(updateTime(time));
        }, 60000);

        return () => {
            clearInterval(interval);
        };
    }, [time]);

    const handleSignUp = event => {
        event.preventDefault();
        const form = event.target;
        const from = form.from.value;
        const to = form.to.value;
        const phone = form.phone.value;
        console.log(event)
        // Perform form validation
        let errors = {};
        if (from === "Select Station") {
            errors.from = "Please select a station";
        }
        if (to === "Select Station") {
            errors.to = "Please select a station";
        }
        if (phone === '' && !email) {
            errors.phone = "Please enter phone number"
        }
        // If there are validation errors, update the error state and return
        if (Object.keys(errors).length > 0) {
            setError(errors);
            console.log(errors);
            return;
        }
        else {
            setError({});
            const info = {};
            info.from = from;
            info.to = to;
            if (email) {
                info.phone = ""
                info.email = "userEmail"
            } else {
                info.phone = phone
                info.email = ""
            }
            setTicket(info);
        }

    };

    useEffect(() => {
        fetch('data.json')
        .then(res => res.json())
        .then(data => setData(data));
    },[])


    return (
        <div>

            <div className={`w-full h-screen bg-container  bg-cover bg-center relative`}>

                <div className="my-0 top-3 absolute w-full h-15 text-lg text-red-600 font-semibold backdrop-blur-sm bg-white/80">
                    <div className="flex align-middle">
                        <button className=" btn btn-secondary btn-xs sm:btn-sm md:h-10 md:w-18 lg:btn-lg bg-red-600">Notices</button>
                        <Marquee className="">
                            I can be a React component, multiple React components, or just some text.
                        </Marquee>
                    </div>
                </div>
                <div className="md:p-12 p-3 mx-auto absolute md:top-1/4 md:left-1/3 top-60 left-0  text-center flex flex-col justify-center items-center backdrop-blur-sm bg-black/30 rounded-sm">
                    <h1 id="google_translate_element" className="md:text-5xl text-3xl drop-shadow-2xl font-bold text-white"><span className="text-sky-500">Welcome</span> to Dhaka Metro</h1>
                    <div className="md:text-3xl text-xl drop-shadow-2xl font-semibold text-white  mt-10">
                        {
                            dateM !== null && time !== null &&
                            <div className="flex">
                                <h2>{dateM}</h2>
                                <h2 className="md:ml-14 ml-5">{time}</h2>
                            </div>
                        }
                    </div>
                    <div className="md:text-3xl drop-shadow-2xl text-xl font-semibold text-white  mt-5">
                        {
                            weather !== null &&
                            <div className="flex items-center">
                                <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}></img>
                                <h1>{weather.weather[0].main}</h1>
                                <div className="text-center">
                                    <h1 className="md:ml-14 ml-5">{Math.round((weather.main.temp - 273.15).toFixed(2))} <sup className="text-xl">o</sup>C</h1>
                                    <h1 className="md:ml-14 ml-5">Dhaka</h1>
                                </div>
                            </div>
                        }
                    </div>

                </div>
            </div>

            <div className="md:my-8 my-4">
                <div>
                    <div className="carousel w-11/12 md:h-60 h-40 mx-auto">
                        <div id="slide1" className="carousel-item relative w-full">
                            <img src="https://new-media.dhakatribune.com/en/uploads/2022/09/27/rsz-photo---bkash-puja-offer.jpeg" className="w-full" />
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide3" className="btn btn-circle">❮</a>
                                <a href="#slide2" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                        <div id="slide2" className="carousel-item relative w-full">
                            <img src="https://nagad.com.bd/uploads/slider/pGb6BgrWSNKUDHKdvG7FYHicKhvhL2VyT8ZWH3fn.jpg" className="w-full" />
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide1" className="btn btn-circle">❮</a>
                                <a href="#slide3" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                        <div id="slide3" className="carousel-item relative w-full">
                            <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/bca18439712029.577207f36f010.jpg" className="w-full" />
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide2" className="btn btn-circle">❮</a>
                                <a href="#slide1" className="btn btn-circle">❯</a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div id="scroll" className="flex justify-center ">

                <h1 className=" bg-blue-100 rounded-lg md:py-5 py-2 md:px-60 px-14 md:text-5xl text-xlfont-semibold md:mt-16 mt-8 md:mb-7 mb-5 border-b-4 w-fit border-blue-800 flex"><span><img className=" md:mr-5 mr-2 md:w-14 md:h-14 w-8 h-8" src={Ticket} /></span>Purchase a ticket</h1>
            </div>

            <div className="mx-auto grid md:grid-cols-2 grid-cols-1 w-full md:py-10 py-5 md:px-20 px-5 rounded-md bg-gray-100">


                <form className="md:border-r-4 border-slate-700 md:pr-10" onSubmit={handleSignUp}>

                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">From</label>
                        <select id="countries" name="from" className={`${error.from ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}`}>
                            <option>Select Station</option>
                            <option>Uttara North</option>
                            <option>Uttara Center</option>
                            <option>Uttara South</option>
                            <option>pallabi</option>
                            <option>Mirpur-11</option>
                            <option>Mirpur-10</option>
                            <option>Kazipara</option>
                            <option>Shewrapara</option>
                            <option>Bijoy Sarawni</option>
                            <option>Framgate</option>
                            <option>Karwan Bazar</option>
                            <option>Shahbag</option>
                            <option>Dhaka University</option>
                            <option>Bangladesh Secretariat</option>
                            <option>motijheel</option>
                        </select>
                        {
                            error.from ?
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {error.from}</p> : <></>
                        }
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">To</label>
                        <select id="countries" name="to" className={`${error.to ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}`}>
                            <option>Select Station</option>
                            <option>Uttara North</option>
                            <option>Uttara Center</option>
                            <option>Uttara South</option>
                            <option>pallabi</option>
                            <option>Mirpur-11</option>
                            <option>Mirpur-10</option>
                            <option>Kazipara</option>
                            <option>Shewrapara</option>
                            <option>Bijoy Sarawni</option>
                            <option>Framgate</option>
                            <option>Karwan Bazar</option>
                            <option>Shahbag</option>
                            <option>Dhaka University</option>
                            <option>Bangladesh Secretariat</option>
                            <option>motijheel</option>
                        </select>
                        {
                            error.to ?
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {error.to}</p> : <></>
                        }
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone No</label>
                        <input type="tel" name="phone" className={`${error.phone ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}`} placeholder="Phone no" />
                        {
                            error.phone ?
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {error.phone}</p> : <></>
                        }
                    </div>
                    <div className="flex">
                        <div className="mb-6">
                            <button onClick={() => setEmail(true)} className="border border-blue-500 rounded-lg p-[10px] block mb-2 text-sm font-medium text-gray-900 dark:text-white">Don't have a phone number ?</button>
                        </div>
                        <div className={`ml-8 ${email ? 'block' : 'hidden'}`}>
                            <button className="flex bg-white border-2 border-slate-400 text-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <img src={gmail} className="h-4 w-4" /> <span className="ml-2">Gmail</span>
                            </button>
                        </div>
                    </div>
                    <input type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" value="Continue" />
                </form>


                <div className="md:ml-10 md:mr-2 md:mt-0 mt-8">
                    <ul className=" w-full h-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className=" text-2xl w-full px-4 py-2 border-b-4 border-green-600 rounded-t-lg dark:border-gray-600 flex items-center">
                            <img src={info} className="w-7 h-7" />
                            <span className="ml-4">Instructions</span></li>
                        <li className="text-lg w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">1. Select start station from the form on the left</li>
                        <li className="text-lg w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">2. Select destination station from the form on the left</li>
                        <li className="w-full px-4 py-2 text-lg border-b border-gray-200 dark:border-gray-600">3. Provide your phone number (If available)</li>
                        <li className="w-full px-4 py-2 rounded-b-lg text-lg border-b border-gray-200 dark:border-gray-600">4. If phone number is not available then proceed with "Don't have a phone number"</li>
                        <li className="w-full px-4 py-2 rounded-b-lg text-lg border-b border-gray-200 dark:border-gray-600">5. Provide your email address</li>
                        <li className="w-full px-4 py-2 rounded-b-lg text-lg border-b border-gray-200 dark:border-gray-600">6. Press continue to proceed</li>
                    </ul>
                </div>




            </div>

            <div id="scroll" className="flex justify-center ">

                <h1 className=" bg-blue-100 rounded-lg md:py-5 py-2 md:px-60 px-14 md:text-5xl text-xlfont-semibold md:mt-36 mt-8 md:mb-7 mb-5 border-b-4 w-fit border-blue-800 flex"><span><img className=" md:mr-5 mr-2 md:w-14 md:h-14 w-8 h-8" src={news} /></span>News and Notices</h1>
            </div>
            <div className=" bg-gray-100 mt-5 md:grid grid-cols-6 md:px-36 px-2 md:py-8 border-2 gap-5">

                <div className="overflow-x-auto md:col-span-4">
                    <h1 className="mb-5 md:text-3xl text-lg text-center text-blue-600 font-semibold">Topics</h1>
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Date</th>
                                <th>Title</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover">
                                <th>1</th>
                                <td>Cy Ganderton</td>
                                <td>Quality Control Specialist</td>
                            </tr>
                            
                            <tr className="hover">
                                <th>2</th>
                                <td>Hart Hagerty</td>
                                <td>Desktop Support Technician</td>
                            </tr>
                            
                            <tr className="hover">
                                <th>3</th>
                                <td>Brice Swyre</td>
                                <td>Tax Accountant</td>
                            </tr> 
                        </tbody>
                    </table>
                    <button className="btn  w-full mt-4">See More</button>
                </div>
                <div className="mt-8 md:ml-16 flex center">
                    <iframe width="750" height="315" src="https://www.youtube.com/embed/3KtdjhgGi7g" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
            </div>


        </div>
    );

};

const getDate = (dateString) => {
    const date = new Date(dateString);
    let monthName = date.toLocaleString('default', { month: 'long' });
    const print = `${monthName} ${date.getDate()}, ${date.getFullYear()}`;
    return print;
}



export default Home;