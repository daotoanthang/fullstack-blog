import React, { useState, forwardRef, Ref } from "react";
import IconEyeOpen from "../icon/IconEyeOpen";
import IconEyeClose from "../icon/IconEyeClose";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

// Use forwardRef to forward the ref to the input element
const InputPassword = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  return (
    <div className="relative">
      {hidePassword ? (
        <IconEyeOpen
          className="absolute top-2 right-3"
          onClick={() => {
            setHidePassword(false);
          }}
        />
      ) : (
        <IconEyeClose
          className="absolute top-2 right-3"
          onClick={() => {
            setHidePassword(true);
          }}
        />
      )}
      <input
        {...props} // Use props instead of rest
        ref={ref} // Attach the ref to the input element
        id="password"
        name="password"
        type={hidePassword ? "password" : "text"}
        autoComplete="current-password"
        required
        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  );
});

export default InputPassword;
