import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded shadow-lg">
        <div className="flex items-center justify-center mb-4">
          <svg
            className="animate-spin h-8 w-8 mr-2 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20c1.902 0 3.657-.682 5.025-1.815l3.007 2.664A7.969 7.969 0 0112 20zm5.271-4.729l-3.007-2.664A7.961 7.961 0 0116 12h-4v8c3.042 0 5.824-1.135 7.938-3z"
            ></path>
          </svg>
          <span className="text-indigo-600">Loading...</span>
        </div>
        <p className="text-gray-700 text-center">
          Please wait while we load your content.
        </p>
      </div>
    </div>
  );
}
