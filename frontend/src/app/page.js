'use client'
import Image from "next/image";
import Navbar from "./components/Navbar";
import LoginForm from "./components/Loginform";
import React, { useState ,useEffect} from 'react';
import Admindashbord from "./components/Admindashbord";

export default function Home() {
  const [role,setAdmin]=useState('user')
  useEffect(()=>{
    const role = localStorage.getItem('role');
    setAdmin(role)
  },[])
  return (
    <div className="flex flex-col h-screen gap-5 ">
      
      { role==='admin' &&<Admindashbord></Admindashbord> }

    </div>
  );
}
