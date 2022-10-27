import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Footer from "./components/footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div id="content" className=" mt-24 flex flex-1 justify-center">
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
