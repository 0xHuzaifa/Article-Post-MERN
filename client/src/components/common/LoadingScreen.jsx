// LoadingScreen.jsx
import React from "react";

const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-white">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="mt-5 text-lg text-gray-700">Loading...</p>
    </div>
  );
};

export default LoadingScreen;
