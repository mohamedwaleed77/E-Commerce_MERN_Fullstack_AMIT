import Link from 'next/link';
import React from 'react'

export default function ConfigButton(props) {
  const { color, link } = props;

  const bgColor = {
    red: 'bg-red-500 hover:bg-red-400',
    blue: 'bg-blue-500 hover:bg-blue-400',
    green: 'bg-green-500 hover:bg-green-400',
    yellow: 'bg-yellow-300 hover:bg-yellow-200',
  }[color] || 'bg-gray-500'; // fallback color

  return (
    <Link href={link} className={`w-30 h-30 big:w-50 big:h-50 big:text-2xl ${bgColor} rounded-lg text-center content-center text-shadow-lg/100 text-white`}>
      {props.children}
    </Link>
  );
}