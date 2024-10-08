import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Heading = ({ children, className = "" }: Props) => {
  return (
    <h2
      className={`text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight ${className}`}
    >
      {children}
    </h2>
  );
};

export default Heading;
