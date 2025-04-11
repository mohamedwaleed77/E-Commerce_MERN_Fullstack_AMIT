'use client'; 

import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false); // New state

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUsername = localStorage.getItem('username');
    if (storedIsLoggedIn && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
    setLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isRegistering ? 'http://localhost:3004/signup' : 'http://localhost:3004/signin';
    const payload = isRegistering 
      ? { name, email, password } 
      : { email, password };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log(data)
      if (response.ok) {

        if (!data.token) {
          setShowWelcomeMessage(true);
          setTimeout(() => {
            setShowWelcomeMessage(false);
            setIsRegistering(false); // Switch to login view
            setErrorMessage("Registration successful! Please log in.");
          }, 1500);
          return;
        }
        Cookies.set("token", data.token, { expires: 1 });

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', data.name || name);
        localStorage.setItem('role', data.role || 'user');

        setShowWelcomeMessage(true);
        setTimeout(() => {
          setShowWelcomeMessage(false);
          window.location.reload();
        }, 1000);
      } else {
        setErrorMessage(data.error||data.msg||data.message || 'Authentication failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Network error, please try again later.');
    }
    if (!Cookies.get("token")) {
      localStorage.setItem("isLoggedIn", false);
      window.location.reload();
    }

  };

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
        <h2 className="text-2xl mb-4">{isRegistering ? 'Register' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-left mb-1">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your name"
                className="w-full p-2 border rounded-lg"
              />
            </div>
          )}
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
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-lg cursor-pointer">
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </form>
        {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
        <p className="text-sm mt-4">
          {isRegistering ? "Already have an account?" : "Don't have an account?"}{' '}
          <button
            onClick={() => {
              setIsRegistering(!isRegistering);
              setErrorMessage('');
            }}
            className="text-blue-500 underline cursor-pointer"
          >
            {isRegistering ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
}
