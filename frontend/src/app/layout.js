 
import { ReduxProvider } from "../../lib/Providers";
import LoginForm from "./components/Loginform";
 
import Navbar from "./components/Navbar";
import "./globals.css";
 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-mono bg-gray-100 ">
        <ReduxProvider>
          <Navbar></Navbar>
          <LoginForm/>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}