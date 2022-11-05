import React, { Fragment, ReactNode, useContext, useState } from "react";
import Button from "./button";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsMailbox } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { UserContext } from "./context/userContextProvider";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Navbar: React.FC = () => {
  const { setLoginModalOpen, loginModalOpen, logout } = useContext(UserContext);
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
            <Menu as="div" className="relative inline-block text-left ml-4">
              <div>
                <Menu.Button className="flex items-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-gray-100">
                  <img
                    src={
                      userInfo?.image ? userInfo.image : "/default_avatar.png"
                    }
                    alt="Image"
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full md:object-cover object-center"
                    data-dropdown-toggle="dropdownNavbar"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          My account
                        </a>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="submit"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block w-full px-4 py-2 text-left text-sm"
                          )}
                          onClick={logout}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            // <div>
            //   <img
            //     src={userInfo?.image ? userInfo.image : "/default_avatar.png"}
            //     alt="Image"
            //     referrerPolicy="no-referrer"
            //     className="w-12 h-12 rounded-full md:ml-8 object-cover object-center"
            //     data-dropdown-toggle="dropdownNavbar"
            //   />
            // </div>
            <Button setLoginModalOpen={setLoginModalOpen}>Login</Button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
