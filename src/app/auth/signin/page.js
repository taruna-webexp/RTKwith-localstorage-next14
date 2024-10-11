"use client";
import { Grid } from "@mui/joy";
import { Sheet } from "@mui/joy";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { errorMsg, successMsg } from "@/component/Toastmsg/toaster";
import FormInput from "@/component/form/InputField";

const Login = () => {
  // Hooks should be defined unconditionally
  const { control, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const router = useRouter();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res.error) {
        return errorMsg("Invalid credentials");
      } else {
        router.push("/product");
        return successMsg("Login Successfully");
      }
    } catch (error) {
      return errorMsg("Login Error");
    }
  };

  return (
    <Grid
      container
      spacing={2}
      padding={2}
      className="min-h-screen justify-center items-center"
    >
      {/* Left Image Section */}
      <Grid item xs={12} sm={6} md={4} className="flex justify-center">
        <img
          src="/assets/login2.jpg"
          alt="Login Illustration"
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </Grid>

      {/* Right Form Section */}
      <Grid item xs={12} sm={6} md={4} className="flex justify-center">
        <Sheet
          sx={{
            width: 400,
            mx: "auto",
            my: 4,
            py: 4,
            px: 3,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            borderRadius: "sm",
            boxShadow: "md",
          }}
          variant="outlined"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text-center">
              <Typography variant="h4" component="h1" className="font-bold">
                Welcome!
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Sign in to continue.
              </Typography>
            </div>

            <div className=" mt-6 mb-4">
              <FormInput
                control={control}
                name="email"
                inputType="email"
                label="Email"
                placeholder="demo@yopmail.com"
                errors=""
                className=""
              />
            </div>
            <div className="mb-4">
              <FormInput
                control={control}
                name="password"
                inputType="password"
                label="Password"
                placeholder="12345"
                errors=""
                className=""
              />
            </div>
            <div>
              <Button
                type="submit"
                className="mt-2 bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer px-6 py-2 rounded-md transition duration-300 w-full"
              >
                Login
              </Button>
            </div>
            <div className="text-center">
              {error && <p className="text-red-500">{error}</p>}
              <Typography variant="body2" className="mt-2">
                Don't have an account?{" "}
                <Link href="/sign-up" className="text-red-600 hover:underline">
                  Sign up
                </Link>
              </Typography>
            </div>
          </form>
        </Sheet>
      </Grid>
    </Grid>
  );
};

export default Login;
