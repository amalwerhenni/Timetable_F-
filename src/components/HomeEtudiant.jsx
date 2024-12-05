import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const HomeEtudiant = () => {
  const location = useLocation();
  const { userId } = location.state || {};
  const [userDetails, setUserDetails] = useState(null);
  const [timetable, setTimetable] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetailsAndTimetable = async () => {
      try {
        // Fetch user details
        const response = await fetch(`http://localhost:5500/etudiants/${userId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch user details: ${response.statusText}`);
        }
        const userData = await response.json();
        setUserDetails(userData);
        console.log("User details fetched:", userData);

        // Fetch timetable based on class name
        const className = userData.classe.nom;
        const timetableData = await fetchTimetable(className);
        console.log("Timetable fetched:", timetableData);
        setTimetable(timetableData);
      } catch (error) {
        setError(error.message || "An error occurred");
        console.error("Error:", error);
      }
    };

    if (userId) {
      fetchUserDetailsAndTimetable();
    }
  }, [userId]);

  const fetchTimetable = async (className) => {
    try {
      const response = await fetch(`http://localhost:5500/timetable/get/${className}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch timetable: ${response.statusText}`);
      }
      const data = await response.json();
      return data; // Return the fetched timetable data
    } catch (error) {
      console.error("Error fetching timetable:", error);
      throw error;
    }
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!userId) {
    return <div className="text-yellow-500">No user ID provided. Please log in again.</div>;
  }

  if (!userDetails || !timetable) {
    return <div className="text-gray-500">Loading...</div>;
  }

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
  <h1 className="text-4xl font-extrabold text-blue-800 mb-6 text-center">
    Welcome, <span className="underline decoration-blue-400">{userDetails.nom}</span>
  </h1>
  <p className="text-xl text-gray-700 mb-8 text-center">
    Your class is: <span className="font-semibold text-blue-700">{userDetails.classe.nom}</span>
  </p>

  <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center underline decoration-gray-400">
    Timetable
  </h2>

  <div className="overflow-x-auto shadow-lg border border-gray-300 rounded-xl bg-white">
    <div className="grid grid-cols-7 gap-2 p-4">
      {/* Days header */}
      <div className="flex justify-center items-center col-span-1"></div>
      {timetable.days.map((day, index) => (
  <div
    key={index}
    className="text-center font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:from-purple-500 hover:to-blue-500"
  >
    {day}
  </div>
))}

{/* Time slots and subjects */}
{timetable.times.map((time, timeIndex) => (
  <div key={timeIndex} className="col-span-1 flex flex-col">
    {/* Time slots */}
    <div className="text-center font-semibold text-gray-800 bg-gray-200 py-3 rounded-lg mb-2 shadow-md">
      {time}
    </div>
    {/* Subjects */}
    {timetable.subjects.map((subjects, subjectIndex) => (
      <div
        key={subjectIndex + timeIndex}
        className="text-center text-gray-700 py-2 border-t border-gray-300 hover:bg-gray-200 rounded transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        {subjects[timeIndex] ? (
          <span className="font-medium text-blue-600">{subjects[timeIndex]}</span>
        ) : (
          <span className="italic text-gray-400">No class</span>
        )}
      </div>
    ))}
  </div>
))}
    </div>
  </div>
</div>

);
};

export default HomeEtudiant;
