import React, { forwardRef } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  type?: string;
  className?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ name, type, className, ...rest }, ref) => {
    return (
      <input
        name={name}
        type={type || "text"}
        className={`px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`}
        ref={ref}
        {...rest}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
