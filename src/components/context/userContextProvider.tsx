import React, { ContextType, createContext, ReactNode, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { user } from "../../interfaces/userInterface";
import {
  getUserInfo,
  localLogin,
  userLogout,
} from "../../services/authService";

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
  isAuth: Boolean;
  setIsAuth: Function;
  login: Function;
  logout: Function;
  checkLogin: Function;
  googleLogin: any;
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
});

export const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<user>({
    _id: "",
    email: "",
    image: "",
    username: "",
  });
  const [isAuth, setIsAuth] = useState(false);

  const checkLogin = async () => {
    const user: user | null = await getUserInfo();
    if (user) {
      setUserInfo(user);
      setIsAuth(true);
    }
  };

  const googleLogin = () => {
    window.open("http://localhost:4000/api/auth/google", "_self");
  };

  const login = async (email: string, password: string) => {
    const user: user | undefined = await localLogin(email, password);
    if (user) {
      setUserInfo(user);
      setIsAuth(true);
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
    await userLogout();
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
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
