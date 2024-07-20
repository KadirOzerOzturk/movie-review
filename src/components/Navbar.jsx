import React from 'react'
import mainLogo from "../icons/netflix_icon.png"
import searchIcon from "../icons/search_icon.png"
import notificationIcon from "../icons/notification_icon.png"
import profileIcon from "../icons/profile_icon.png"
function Navbar() {
    return (
        <div className='h-24 flex text-center  justify-between items-center px-24 '>
            <div className='h-16 '>
                <img src={mainLogo} alt="" className='h-16   rounded-xl' />
            </div>
            <div className='flex justify-between items-center text-white gap-4 appearance-none'>
                <ul className='flex justify-between items-center text-white gap-4 appearance-none'>
                    <li className='rounded-xl py-2 px-4 hover:bg-white hover:text-netflix-black cursor-pointer duration-200'>Movies</li>
                    <li className='rounded-xl py-2 px-4 hover:bg-white hover:text-netflix-black cursor-pointer duration-200'>TV Shows</li>
                    <li className='rounded-xl py-2 px-4 hover:bg-white hover:text-netflix-black cursor-pointer duration-200'>Series</li>
                    <li className='rounded-xl py-2 px-4 hover:bg-white hover:text-netflix-black cursor-pointer duration-200'>Animations</li>
                    <li></li>
                </ul>
            </div>
            <div>
                <div className='relative'>
                    <input type="text" name="" id="" className='bg-slate-700 text-white rounded-2xl h-8 mx-auto pr-10 pl-4 font-bold capitalize placeholder:text-center' placeholder='Search'/>
                    <img src={searchIcon} alt="" className='h-6 absolute right-2 top-1/2 transform -translate-y-1/2' />
                </div>
            </div>
            <div className='flex justify-between gap-5 '>
            <div className='h-12'>
                <img src={notificationIcon} alt="" className='h-12 rounded-xl cursor-pointer' />
            </div>
            <div className='h-12     '>
                <img src={profileIcon} alt="" className='h-12 rounded-xl cursor-pointer' />
            </div>
            </div>
        </div>
    )
}

export default Navbar