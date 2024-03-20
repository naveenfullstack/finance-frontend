import React, { useState } from "react";
import Logo from "../assets/logo.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../Api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    console.log("handleLogin function called");
    console.log(email, password);
    
    try {
      const response = await axios.post(
        api.login,
        {
          email,
          password,
        },
        {
          headers: {
            api_key: "api.key",
            authantication: "api.authantication",
          },
        }
      );
  
      console.log("Login response:", response);
  
      const data = response.data;
      const accountDetails = data.account_details;
  
      if (accountDetails && accountDetails.length > 0) {
        localStorage.setItem("_userData", JSON.stringify(data));
       navigate("/");
       console.log("Login Success");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };
  


  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="border rounded-md w-full max-w-[30rem] p-6 space-y-4">
        <div className="w-full flex justify-center">
          <img src={Logo} alt="logo" />
        </div>
        <h1 className="text-center font-primary text-[1.5rem]">Login</h1>
        <form className="space-y-4">
          <p className="font-primary">Email</p>
          <input
            type="email"
            id="email"
            placeholder="Email or phone number"
            className="p-3 rounded-lg bg-input_bg placeholder-white/[.40] w-full focus:outline-none border"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <p className="font-primary">Password</p>
          <div className="flex rounded-lg bg-input_bg p-3 border">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              className="bg-transparent placeholder-white/[.40] w-full focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={handleShowPasswordChange}
              className="opacity-default"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="flex items-center">
            <div className="w-2/4">
              <input
                type="checkbox"
                id="rememberMe"
                className="mr-2"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              <label
                htmlFor="rememberMe"
                className="opacity-default text-paragraph"
              >
                Remember Me
              </label>
            </div>
            <div className="w-2/4 flex justify-end">
              <div
                onClick={() => navigate(`/forgot-password`)}
                className="capitalize opacity-default hover:underline text-paragraph hover:cursor-pointer"
              >
                Forgot Password?
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full font-semibold bg-primary_color text-white rounded-lg p-2 py-3 capitalize"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </form>
        <h1
          onClick={() => navigate(`/signup`)}
          className="font-primary font-medium text-primary_color text-center hover:cursor-pointer"
        >
          or Register new account
        </h1>
      </div>
    </div>
  );
}
