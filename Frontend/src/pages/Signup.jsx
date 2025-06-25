import React from "react";
import { Formik, Form, Field } from "formik";
import { loginBgImg } from "../utils";
import * as Yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillGoogleCircle } from "react-icons/ai";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phoneNumber: Yup.string()
  .matches(
    /^(?:\+?\d{1,3})?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
    "Phone number is not valid"
  )
  .length(10, "Phone number must be exactly 10 digits long")
  .required("Phone number is required"),
  password: Yup.string()
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const Signup = () => {
  const navigate = useNavigate();
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div className="absolute flex items-center justify-center w-full h-screen z-0">
        <img
          src={loginBgImg}
          className="max-w-full h-full w-full object-cover object-top"
        />
      </div>
      <div className="flex justify-center items-center w-full h-full">
        <div className="absolute w-[80%] max-md:w-[90%] h-[80%] bg-black z-10 backdrop-blur-[6px] bg-black/10 rounded-2xl flex ">
          <div className="w-[50%] max-md:hidden h-full flex flex-col justify-center items-start p-16">
            <p className="text-5xl max-lg:text-3xl font-semibold ">
              Let's Get Started
            </p>
            <p className="max-lg:text-[14px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="w-[50%] h-full max-lg:w-[60%] max-md:w-full  flex  justify-center items-center bg-black/80 rounded-tr-2xl rounded-br-2xl max-sm:rounded-tl-2xl max-sm:rounded-bl-2xl">
            <Formik
              initialValues={{
                name: "",
                email: "",
                phoneNumber:"",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={SignupSchema}
              onSubmit={(values) => {
                axios
                  .post("http://localhost:3000/api/auth/signup", values)
                  .then((res) => {
                    console.log(res.data); // success message
                    Swal.fire({
                      title: "Success!",
                      text: res.data.message,
                      icon: "success",
                    });

                    navigate("/login");
                  })
                  .catch((err) => {
                    console.error(err);
                    Swal.fire({
                      title: "Error!",
                      text: err.response?.data?.message || "Signup failed",
                      icon: "error",
                    });
                  });
              }}
            >
              {({ errors, touched }) => (
                <Form className="form  w-[70%] h-auto  ">
                  <p className="text-4xl p-5">Sign up</p>

                  <div className="flex flex-col justify-center items-start  p-5">
                    <Field
                      className="w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 p-2 mb-8"
                      name="name"
                      placeholder="Your name"
                    />
                    {errors.name && touched.name && (
                      <div className="error">{errors.name}</div>
                    )}

                    <Field
                      className="w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 p-2 mb-8"
                      name="email"
                      type="email"
                      placeholder="Your email"
                    />
                    {errors.email && touched.email && (
                      <div className="error">{errors.email}</div>
                    )}

                    <Field
                      className="w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 p-2 mb-8"
                      name="phoneNumber"
                      type="tel"  // use type="tel" for phone numbers
                      placeholder="Your phone number" 
                    />
                    {errors.phoneNumber && touched.phoneNumber && (
                      <div className="error">{errors.phoneNumber}</div>
                    )}

                    <Field
                      className="w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 p-2 mb-8"
                      name="password"
                      type="password"
                      placeholder="Your password"
                    />
                    {errors.password && touched.password && (
                      <div className="error">{errors.password}</div>
                    )}

                    {/* ✅ Confirm Password Field */}
                    <Field
                      className="w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 p-2 mb-8"
                      name="confirmPassword"
                      type="password"
                      placeholder="Repeat password"
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <div className="error">{errors.confirmPassword}</div>
                    )}

                    <p className="w-full flex justify-center items-center">
                      Already have an account?{" "}
                      <a href="/login" className="pl-2">
                        Login
                      </a>
                    </p>

                    <div className="w-full flex justify-center items-center">
                      <button
                        type="submit"
                        className="bg-transparent border-2 border-white text-white py-2 px-16 mt-8 rounded-md hover:bg-white hover:text-black focus:outline-none transition-all duration-300"
                      >
                        SignUp
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>

            <div className="h-full  flex flex-col justify-center items-center">
              <div className="w-[.1px] bg-white h-52 mx-auto"></div>
              <p className="p-4 text-2xl font-semibold">OR</p>
              <div class="w-[.1px] bg-white h-52 mx-auto"></div>
            </div>
            <div className="h-full flex flex-col justify-center items-center">
              <FaFacebook className="w-[50px] h-[50px] max-lg:w-[30px]  m-4" />
              <AiFillTwitterCircle className="w-[50px] h-[50px] max-lg:w-[30px] m-4" />
              <AiFillGoogleCircle className="w-[50px] h-[50px] max-lg:w-[30px] m-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
