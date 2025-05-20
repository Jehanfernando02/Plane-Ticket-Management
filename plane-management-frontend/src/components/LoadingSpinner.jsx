import React from 'react';

const LoadingSpinner = ({ message = 'Please wait while we fetch your data...' }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75">
      <div className="flex flex-col items-center">
        {/* Spinner Animation */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-t-4 border-blue-500 border-solid rounded-full dark:border-blue-400 animate-spin border-t-transparent"></div>
          <div className="absolute border-4 border-t-4 border-blue-300 border-solid rounded-full inset-2 dark:border-blue-600 animate-spin border-t-transparent animation-delay-150"></div>
          <div className="absolute border-4 border-t-4 border-blue-200 border-solid rounded-full inset-4 dark:border-blue-700 animate-spin border-t-transparent animation-delay-300"></div>
        </div>
        {/* Dynamic Message */}
        <p className="mt-4 text-lg font-semibold text-gray-800 dark:text-gray-200 animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;