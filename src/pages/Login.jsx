import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/AuthSlice";
import { Button, Input, Logo } from "../components/index";
import { useDispatch } from "react-redux";
import authservices from "../AppwriteAuthentication/auth_service";
import { useForm } from "react-hook-form";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const userlogin = async (data) => {
    setError("");
    console.log(data);
    try {
      const session = await authservices.login(data);
      if (session) {
        console.log("session userlogin", session);
        const userData = await authservices.getCurrentUser();
        if (userData) {
          console.log("getCurrentUser", userData);
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10 px-4">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      <form onSubmit={handleSubmit(userlogin)}>
        <div className="mb-4">
          <Input
            label="Email: "
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />
          <Input
            label="password: "
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: true,
            })}
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-indigo-500 text-white font-semibold py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          Sign In
        </Button>
      </form>
      <div className="mt-4 mb-4 text-gray-600">
        Don't have any account?{" "}
        <Link to="/signup" className="text-indigo-600 font-semibold">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Login;
