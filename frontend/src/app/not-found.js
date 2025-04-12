'use client'
import React from 'react'

export default function Notfound() {
  return (
     <div className='h-screen flex-col text-1xl big:text-4xl flex items-center justify-center gap-10'>
        <img src='wayg.gif' className='w-50 big:w-100'></img>
        <p>Page doesn't exist.. 404?</p>
     </div>
  )
}
