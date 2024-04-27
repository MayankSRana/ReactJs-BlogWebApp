// Input.jsx
import React, { forwardRef } from "react";

const Input = forwardRef(
  ({ label, type = "text", className = "", id, ...props }, ref) => {
    return (
      <div className={`max-w-md mx-auto mt-4 px-4 ${className}`}>
        {label && (
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={id}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 ${className}`}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

export default Input;
