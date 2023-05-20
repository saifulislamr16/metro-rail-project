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
    console.log(weather);
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
                        <button className=" btn btn-secondary btn-xs sm:btn-sm md:h-10 md:w-18 lg:btn-lg bg-red-600">News</button>
                        <Marquee className="">
                            I can be a React component, multiple React components, or just some text.
                        </Marquee>
                    </div>
                </div>
                <div className="md:p-12 p-3 mx-auto absolute md:top-1/3 md:left-1/3 top-60 left-0  text-center flex flex-col justify-center items-center backdrop-blur-sm bg-black/30 rounded-sm">
                    <h1 className="md:text-5xl text-3xl font-bold text-white">Welcome to Dhaka Metro</h1>
                    <div className="md:text-3xl text-xl font-semibold text-white  mt-5">
                        {
                            dateM !== null && time !== null &&
                            <div className="flex">
                                <h2>{dateM}</h2>
                                <h2 className="md:ml-14 ml-5">{time}</h2>
                            </div>
                        }
                    </div>
                    <div className="md:text-3xl text-xl font-semibold text-white  mt-5">
                        {
                            weather !== null &&
                            <div className="flex items-center">
                                <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}></img>
                                <h1>{weather.weather[0].main}</h1>
                                <div className="text-center">
                                    <h1 className="md:ml-14 ml-5">{Math.round((weather.main.temp - 273.15).toFixed(2))} C</h1>
                                    <h1 className="md:ml-14 ml-5">Dhaka</h1>
                                </div>
                            </div>
                        }
                    </div>

                </div>
            </div>
            <div className="md:my-8 my-4">
                <div>
                    <div className="carousel w-11/12 h-60 mx-auto">
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