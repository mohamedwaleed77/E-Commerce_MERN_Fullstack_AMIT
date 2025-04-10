import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import i18n from '../../../lib/lang'
import Cookies from 'js-cookie'

export default function Checkout() {
  const t=useTranslation
  const [address,setAdress]=useState('')
  const [phone,setPhone]=useState('')
  const [checkout,setcheckout]=useState(false)
  const [msg,setmsg]=useState('')
  const [url,setUrl]=useState('')
  const toggleLanguage=useSelector((state)=>state.toggle.value)
  
 const checkoutHandler=async ()=>{
    const data = { address: address, phoneNo: phone };
    console.log('Sending data:', data); // Log the data to ensure it is formatted properly
    await fetch('http://localhost:3002', {
        method: "POST",
        body: JSON.stringify(data),
        headers: { 
            token: Cookies.get("token"), 
            'Content-Type': 'application/json' 
        }
    }).then((res)=>res.json())
    .then((res)=>{
        setmsg(res)
        window.location.href = res.session.url
 
         
    })
  

 }
 
 
  return (
    <div className='flex justify-center align-center w-full'>
    <div >
        {checkout&&
            <div className='fixed w-screen h-full flex-col flex  items-center top-10 left-0 z-10 bg-slate-200 gap-2 py-20'>
                <p>{i18n.t('EnterAdress')}</p>
                <input className="z-20 bg-white h-30 w-1/4 " type='text' onChange={(e)=>{
                    setAdress(e.target.value);
                }
                }></input>
                <p>{i18n.t('EnterPhone')}</p>
                <input className="z-20 bg-white h-10" type='text' onChange={(e)=>{
                    setPhone(e.target.value);
                }
                }></input>
                <button className='bg-red-600 text-white h-20 w-30 text-2xl rounded-md cursor-pointer'
                    onClick={checkoutHandler}
                >{i18n.t("Checkout")}</button>
            </div>
        }
    </div>
    <button onClick={()=>{setcheckout(!checkout)}} 
    className='mt-4 h-20 w-40 justify-center
     align-center bg-red-500 flex text-2xl rounded-3xl
      content-center flex-col hover:bg-red-400 cursor-pointer'
      >{i18n.t('Checkout')}</button>
    </div>
  )
}
