'use client'; // Since this is a Next.js component

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux'

import { useTranslation } from 'react-i18next';
import i18n, { setDocumentDirection } from "../../../lib/lang";
import { initializeI18n } from "../../../lib/lang";
import { toggle } from '../../../features/languageSlice/languageSlice';
export default function Navbar() {

  const dispatch=useDispatch()
  const {t} = useTranslation()
  const toggled = useSelector((state) => state.toggle.value);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  
  // Check if the user is logged in on component mount
  useEffect(() => {
    initializeI18n();
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUsername = localStorage.getItem('username');
    
    if (storedIsLoggedIn && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);
  i18n.on('languageChanged', (lng) => {
    setDocumentDirection(lng);
  });
  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
    window.location.reload();
  };
  const changeLanguage = ()=>{
    dispatch(toggle());
    i18n.changeLanguage(!toggled ? 'ar' : 'en');
  }


  return (
    <div className='top-0 lw-screen shadow-sm direction-ltr'>
    <div className='w-full bg-slate-200 text-slate-500 gap-2 h-40 big:h-12 text-1xl big:text-md  flex items-center flex-col big:flex-row justify-between text-center overflow-hidden'>
      <Link href={"/"} className='flex items-center justify-center h-12 w-45 text-2xl   px-2 hover:border-b-2 border-red-400'>E-commerce</Link>
 
      <Link href={"/cart"} className='flex justify-center items-center gap-2 h-12 w-30 cursor-pointer  px-2 hover:border-b-2 border-red-400' ><img src='cart.png' className='w-8'/><p>{i18n.t('cart')}</p></Link>
 
      <div className='flex items-center justify-center gap-2 text-sm px-2'>
    {isLoggedIn && (
        <div className=' w-30 '>
          {i18n.t('greeting',{username:username})}
        </div>
      )}
        <button 
          onClick={changeLanguage}
          className='w-20 h-12 flex justify-center items-center   text-white cursor-pointer hover:border-b-2 border-red-400 overflow-hidden '>
          <img src='lang.png' className='w-8'/>
        </button>
        {isLoggedIn && (
        <button
          onClick={handleLogout} 
          className='w-20 h-12 flex justify-center items-center   text-white cursor-pointer hover:border-b-2 border-red-400 overflow-hidden '>
          <img src='logout.png' className='w-8'/>
        </button>
      )}

 
      </div>
    </div>

    </div>
  );
}
