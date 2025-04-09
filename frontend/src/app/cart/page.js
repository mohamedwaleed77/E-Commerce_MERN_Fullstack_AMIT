 'use client'; 
 
import { useState,useEffect } from "react";
import Cookies from "js-cookie";

export default function Cart() {
  const [cartItems,setCart]=useState([])
  const [empty,setempty]=useState(false)
  const [msg,setMsg]=useState("")
  if (!Cookies.get("token")){
    localStorage.setItem("isLoggedIn",false)
    window.location.reload();
  }
  fetch('http://localhost:3001/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'token':Cookies.get("token"),
          'Content-Type': 'application/json',
          
        }
      })
      .then((res)=>res.json())
      .then((res)=>{
        if(!res.cart){
           setempty(1)
        }
        setMsg(res.msg || res.error || res.err)
    
      })

  return (
    <div className="flex flex-col gap-10 justify-center items-center h-screen">
        {msg  && (<p className="text-2xl">{msg}</p>) }
   </div>
  )
}
