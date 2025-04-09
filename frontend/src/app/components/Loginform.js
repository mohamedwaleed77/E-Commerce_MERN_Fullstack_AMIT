'use client'; 
 
import React, { useState ,useEffect} from 'react';
import Cookies from 'js-cookie';

export default function LoginForm() {
  // State to store email, password, login status, and username
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Track login status
  const [username, setUsername] = useState('');  // Store the username
  const [role,setRole]=useState('');
  const [errorMessage, setErrorMessage] = useState('');  // Track error message
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);  // Show welcome message
  const [loading, setLoading] = useState(true);  // Track loading state for checking login
 
  // Check localStorage when the component mounts
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUsername = localStorage.getItem('username');
    
    if (storedIsLoggedIn && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
    setLoading(false);  // Set loading to false after the check
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from reloading the page
    if (!Cookies.get("token")){
      localStorage.setItem("isLoggedIn",false)
      window.location.reload();
    }
    // Make the POST request to the backend (/signin)
    try {
      const response = await fetch('http://localhost:3004/signin', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);  // Set login state to true
        setRole(data.role)
        setUsername(data.name); // Assuming response contains username

        
        //save token here
        Cookies.set("token",data.token,{expires:1});
        console.log("cookie saved")
      

        // Store the login state and username in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', data.name);
        localStorage.setItem('role', data.role);

        setShowWelcomeMessage(true); // Show the welcome message

        // Hide the welcome message after 1 sec
        setTimeout(() => {
          setShowWelcomeMessage(false);
          window.location.reload();
        }, 1000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Login failed'); // Show error message from the server
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      setErrorMessage('Network error, please try again later.');
    }
  };

  // Show loading spinner until the check is done
  if (loading) {
    return (
      <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50'>
        <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center z-50">
          <p>Loading...</p>
        </div>
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
      </div>
    );
  }

  // If logged in, show the welcome message
  if (isLoggedIn) {
    return (
      <div className="relative">
        {showWelcomeMessage && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-100 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
              <h2 className="text-green-500 text-xl">Welcome, {username}!</h2>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-100 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-2xl mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-left mb-1">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-left mb-1">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-lg">Login</button>
        </form>
        {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
      </div>
    </div>
  );
}
