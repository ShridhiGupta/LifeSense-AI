import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { initializeApp } from "./utils/initializeApp";
import HomePage from "./HomePage";
import GetStarted from "./GetStarted";
import Login from "./Login";
import Features from "./Features";
import About from "./About";
import Contact from "./Contact";
import PatientForm from "./PatientForm";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import StaffSignup from "./StaffSignup";
import StaffLogin from "./StaffLogin";
import StaffDashboard from "./StaffDashboard";
import PatientLogin from "./PatientLogin";
import PatientProfile from "./PatientProfile";
import PatientChat from "./PatientChat";
import "./styles/App.css";

function App() {
  // Initialize app with default data on first load
  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/login" element={<Login />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/patient" element={<PatientForm />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/staff-signup" element={<StaffSignup />} />
          <Route path="/staff-login" element={<StaffLogin />} />
          <Route path="/staff-dashboard" element={<StaffDashboard />} />
          <Route path="/patient-login" element={<PatientLogin />} />
          <Route path="/patient-profile" element={<PatientProfile />} />
          <Route path="/patient-chat" element={<PatientChat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;