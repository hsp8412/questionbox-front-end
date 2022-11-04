import React from "react";

interface Props {
  children: React.ReactNode;
  setLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Button: React.FC<Props> = ({ children, setLoginModalOpen }) => {
  return (
    <button
      className="bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400
    duration-500"
      onClick={() => setLoginModalOpen(true)}
    >
      {children}
    </button>
  );
};

export default Button;
