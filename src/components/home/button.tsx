import React from "react";

interface Props {
  children: React.ReactNode;
}

const Button: React.FC<Props> = ({ children }) => {
  return (
    <button
      className="bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded hover:bg-indigo-400
    duration-500"
    >
      {children}
    </button>
  );
};

export default Button;
