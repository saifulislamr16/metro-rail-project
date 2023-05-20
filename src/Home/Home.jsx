import Navbar from "../Navbar/Navbar";
import metro_background from "../../public/metro_background.jpg";
import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";
import './Home.css'
const Home = () => {
    const weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=23.8103&lon=90.4125&appid=1d978d91ed6f50a0d6ea61d8136e8caf`;
    const dateApi = 'https://worldtimeapi.org/api/timezone/Asia/Dhaka';
    const [weather, setWeather] = useState(null);
    const [date, setDate] = useState(null);
    const [dateM, setDateM] = useState("");
    const [time, setTime] = useState("");
    useEffect(() => {
        fetch(weatherApi)
            .then(res => res.json())
            .then(data => setWeather(data));
    }, [])
    console.log(weather.main.temp);
    console.log(weather.weather[0].main);
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
                const t = `${hr}:${min} ${med}`
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
    return (
        <div>
            <div className={`w-full h-screen bg-container  bg-cover bg-center relative`}>
                <div className="absolute top-0 w-full z-10">
                    <Navbar></Navbar>
                </div>

                <div className="my-3 top-20 absolute w-full h-15 text-lg text-red-600 font-semibold backdrop-blur-sm bg-white/30">
                <div className="flex align-middle">
                <button  className=" btn btn-secondary btn-xs sm:btn-sm md:h-10 md:w-18 lg:btn-lg bg-red-600">News</button>
                    <Marquee className="">
                        I can be a React component, multiple React components, or just some text.
                    </Marquee>
                </div>
                </div>
                <div className="md:p-12 p-3 mx-auto absolute md:top-1/3 md:left-1/3 top-60 left-0  text-center flex flex-col justify-center items-center backdrop-blur-sm bg-black/30 rounded-sm">
                    <h1 className="md:text-5xl text-3xl font-bold text-white">Welcome to Dhaka Metro</h1>
                    <div className="md:text-3xl text-xl font-semibold text-white flex mt-5">
                        <h2>{dateM}</h2>
                        <h2 className="md:ml-14 ml-5">{time}</h2>
                    </div>
                    <div className="md:text-3xl text-xl font-semibold text-white flex items-center mt-5">
                        <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}></img>
                        <h1>{weather.weather[0].main}</h1>
                        <div className="text-center">
                            <h1 className="md:ml-14 ml-5">{Math.round((weather.main.temp - 273.15).toFixed(2))} C</h1>
                            <h1 className="md:ml-14 ml-5">Dhaka</h1>
                        </div>
                    </div>

                </div>
            </div>
            <div className="my-2">
                <div id="default-carousel" className="relative md:w-[800px] w-72 md:h-24 h-14 bg-red-800 mx-auto my-4" data-carousel="slide">
                    {/* <!-- Carousel wrapper --> */}
                    <div className="relative overflow-hidden rounded-lg md:w-[800px] w-72 md:h-24 h-14 bg-black">
                        {/* <!-- Item 1 --> */}
                        <div className="hidden duration-700 ease-in-out" data-carousel-item>
                            <img src={metro_background} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                        </div>
                        {/* <!-- Item 2 --> */}
                        <div className="hidden duration-700 ease-in-out" data-carousel-item>
                            <img src={metro_background} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                        </div>
                        {/* <!-- Item 3 --> */}
                        <div className="hidden duration-700 ease-in-out" data-carousel-item>
                            <img src={metro_background} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                        </div>
                        {/* <!-- Item 4 --> */}
                        <div className="hidden duration-700 ease-in-out" data-carousel-item>
                            <img src={metro_background} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                        </div>
                        {/* <!-- Item 5 --> */}
                        <div className="hidden duration-700 ease-in-out" data-carousel-item>
                            <img src={metro_background} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                        </div>
                    </div>
                    {/* <!-- Slider indicators --> */}
                    <div className="absolute z-30 flex md:space-x-3 space-x-1 -translate-x-1/2 md:-bottom-5 -bottom-4  left-1/2 bg-lime-400">
                        <button type="button" className="md:w-3 w-2 h-2 md:h-3 rounded-full " aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                        <button type="button" className="md:w-3 w-2 h-2 md:h-3 rounded-full " aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                        <button type="button" className="md:w-3 w-2 h-2 md:h-3 rounded-full " aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                        <button type="button" className="md:w-3 w-2 h-2 md:h-3 rounded-full " aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
                        <button type="button" className="md:w-3 w-2 h-2 md:h-3 rounded-full " aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
                    </div>
                    {/* <!-- Slider controls --> */}
                    {/* <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                            <span className="sr-only">Previous</span>
                        </span>
                    </button>
                    <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                            <span className="sr-only">Next</span>
                        </span>
                    </button> */}
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