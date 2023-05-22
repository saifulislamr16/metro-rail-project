import React from 'react';
import QRCode from 'qrcode.react';

const Pass = ({ data }) => {
    return (
        <div className="w-8/12 mx-auto my-5">

            <div className="w-full bg-gray-100  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                <div className=' border-b-2 border-red-600 rounded-t-lg'>
                    <div className='flex justify-between items-center my-3 py-2 md:px-5 px-3'>
                        <div className="flex flex-row items-center">
                            <img src="/public/dmtcl-logo.png" className="md:h-8 h-6 md:w-12 w-8"></img>
                            <a className="md:text-2xl text-md ml-2 normal-case">Dhaka Metro</a>
                        </div>
                        <div className='border-2 border-green-800 rounded-lg py-1 md:px-4 px-1'>
                            <h1 className='text-green-700 md:text-xl text-sm uppercase'> REGULAR</h1>
                        </div>
                    </div>
                </div>

                <div className='px-8 py-8 md:grid grid-cols-6 gap-4 bg-yellow-100'>


                    <div className='col-span-4'>
                        <div className='mb-8'>
                            <h1 className='md:text-3xl text-xl uppercase font-bold mb-2'>Saiful Islam Rumon</h1>
                            <h3 className='md:text-xl text-md font-semibold uppercase'>Phone: 01923762167</h3>
                            <h3 className='md:text-xl text-md font-semibold uppercase'>NID: 1013463099</h3>
                        </div>
                        <h2 className='md:text-3xl text-xl font-semibold uppdercase mb-4'>MRT PASS INFO</h2>
                        <div className='md:flex justify-between'>
                            <div>
                                <div className='mb-4'>
                                    <h1 className='md:text-2xl text-lg uppercase text-semibold border-b-2 border-gray-500 mb-2'>MRT ID</h1>
                                    <h1 className='md:text-xl text-md'>MRT-438476876756</h1>
                                </div>
                                <div>
                                    <h1 className='md:text-2xl text-lg uppercase text-semibold border-b-2 border-gray-500 mb-2'>Balance</h1>
                                    <h1 className='md:text-xl text-md'>300 Tk</h1>
                                </div>
                            </div>
                            <div>
                                <div className='mb-4 mt-3'>
                                    <h1 className='md:text-2xl text-lg uppercase text-semibold border-b-2 border-gray-500 mb-2'>Issued date</h1>
                                    <h1 className='md:text-xl text-md'>May 5, 2023</h1>
                                </div>
                                <div>
                                    <h1 className='md:text-2xl text-lg uppercase text-semibold border-b-2 border-gray-500 mb-2'>Expiry Date</h1>
                                    <h1 className='md:text-xl text-md'>May 5, 2033</h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-span-2 pr-4 md:flex flex-col items-center justify-between mt-3'>
                            <QRCode value="123456789"></QRCode>
                        <p className='md:ml-10'><span className='md:text-lg text-md font-semibold mt-1 '>Issued By</span> <br /> <span className='md:text-lg text-md'>Dhaka Metro Authority</span></p>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Pass;