import { useState } from "react";
import Signup from "@/components/auth/Signup";
import Signin from "@/components/auth/Signin";
import HeaderTwo from "@/components/HeaderTwo";

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  return (
    <>
      <HeaderTwo />
      <div className="flex flex-row justify-center mt-10">
        <div className="w-1/3 border rounded-2xl p-6 flex flex-col gap-7">
          <h2 className="text-4xl font-bold text-blue-700 text-center">
            Vidora
          </h2>
          <div className="bg-gray-100 rounded-lg p-1 flex flex-row justify-center items-center text-center font-semibold">
            <div
              className={`${isSignIn ? "bg-white" : "text-gray-500"} w-1/2 cursor-pointer rounded-lg p-1`}
              onClick={() => {
                setIsSignIn(true);
              }}
            >
              Sign In
            </div>
            <div
              className={`${isSignIn ? "text-gray-500" : "bg-white"} w-1/2 cursor-pointer rounded-lg p-1`}
              onClick={() => {
                setIsSignIn(false);
              }}
            >
              Sign Up
            </div>
          </div>
          {isSignIn ? <Signin /> : <Signup />}
        </div>
      </div>
    </>
  );
};

export default Auth;
