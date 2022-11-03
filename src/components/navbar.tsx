import React, { useContext, useState } from "react";
import Button from "./button";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsMailbox } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { UserContext } from "./context/userContextProvider";

const Navbar = () => {
  const altImage = "/flower_poinsettia.png";
  const { isAuth, userInfo } = useContext(UserContext);
  console.log(userInfo);
  let Links = [
    { boxName: "HOME", link: "/" },
    { boxName: "MY BOX", link: "/" },
    { boxName: "MY QUESTIONS", link: "/" },
  ];
  let [open, setOpen] = useState(false);
  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins]
      text-gray-800"
        >
          <span className="flex text-3xl text-indigo-600 mr-2">
            <BsMailbox />
          </span>
          Question Box
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-4 cursor-pointer md:hidden"
        >
          {open ? <GrClose /> : <GiHamburgerMenu />}
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li key={link.boxName} className="md:ml-8 text-xl md:my-0 my-7">
              <a
                href={link.link}
                className="text-gray-800 hover:text-gray-400 duration-500"
              >
                {link.boxName}
              </a>
            </li>
          ))}
          {isAuth ? (
            <img
              src={userInfo?.image}
              alt="Image"
              referrerPolicy="no-referrer"
            />
          ) : (
            <Button>Login</Button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
