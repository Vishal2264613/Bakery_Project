import React from 'react'
import { loginBgImg } from '../utils'
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
  const navigate = useNavigate();
  return (
    <section className="relative w-full h-screen overflow-hidden">
         <div className="absolute flex items-center justify-center w-full h-screen z-0">
            <img src={loginBgImg} className="max-w-full h-auto" />
         </div>
        <div className='flex justify-center items-center w-full h-full'>
        <div className='absolute w-[80%] h-[80%] bg-black z-10 backdrop-blur-[6px] bg-black/10 rounded-2xl flex '>
            <div className='w-[50%] h-full flex flex-col justify-center items-start p-16'>
                <p className='text-6xl font-semibold '>WELCOME</p>
                <p className=''>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div className='w-[50%] h-full flex flex-col justify-center bg-black/80 rounded-tr-2xl rounded-br-2xl items-start p-20'>
            <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validationSchema={LoginSchema}
                  onSubmit={(values) => {
                    axios
                      .post("http://localhost:3000/api/auth/login", values)
                      .then((res) => {
                        console.log(res.data); // Logged in user info or token
                        Swal.fire({
                          title: "Login Successful!",
                          text: "Welcome back!",
                          icon: "success",
                          confirmButtonText: 'OK'
                        }).then((result) => {
                          if (result.isConfirmed) {
                            // Redirect to home page
                            dispatch(loginSuccess({
                              token: res.data.token,
                              user: res.data.user,
                            }));
                            navigate("/home"); 
                          }
                        });

                        // Optional: Save token or user to localStorage or Redux
                        // localStorage.setItem("token", res.data.token);

                      // or home page
                      })
                      .catch((err) => {
                        console.error(err);
                        Swal.fire({
                          title: "Login Failed!",
                          text:
                            err.response?.data?.message ||
                            "Invalid email or password",
                          icon: "error",
                        }).then((result) => {
                          if (result.isDismissed) {
                            // Redirect to home page
                            dispatch(loginFailure(error.response?.data?.message || "Login failed"));
                            
                          }
                        });
                      });
                  }}
                >
                  {({ errors, touched }) => (
                    <Form className="form  w-full h-auto">
                      
                        <p className='text-5xl p-5'>Login</p>
                      
                      <div className="flex flex-col justify-center items-start p-5">
                        <Field
                          className="w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 p-2 mb-8"
                          name="email"
                          type="email"
                          placeholder="Your email"
                        />
                        {errors.email && touched.email ? (
                          <div className="error">{errors.email}</div>
                        ) : null}
                        <Field
                          className="border-b-2 w-full border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 p-2 mb-8"
                          name="password"
                          type="password"
                          placeholder="Your password"
                        />
                        {errors.password && touched.password ? (
                          <div className="error">{errors.password}</div>
                        ) : null}
                        <p className='w-full flex justify-center items-center'>
                          Don't have an account? <a href="/" className='pl-2'>Signup</a>
                        </p>
                        <div className="w-full flex justify-center items-center">
                          <button type="submit" className="bg-transparent border-2 border-white text-white py-2 px-16 mt-8 rounded-md hover:bg-white hover:text-black focus:outline-none transition-all duration-300">Log In</button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>                                 
            </div>
        </div>
        </div>
    </section>
  )
}

export default Login