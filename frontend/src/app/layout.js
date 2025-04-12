 'use client'

import { initializeI18n } from "../../lib/lang";
import { ReduxProvider } from "../../lib/Providers";
import GoUp from "./components/GoUp";
import LoginForm from "./components/Loginform";
 
import Navbar from "./components/Navbar";
import "./globals.css";
export const ip_adress=(process.env.NEXT_PUBLIC_IP_ADDRESS)

export default function RootLayout({ children }) {
  initializeI18n()
  return (
    <html lang="en" dir="ltr">
      <body className="font-mono bg-gray-100 ltr" >
        <ReduxProvider>
          <Navbar></Navbar>
          <GoUp></GoUp>
          <LoginForm/>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}