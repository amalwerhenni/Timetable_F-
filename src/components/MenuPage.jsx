import React from "react";
import { Link } from "react-router-dom";

const MenuHome = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gradient-to-r from-blue-50 to-gray-100">
    {/* Left Section - Text and Call to Action */}
    <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white p-10 shadow-2xl">
      <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800 mb-6 text-center leading-snug">
        Plateforme de Gestion des Étudiants <br /> et Emploi du Temps
      </h2>
      <p className="text-lg text-gray-600 mb-8 text-center leading-relaxed">
        Simplifiez la gestion de vos emplois du temps et accédez facilement à toutes les informations nécessaires.
      </p>
      <Link to="/login">
        <button className="w-full lg:w-3/4 bg-gradient-to-r from-[#b24c6a] to-[#9e2145] text-white py-3 rounded-lg shadow-lg hover:from-[#9e2145] hover:to-[#7e1a37] transition-transform transform hover:scale-105">
          Consulter votre emploi du temps
        </button>
      </Link>
    </div>
  
    {/* Right Section - Animation */}
    <div className="w-full lg:w-1/2 flex justify-center items-center p-8">
    <img
      src="https://via.placeholder.com/600x400" // Replace this URL with your own image
      alt="Gestion Illustration"
      className="w-full h-auto max-w-md lg:max-w-full rounded-lg shadow-lg"
    />
  </div>
  </div>

  );
  };

  export default MenuHome;