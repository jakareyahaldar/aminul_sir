import React from 'react';
import logo from '../assets/logo.png'; // আপনার লোগো ফাইল

function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <img src={logo} alt="লোগো" className="w-48 h-48 mb-8 animation-spin-slow" />
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse" />
        <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse delay-100" />
        <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse delay-200" />
      </div>
      <p className="mt-4 text-gray-600">লোড হচ্ছে...</p>
    </div>
  );
}

export default LoadingScreen;