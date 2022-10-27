import React from "react";
import Button from "./button";

const Landing = () => {
  return (
    <div className="container grid md:grid-cols-3 grid-cols-1 md:space-x-12 md:mt-10 mb-5 space-y-0 mb-20 space-y-8 md:space-y-0">
      <div className="flex flex-row justify-center col-span-1">
        <img src="flower_poinsettia.png" />
      </div>
      <div className="container col-span-2 shadow h-full rounded-xl shadow border p-10 flex flex-col items-center md:items-start justify-center">
        <h1 className="text-4xl text-gray-700 font-bold mb-5">Welcome!</h1>
        <p className="text-gray-500 text-lg ">
          Create your own anonymous question box today.
        </p>
        <div className="flex flex-row items-center">
          <button
            className="my-5 bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded hover:bg-indigo-400
    duration-500"
          >
            Log in
          </button>
          <a className="hover:underline ml-3" href="/">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Landing;
