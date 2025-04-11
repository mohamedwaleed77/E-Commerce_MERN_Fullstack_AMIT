'use client'
import React from 'react'
import { useSelector } from 'react-redux'
 

export default function GoUp() {
 
  return (
    <button className='fixed bg-gray-200 
    hover:bg-white rounded-full m-10 h-12 w-12
    bottom-0
     content-center text-center text-2xl cursor-pointer'
     onClick={()=>{window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}}
     >
        ^
        </button>
  )
}
