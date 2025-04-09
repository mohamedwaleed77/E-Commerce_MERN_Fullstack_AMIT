'use client'; // Since this is a Next.js component

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { setToken, clearToken } from '../../../features/token/tokenSlice'
export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const dispatch=useDispatch()
  // Check if the user is logged in on component mount
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUsername = localStorage.getItem('username');
    
    if (storedIsLoggedIn && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
    dispatch(clearToken())
    window.location.reload();
  };



  return (
    <div className='top-0 lw-screen shadow-sm'>
    <div className='w-full bg-slate-200 text-slate-500 gap-2 h-40 big:h-12 text-1xl big:text-md  flex items-center flex-col big:flex-row justify-between text-center overflow-hidden'>
      <Link href={"/"} className='flex items-center justify-center h-12 w-45 text-2xl hover:bg-gray-100 px-2'>E-commerce</Link>
 
      <Link href={"/cart"} className='flex justify-center items-center gap-2 h-20 w-30 cursor-pointer hover:bg-gray-100 px-2'><img src='cart.png' className='w-8'/><p>cart</p></Link>
 
      <div className='flex items-center justify-center gap-2 text-sm px-2'>
    {isLoggedIn && (
        <div className=' w-full '>
          Hi,{username}!
        </div>
      )}
        {isLoggedIn && (
        <button
          onClick={handleLogout} 
          className='w-20 h-12 flex justify-center items-center   text-white cursor-pointer hover:bg-red-400 overflow-hidden '>
          <img src='logout.png' className='w-8'/>
        </button>
      )}
      </div>
    </div>

    </div>
  );
}
