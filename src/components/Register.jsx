import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Register = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    password: "",
    classe: "",
    agreeTerms: false, // Adding state for terms and conditions
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [classes, setClasses] = useState([]); // State to store fetched classes

  // Fetch the classes when the component mounts
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://localhost:5500/classes/all");
        setClasses(response.data); // Set the fetched classes to state
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

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
      await axios.post("http://localhost:5500/etudiants/create", {
        nom: formData.nom,
        email: formData.email,
        mdp: formData.password,
        classeId: formData.classe, // Sending classeId instead of classe
      });

      setSuccessMessage("Registration successful! Please log in.");
      setErrorMessage("");
      setFormData({
        nom: "",
        email: "",
        password: "",
        classe: "",
        agreeTerms: false, // Resetting terms checkbox
      });
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "Failed to register");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gradient-to-r from-blue-50 via-gray-100 to-purple-50">
      {/* Left Section - Welcome Message */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white p-10 shadow-lg">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 text-center leading-snug">
          Join Us
        </h2>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Create an account and start managing your schedule seamlessly.
        </p>
      </div>

      {/* Right Section - Register Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-10 bg-gradient-to-br from-purple-600 to-blue-500 text-white shadow-inner">
        <h2 className="text-3xl lg:text-4xl font-extrabold mb-8">Register</h2>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6 bg-red-500 text-white py-2 px-4 rounded-md shadow-md">
            {errorMessage}
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-green-500 text-white py-2 px-4 rounded-md shadow-md">
            {successMessage}
          </div>
        )}

        {/* Name Input */}
        <input
          type="text"
          name="nom"
          placeholder="Enter your name"
          className="w-full lg:w-3/4 p-4 rounded-lg bg-gray-50 text-gray-800 mb-4 focus:outline-none focus:ring-4 focus:ring-purple-400 shadow-md"
          value={formData.nom}
          onChange={handleChange}
          required
        />

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

        {/* Class Selection */}
        <select
          name="classe"
          className="w-full lg:w-3/4 p-4 rounded-lg bg-gray-50 text-gray-800 mb-4 focus:outline-none focus:ring-4 focus:ring-purple-400 shadow-md"
          value={formData.classe}
          onChange={handleChange}
          required
        >
          <option value="">Select your class</option>
          {classes.map((classe) => (
            <option key={classe._id} value={classe._id}>
              {classe.nom}
            </option>
          ))}
        </select>

        {/* Agree to Terms */}
        <div className="w-full lg:w-3/4 flex items-center justify-between mb-6 text-sm">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="mr-2 accent-purple-600"
            />
            I agree to the terms and conditions
          </label>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full lg:w-3/4 py-3 rounded-lg bg-purple-700 hover:bg-purple-800 transition-all duration-300 text-white shadow-lg text-lg font-medium"
        >
          Sign Up
        </button>

        {/* Login Link */}
        <p className="mt-8 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-yellow-300 hover:text-yellow-400 transition duration-200"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};


export default Register;
