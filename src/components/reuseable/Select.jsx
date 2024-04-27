import React, { forwardRef } from "react";
import { useId } from "react";

const Select = forwardRef(
  ({ options = [], label, className = "", ...props }, ref) => {
    const [id] = useId();
    return (
      <div>
        {label && (
          <label htmlFor={id} className="">
            {label}
          </label>
        )}
        <select
          {...props}
          id={id}
          ref={ref}
          className={`px-3 py-2 rounded-lg bg-white text-black ${className}`}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default Select;
