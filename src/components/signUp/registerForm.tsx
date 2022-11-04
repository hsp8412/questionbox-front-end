import React from "react";
import { useFormik } from "formik";
import { createNewUser } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const RegisterForm = () => {
  const navigate = useNavigate();
  const FILE_SIZE = 5 * 1024 * 1024;
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];

  const {
    handleChange,
    handleBlur,
    errors,
    values,
    touched,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      image: null,
    },
    onSubmit: async ({ username, email, password, image }, { resetForm }) => {
      let res;
      if (image != null) {
        res = await createNewUser({ username, email, password, image });
      } else {
        res = await createNewUser({ username, email, password });
      }
      resetForm();
      if (res) {
        navigate("/");
      }
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(50, "Username must be less than 50 characters.")
        .required("Username is required."),
      email: Yup.string()
        .email("Please enter a valid email address.")
        .required("Email is required."),
      password: Yup.string()
        .required("Password is required.")
        .min(8, "The password should be at least 8 characters.")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, one uppercase letter, one lowercase, one number and one special case character"
        ),
      confirmPassword: Yup.string()
        .required("Please re-enter the password.")
        .oneOf([Yup.ref("password")], "Passwords do not match."),
      image: Yup.mixed()
        .required("A file is required")
        .test(
          "fileSize",
          "File too large",
          (value) => value && value.size <= FILE_SIZE
        )
        .test(
          "fileFormat",
          "Unsupported Format",
          (value) => value && SUPPORTED_FORMATS.includes(value.type)
        ),
    }),
  });

  return (
    <div className="container px-4 md:px-0">
      <h1 className="text-4xl font-bold text-indigo-600 mb-5 text-center">
        Sign up
      </h1>
      <div className="flex w-full justify-center my-4">
        {values.image && !errors.image ? (
          <img
            src={URL.createObjectURL(values.image)}
            alt="avatar"
            className="w-20 rounded-full"
          />
        ) : (
          <img
            src="/default_avatar.png"
            alt="avatar"
            className="w-20 rounded-full"
          />
        )}
      </div>

      <form className="w-full max-w-xl">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="default_size"
            >
              Avatar
            </label>
            <input
              className="block mb-3 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="default_size"
              type="file"
              name="image"
              onChange={(e: any) => {
                setFieldValue("image", e.currentTarget.files[0]);
              }}
              onBlur={handleBlur}
            />
            <p className="text-left text-red-500">
              {errors.image && touched.image ? errors.image : null}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Email
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
                touched.email && errors.email
                  ? "border-red-600 border-2"
                  : "border border-gray-200"
              }`}
              id="email"
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <p className="text-left text-red-500">
              {touched.email && errors.email ? errors.email : null}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
              htmlFor="grid-username"
            >
              Username
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
                touched.username && errors.username
                  ? "border-red-600 border-2"
                  : "border border-gray-200"
              }`}
              id="email"
              type="email"
              placeholder="Enter username"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            <p className="text-left text-red-500">
              {touched.username && errors.username ? errors.username : null}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
                touched.password && errors.password
                  ? "border-red-600 border-2"
                  : "border border-gray-200"
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
              {touched.password && errors.password ? errors.password : null}
            </p>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
                touched.confirmPassword && errors.confirmPassword
                  ? "border-red-600 border-2"
                  : "border border-gray-200"
              }`}
              id="confirm-password"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
            />
            <p className="text-left text-red-500">
              {touched.confirmPassword && errors.confirmPassword
                ? errors.confirmPassword
                : null}
            </p>
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
