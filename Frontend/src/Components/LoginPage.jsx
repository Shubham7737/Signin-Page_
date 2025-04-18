import React, { useState } from "react";
import axios from "axios";

function LoginPage() {
  const [signUp, setSignUp] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState(""); // For success/error message


  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle signup
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/route/signup", formData);
      console.log(response.data);
      setMessage("Signup successful! Please login.");
      setFormData({ userName: "", email: "", password: "" });
      setSignUp(false); // Switch to login
    } catch (error) {
      console.error(error);
      setMessage("Signup failed! Try again.");
    }
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
     
      
      const response = await axios.post("http://localhost:3000/route/login", formData);
      console.log(response.data);
      setMessage("Login successful!");
    } catch (error) {
      console.error(error);
      setMessage("Login failed! Invalid credentials.");
    }
  };

  return (
    <div className="box min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        {signUp ? (
          <div className="flex flex-col md:flex-row">
            {/* Left Panel */}
            <div className="md:w-1/2 bg-red-500 text-white flex flex-col items-center justify-center p-8">
              <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
              <p className="mb-4 text-sm text-center">
                To keep connected with us please login with your personal info
              </p>
              <button
                onClick={() => {
                  setSignUp(false);
                  setMessage("");
                }}
                className="bg-white text-red-500 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                SIGN IN
              </button>
            </div>

            {/* Right Panel - Signup */}
            <div className="md:w-1/2 p-8 flex flex-col justify-center items-center">
              <h1 className="text-2xl font-bold mb-4">Create an Account</h1>
              {message && <p className="text-green-600 mb-2">{message}</p>}
              <form className="w-full flex flex-col gap-3" onSubmit={handleSignUp}>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  placeholder="Name"
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Email"
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded"
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  placeholder="Password"
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded"
                />
                <button
                  type="submit"
                  className="bg-red-500 text-white p-2 rounded-lg mt-2 hover:bg-red-600 transition"
                >
                  SIGN UP
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row">
            {/* Left Panel - Login */}
            <div className="md:w-1/2 p-8 flex flex-col justify-center items-center">
              <h1 className="text-2xl font-bold mb-4">Sign In</h1>
              {message && <p className="text-green-600 mb-2">{message}</p>}
              <form className="w-full flex flex-col gap-3" onSubmit={handleLogin}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="p-2 border border-gray-300 rounded"
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="p-2 border border-gray-300 rounded"
                />
                <p className="text-sm text-right text-blue-600 cursor-pointer hover:underline">
                  Forgot your password?
                </p>
                <button
                  type="submit"
                  className="bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                >
                  SIGN IN
                </button>
              </form>
            </div>

            {/* Right Panel */}
            <div className="md:w-1/2 bg-red-500 text-white flex flex-col items-center justify-center p-8">
              <h1 className="text-3xl font-bold mb-2">Hello, Friend!</h1>
              <p className="mb-4 text-sm text-center">
                Enter your personal details and start your journey with us
              </p>
              <button
                onClick={() => {
                  setSignUp(true);
                  setMessage("");
                }}
                className="bg-white text-red-500 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                SIGN UP
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
