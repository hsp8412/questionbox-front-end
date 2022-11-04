import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useFormik } from "formik";
import * as Yup from "yup";
import { localLogin } from "../services/authService";
import { UserContext } from "./context/userContextProvider";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginModal: React.FC<Props> = ({ open, setOpen }) => {
  const { login, googleLogin } = useContext(UserContext);
  const { handleChange, handleBlur, errors, values, touched, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: async ({ email, password }, { resetForm }) => {
        console.log(email, password);
        const res = await login(email, password);
        resetForm();
        if (res) {
          window.location.href = "/";
        }
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .email("Please enter a valid email address.")
          .required("Email is required."),
        password: Yup.string().required("Password is required."),
      }),
    });

  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all md:w-100 sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h1"
                        className="text-indigo-600 text-5xl font-medium leading-6"
                      >
                        Sign In
                      </Dialog.Title>
                      <form className="mt-9" onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm text-left font-bold mb-2"
                            htmlFor="email"
                          >
                            Username
                          </label>
                          <input
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                              touched.email && errors.email
                                ? "border-red-600 border-2"
                                : ""
                            }`}
                            id="email"
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                          />
                          <p className="text-left text-red-500">
                            {touched.email && errors.email
                              ? errors.email
                              : null}
                          </p>
                        </div>
                        <div className="mb-6">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2 text-left"
                            htmlFor="password"
                          >
                            Password
                          </label>
                          <input
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                              touched.password && errors.password
                                ? "border-red-600 border-2"
                                : ""
                            }`}
                            id="password"
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />
                          <p className="text-left text-red-500">
                            {touched.password && errors.password
                              ? errors.password
                              : null}
                          </p>
                        </div>
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                        >
                          Login
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="mt-2">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm mt-3"
                      onClick={googleLogin}
                    >
                      <div className="min-h-full">
                        <FontAwesomeIcon
                          icon={brands("google")}
                          className="mr-2 align-middle"
                        />
                      </div>
                      Sign in with Google
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default LoginModal;
