import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginN from "../assets/Login.png"; // Ensure the image path is correct

const LoginAdmin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errorMessage, setErrorMessage] = useState("");
  
  const navigate = useNavigate(); // Use the navigate hook for redirection

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    try {
      // Check if the email and password match the predefined credentials
      if (email === "admin@admin.com" && password === "admin") {
        setErrorMessage("");  // Clear error message on successful submit
        console.log("User logged in successfully:", formData);
        
        // Redirect to the HomeEtudiant page
        navigate("/admin");
      } else {
        setErrorMessage("Invalid email or password."); // Error message for wrong credentials
      }
    } catch (error) {
      setErrorMessage("Login failed, please try again.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-blue-50 via-gray-100 to-purple-50">
   

    <div className="flex flex-col lg:flex-row h-full">
      {/* Left Section - Welcome Message */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white p-10 shadow-lg">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 text-center leading-snug">
          Admin Portal
        </h2>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Sign in to manage the system and oversee operations.
        </p>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-10 bg-gradient-to-br from-purple-600 to-blue-500 text-white shadow-inner">
        <h2 className="text-3xl lg:text-4xl font-extrabold mb-8">Admin Login</h2>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6 bg-red-500 text-white py-2 px-4 rounded-md shadow-md">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full lg:w-3/4">
          {/* Email Input */}
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full p-4 rounded-lg bg-gray-50 text-gray-800 mb-4 focus:outline-none focus:ring-4 focus:ring-purple-400 shadow-md"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Password Input */}
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full p-4 rounded-lg bg-gray-50 text-gray-800 mb-4 focus:outline-none focus:ring-4 focus:ring-purple-400 shadow-md"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-purple-700 hover:bg-purple-800 transition-all duration-300 text-white shadow-lg text-lg font-medium"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  </div>
);
};

export default LoginAdmin;
