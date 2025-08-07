"use client";
import { UserInterface } from "@/types/UTypes";
// import { Label } from "@radix-ui/react-dropdown-menu";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Form() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserInterface>({
    email: "",
    password: "",
  });
  const [view, setView] = useState(false);
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.value;
    setUserData({
      ...userData,
      email: data,
    });
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.value;
    setUserData({
      ...userData,
      password: data,
    });
  };
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      ...userData,
      redirect: false,
    });
    if (result?.error) {
      console.error("Login error:", result.error);
    } else {
      router.push("/");
    }
  };
  return (
    <div className=" max-w-md lg:w-1/3 flex flex-wrap h-full justify-center items-center">
      <div className=" h-fit w-fit space-y-6 flex flex-wrap justify-center items-center">
        {/* <div className="text-4xl font-bold mb-4">
          <Link href={"/"}>REELSBOX</Link>
        </div> */}
        {/* <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            <CardAction>
              <Button variant="link">Sign Up</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <label htmlFor="email">Email</label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <label htmlFor="password">Password</label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" required />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </CardFooter>
        </Card> */}
        <div className="w-full max-w-md p-8 space-y-6 rounded-xl shadow-2xl">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-gray-400">
            Welcome Back!
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400">
            Log in to your account to continue.
          </p>
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  required
                  value={userData.email}
                  onChange={(e) => handleEmail(e)}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-300"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  value={userData.password}
                  onChange={(e) => handlePassword(e)}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-300"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
        {/* forget password */}
        <div className=" w-full flex justify-center">
          <a className="link link-hover dark:text-gray-300 text-gray-500">
            Forgot password?
          </a>
        </div>
        {/* register option */}
        <div className=" w-full flex justify-center">
          <p className=" dark:text-gray-300 text-gray-500">
            Don&apos;t have account?{" "}
            <Link href={"/register"} className=" text-blue-700 underline">
              regsiter now
            </Link>
          </p>
        </div>
        {/* Social Login Buttons */}
        <div className="mt-6 text-center h-fit self-center">
          <p className="text-gray-500 mb-3">Or sign in with:</p>
          <div className="flex justify-center gap-4">
            {/* Google Login Button */}
            <button
              onClick={() => signIn("google")}
              className="flex items-center px-5 py-2 border border-gray-300 rounded-lg shadow-xs text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
              // disabled={loading}
            >
              <Image
                src="https://www.svgrepo.com/show/448224/facebook.svg"
                alt="Facebook"
                className="w-5 h-5 mr-2"
                width={20}
                height={20}
              />
              Facebook
            </button>
            <button
              onClick={() => signIn("google")}
              className="flex items-center px-5 py-2 border border-gray-300 rounded-lg shadow-xs text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
              // disabled={loading}
            >
              <Image
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
                width={20}
                height={20}
              />
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
