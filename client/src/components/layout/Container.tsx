import React from "react";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const Container = ({ children, className = "" }: Props) => {
  return (
    <div
      className={`mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200  lg:mx-0 lg:max-w-none lg:grid-cols-3 ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
