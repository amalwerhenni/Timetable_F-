import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import MenuPage from './components/MenuPage'
import Login from "./components/Login";
import LoginAdmin from "./components/LoginAdmin";
import Register from "./components/Register";
import Timetable from "./components/Timetable";
import AdminDashboard from "./components/AdminDashboard";
import Sidebar from "./components/Sidebar";
import HomeEtudiant from "./components/HomeEtudiant";
import ClassesPage from "./components/ClassesPage";
import Edittable from "./components/Edittable";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< MenuPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/LoginAdmin" element={<LoginAdmin/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/emploi" element={<Timetable/>} />
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/side" element={<Sidebar/>} />
        <Route path="/HomeEtudiant" element={<HomeEtudiant/>} />
        <Route path="/classes" element={<ClassesPage/>} />
        <Route path="/Edittable" element={<Edittable/>} />

      </Routes>
    </BrowserRouter>
  );
}


export default App;