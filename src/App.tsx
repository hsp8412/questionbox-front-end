import React, { useContext, useEffect } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Footer from "./components/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "./components/context/userContextProvider";

function App() {
  const { checkLogin } = useContext(UserContext);

  useEffect(() => {
    const getUserInfo = async () => {
      console.log(checkLogin);
      await checkLogin();
    };
    getUserInfo();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div id="content" className=" mt-24 flex flex-1 justify-center">
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
