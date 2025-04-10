 

import { ReduxProvider } from "../../lib/Providers";
import LoginForm from "./components/Loginform";
 
import Navbar from "./components/Navbar";
import "./globals.css";
 

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <body className="font-mono bg-gray-100 ltr" >
        <ReduxProvider>
          <Navbar></Navbar>
          <LoginForm/>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}