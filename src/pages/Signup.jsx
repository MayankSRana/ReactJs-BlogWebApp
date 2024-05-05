import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import authservices from "../AppwriteAuthentication/auth_service";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/AuthSlice";
import { Button, Input, Logo } from "../components/index";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const signup = async (data) => {
    setError("");
    console.log("signup form data", data);
    try {
      const userData = await authservices.createAccount(data);
      console.log("createAccount", userData);
      if (userData) {
        const dataUser = await authservices.getCurrentUser();
        console.log("get current user", dataUser);
        if (dataUser) {
          dispatch(login(dataUser));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4">
      <h2 className="text-2xl font-semibold mb-4">Signup</h2>

      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

      <form onSubmit={handleSubmit(signup)}>
        <div className="mb-4">
          <Input
            label="Full Name: "
            placeholder="Enter your full name"
            {...register("name", {
              required: true,
            })}
          />

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

        <div className="mt-4 mb-4 text-gray-600">
          <Button
            type="submit"
            className="w-full bg-indigo-500 text-white font-semibold py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            Create Account
          </Button>
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
