import React, { useEffect } from "react";
import { loginBgImg } from "../utils";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFailure } from "../redux/auth/authSlice";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol")
    .required("Required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = Boolean(user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === "admin") {
        navigate("/admin/dashboard/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div className="absolute flex items-center justify-center w-full h-screen z-0">
        <img
          src={loginBgImg}
          className="max-w-full h-full w-full object-cover object-top"
          alt="Login background"
        />
      </div>
      <div className="flex justify-center items-center w-full h-full">
        <div className="absolute w-[80%] max-md:w-[90%] h-[90%] bg-black z-10 backdrop-blur-[6px] bg-black/10 rounded-2xl flex ">
          <div className="w-[50%] max-md:hidden h-full flex flex-col justify-center items-start p-16">
            <p className="text-6xl max-lg:text-4xl font-semibold ">WELCOME</p>
            <p className="max-lg:text-[14px]">
              We're glad you're here. Freshly baked goodness is just a click
              away. Log in to start your sweet journey with us!
            </p>
          </div>
          <div className="w-[50%] max-md:w-full h-full flex flex-col justify-center bg-black/80 rounded-tr-2xl rounded-br-2xl max-sm:rounded-tl-2xl max-sm:rounded-bl-2xl items-start p-20 max-xl:p-10 max-lg:p-2">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={LoginSchema}
              onSubmit={(values) => {
                axios
                  .post("http://localhost:3000/api/auth/login", values)
                  .then((res) => {
                    Swal.fire({
                      title: "Login Successful!",
                      text: "Welcome back!",
                      icon: "success",
                      confirmButtonText: "OK",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        dispatch(
                          loginSuccess({
                            token: res.data.token,
                            user: res.data.user,
                          })
                        );

                        if (res.data.user.role === "admin") {
                          navigate("/admin/dashboard");
                        } else {
                          navigate("/");
                        }
                      }
                    });
                  })
                  .catch((err) => {
                    Swal.fire({
                      title: "Login Failed!",
                      text:
                        err.response?.data?.message ||
                        "Invalid email or password",
                      icon: "error",
                    }).then(() => {
                      dispatch(
                        loginFailure(
                          err.response?.data?.message || "Login failed"
                        )
                      );
                    });
                  });
              }}
            >
              {({ errors, touched }) => (
                <Form className="form w-full h-auto">
                  <p className="text-5xl p-5">Login</p>

                  <div className="flex flex-col justify-center items-start p-5">
                    <Field
                      className="w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 p-2 mb-8"
                      name="email"
                      type="email"
                      placeholder="Your email"
                    />
                    {errors.email && touched.email && (
                      <div className="error text-red-500">{errors.email}</div>
                    )}
                    <Field
                      className="border-b-2 w-full border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 p-2 mb-8"
                      name="password"
                      type="password"
                      placeholder="Your password"
                    />
                    {errors.password && touched.password && (
                      <div className="error text-red-500">
                        {errors.password}
                      </div>
                    )}
                    <p className="w-full flex justify-center items-center text-white">
                      Don't have an account?
                      <a
                        href="/signup"
                        className="pl-2 underline text-blue-400"
                      >
                        Signup
                      </a>
                    </p>
                    <div className="w-full flex justify-center items-center">
                      <button
                        type="submit"
                        className="bg-transparent border-2 border-white text-white py-2 px-16 mt-8 rounded-md hover:bg-white hover:text-black focus:outline-none transition-all duration-300"
                      >
                        Log In
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
