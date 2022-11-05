import React, { ContextType, createContext, ReactNode, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { user } from "../../interfaces/userInterface";
import {
  getUserInfo,
  localLogin,
  userLogout,
} from "../../services/authService";
import { toast } from "react-toastify";

interface Props {
  children: ReactNode;
}

interface UserInfo {
  username: string;
  email: string;
  _id: string;
  image: string;
}

interface userContextInterface {
  userInfo: UserInfo | null;
  setUserInfo: Function;
  isAuth: boolean;
  setIsAuth: Function;
  login: Function;
  logout: any;
  checkLogin: Function;
  googleLogin: any;
  loginModalOpen: boolean;
  setLoginModalOpen: any;
}

export const UserContext = createContext<userContextInterface>({
  checkLogin: () => {},
  googleLogin: () => {},
  isAuth: false,
  login: () => {},
  logout: () => {},
  setIsAuth: () => {},
  setUserInfo: () => {},
  userInfo: null,
  loginModalOpen: false,
  setLoginModalOpen: () => {},
});

export const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<user>({
    _id: "",
    email: "",
    image: "",
    username: "",
  });
  const [isAuth, setIsAuth] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);

  const checkLogin = async () => {
    const user: user | null = await getUserInfo();
    if (user) {
      setUserInfo(user);
      setIsAuth(true);
    }
  };

  const googleLogin = () => {
    if (userInfo._id != "") {
      toast.error("You are already logged in.");
      return;
    }
    window.open("http://localhost:4000/api/auth/google", "_self");
  };

  const login = async (email: string, password: string) => {
    const user: user | undefined = await localLogin(email, password);
    if (user) {
      setUserInfo(user);
      setIsAuth(true);
      return true;
    } else {
      toast.error("Login failed.");
    }
  };

  const logout = async () => {
    setUserInfo({
      _id: "",
      email: "",
      image: "",
      username: "",
    });
    setIsAuth(false);
    try {
      await userLogout();
    } catch (e) {
      toast.error("Logout failed.");
    }
  };

  const value: userContextInterface = {
    userInfo,
    setUserInfo,
    isAuth,
    setIsAuth,
    login,
    logout,
    checkLogin,
    googleLogin,
    loginModalOpen,
    setLoginModalOpen,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
