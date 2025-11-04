import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { initializeApp } from "./utils/initializeApp.js";
import HomePage from "./HomePage.js";
import GetStarted from "./GetStarted.js";
import Login from "./Login.js";
import Features from "./Features.js";
import About from "./About.js";
import Contact from "./Contact.js";
import PatientForm from "./PatientForm.js";
import AdminLogin from "./AdminLogin.js";
import AdminDashboard from "./AdminDashboard.js";
import StaffSignup from "./StaffSignup.js";
import StaffLogin from "./StaffLogin.js";
import StaffDashboard from "./StaffDashboard.js";
import PatientLogin from "./PatientLogin.js";
import PatientProfile from "./PatientProfile.js";
import PatientChat from "./PatientChat.js";
import PrivacyPolicy from "./PrivacyPolicy.js";
import TermsOfService from "./TermsOfService.js";
import Security from "./Security.js";
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
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/security" element={<Security />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;