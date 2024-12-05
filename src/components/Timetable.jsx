import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import Sidebar from "./Sidebar";

const subjects = ["Math", "Science", "Physics", "laformatik", "ja8rafya","madania","islamia","teri5","sport", ];

const Timetable = () => {
  const [timetable, setTimetable] = useState(
    Array(6).fill(null).map(() => Array(5).fill(""))
  );
  const [selectedClass, setSelectedClass] = useState("");
  const [classes, setClasses] = useState([]);

  const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const times = ["8:30-10:00", "10:15-11:45", "12:00-13:30", "13:45-15:15", "15:30-17:00"];

  useEffect(() => {
    axios.get("http://localhost:5500/classes/all")
      .then(response => {
        setClasses(response.data);
      })
      .catch(error => {
        console.error("Error fetching classes:", error);
      });
  }, []);

  const handleClassSelect = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleCellChange = (dayIndex, timeIndex, subject) => {
    const updatedTimetable = [...timetable];
    updatedTimetable[dayIndex][timeIndex] = subject;
    setTimetable(updatedTimetable);
  };

  const saveTimetableToDatabase = async () => {
    if (!selectedClass) {
      alert("Veuillez sélectionner une classe avant de sauvegarder.");
      return;
    }

    const timetableData = {
      className: selectedClass,
      days: days,
      times: times,
      subjects: timetable,
    };

    try {
      const response = await axios.post("http://localhost:5500/timetable/add", timetableData);
      console.log("Timetable saved:", response.data);
      alert("Emploi du temps enregistré avec succès.");
    } catch (error) {
      console.error("Error saving timetable:", error);
      alert("Erreur lors de l'enregistrement de l'emploi du temps.");
    }
  };

  const downloadPDF = () => {
    if (!selectedClass) {
      alert("Veuillez sélectionner une classe avant de télécharger l'emploi du temps.");
      return;
    }

    const doc = new jsPDF("landscape");
    doc.setFontSize(16);
    doc.text("Emploi du Temps", 140, 10, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Classe: ${selectedClass}`, 20, 20);

    const tableHeaders = ["Heure", ...days];
    const tableBody = times.map((time, timeIndex) => [
      time,
      ...timetable.map((day) => day[timeIndex]),
    ]);

    doc.autoTable({
      head: [tableHeaders],
      body: tableBody,
      startY: 30,
      styles: {
        halign: "center",
        valign: "middle",
      },
      headStyles: {
        fillColor: [100, 149, 237],
        textColor: [255, 255, 255],
        fontSize: 12,
      },
      bodyStyles: {
        fontSize: 10,
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
    });

    doc.save("emploi_du_temps.pdf");

    // Save timetable to database as well
    saveTimetableToDatabase();
  };
  return (
  <div className="flex">
  <Sidebar />
  <div className="flex-grow p-6 bg-gray-100 min-h-screen">
    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Timetable</h1>

    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2">Select Class:</label>
      <select
      id="class"
        
        value={selectedClass}
        onChange={handleClassSelect}
        className="w-full p-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
      >
        <option value="">Select a class</option>
        {classes.map((classe) => (
          <option key={classe._id} value={classe._id}>
            {classe.nom}
          </option>
        ))}
      </select>
    </div>

    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b-2 border-gray-300 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Time</th>
            {days.map((day) => (
              <th key={day} className="px-4 py-2 border-b-2 border-gray-300 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map((time, timeIndex) => (
            <tr key={time}>
              <td className="px-4 py-2 border-b border-gray-300 text-sm">{time}</td>
              {days.map((day, dayIndex) => (
                <td key={dayIndex} className="px-4 py-2 border-b border-gray-300 text-sm">
                  <select
                    value={timetable[dayIndex][timeIndex]}
                    onChange={(e) => handleCellChange(dayIndex, timeIndex, e.target.value)}
                    className="w-full p-2 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    <option value="">Select subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="mt-6 text-center">
      <button
        onClick={downloadPDF}
        className="px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-lg shadow-md transition-all duration-300"
      >
        Download PDF
      </button>
    </div>
  </div>
</div>
);
};
export default Timetable;
