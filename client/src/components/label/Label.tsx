import React from "react";

type Props = {
  children: React.ReactNode;
  htmlFor: string;
};

const Label = ({ children, htmlFor }: Props) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      {children}
    </label>
  );
};

export default Label;
