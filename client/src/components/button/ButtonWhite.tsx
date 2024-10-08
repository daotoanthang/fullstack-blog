import React from "react";
import { Link } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
};

const ButtonWhite = ({ children, to, onClick }: Props) => {
  if (to) {
    return (
      <Link
        to={to}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        {children}
      </button>
    );
  }

  return null;
};

export default ButtonWhite;
