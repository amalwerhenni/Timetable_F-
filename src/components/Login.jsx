import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from "../assets/Login.png"; // Renommer l'image importée
import axios from "axios"; // Import axios for API requests

const Login = () => {
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
  
    try {
      const response = await axios.post("http://localhost:5500/etudiants/login", {
        email: formData.email,
        mdp: formData.password,
      });
  
      if (response.status === 200) {
        setErrorMessage(""); // Clear error message on successful submit
        console.log("Login successful:", response.data);
  
        // Extract user ID from the response
        const userId = response.data.etudiant._id; // Correctly extract the ID
        console.log("Extracted userId:", userId); // Debugging
  
        // Redirect to HomeEtudiant with user ID
        navigate("/HomeEtudiant", { state: { userId } });
      }
    } catch (error) {
      setErrorMessage("Invalid email or password");
      console.error("Error during login:", error); // Debugging
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gradient-to-r from-blue-50 via-gray-100 to-purple-50">
      {/* Left Section - Welcome Message */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white p-10 shadow-lg">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 text-center leading-snug">
          Welcome Back
        </h2>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Sign in to your account and continue managing your schedule seamlessly.
        </p>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-10 bg-gradient-to-br from-purple-600 to-blue-500 text-white shadow-inner">
        <h2 className="text-3xl lg:text-4xl font-extrabold mb-8">Login</h2>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6 bg-red-500 text-white py-2 px-4 rounded-md shadow-md">
            {errorMessage}
          </div>
        )}

        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="w-full lg:w-3/4 p-4 rounded-lg bg-gray-50 text-gray-800 mb-4 focus:outline-none focus:ring-4 focus:ring-purple-400 shadow-md"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Password Input */}
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="w-full lg:w-3/4 p-4 rounded-lg bg-gray-50 text-gray-800 mb-4 focus:outline-none focus:ring-4 focus:ring-purple-400 shadow-md"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* Remember Me */}
        <div className="w-full lg:w-3/4 flex items-center justify-between mb-6 text-sm">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="mr-2 accent-purple-600"
            />
            Remember Me
          </label>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full lg:w-3/4 py-3 rounded-lg bg-purple-700 hover:bg-purple-800 transition-all duration-300 text-white shadow-lg text-lg font-medium"
        >
          Sign In
        </button>

        {/* Register Link */}
        <p className="mt-8 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-yellow-300 hover:text-yellow-400 transition duration-200"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;