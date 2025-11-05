import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "./config/api.js";
import { migrateLocalPatientsToBackend } from "./utils/migratePatients.js";

function StaffDashboard() {
  const [activeTab, setActiveTab] = useState("view-patients");
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMigrating, setIsMigrating] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [patientForm, setPatientForm] = useState({
    name: "",
    age: "",
    gender: "",
    condition: "",
    surgeryDetails: "",
    recoveryPeriod: "",
    currentStage: "",
    doctorsNotes: "",
    medications: "",
    prescription: "",
    exercises: "",
    diet: ""
  });
  const [editingPatientId, setEditingPatientId] = useState(null);
  const [expandedPatientId, setExpandedPatientId] = useState(null);
  const [staffInfo, setStaffInfo] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    password: "",
    department: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if staff is logged in
    const staffSession = localStorage.getItem("staffSession");
    if (!staffSession) {
      navigate("/staff-login");
      return;
    }

    const session = JSON.parse(staffSession);
    setStaffInfo(session);
    setProfileData({
      name: session.name,
      email: session.email,
      password: session.password || "",
      department: session.department
    });
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      // Try to load from API first
      const response = await fetch(API_ENDPOINTS.ADMIN_PATIENTS);
      const data = await response.json();
      
      if (data.success && data.patients) {
        setPatients(data.patients);
        // Also sync to localStorage for backward compatibility
        localStorage.setItem("allPatients", JSON.stringify(data.patients));
      } else {
        // Fallback to localStorage if API fails
        const allPatients = JSON.parse(localStorage.getItem("allPatients") || "[]");
        setPatients(allPatients);
      }
    } catch (error) {
      console.error("Error loading patients:", error);
      // Fallback to localStorage
      const allPatients = JSON.parse(localStorage.getItem("allPatients") || "[]");
      setPatients(allPatients);
    }
  };

  const handlePatientFormChange = (e) => {
    const { name, value } = e.target;
    setPatientForm(prev => ({ ...prev, [name]: value }));
  };

  const generatePatientId = () => {
    return Math.floor(1000000 + Math.random() * 9000000).toString();
  };

  const handlePatientSubmit = async (e) => {
    e.preventDefault();
    
    if (editingPatientId) {
      // Update existing patient
      const updatedPatients = patients.map(p => 
        p.id === editingPatientId || p._id === editingPatientId
          ? { ...p, ...patientForm, updatedAt: new Date().toISOString(), updatedBy: staffInfo.name }
          : p
      );
      setPatients(updatedPatients);
      localStorage.setItem("allPatients", JSON.stringify(updatedPatients));
      
      alert("Patient information updated successfully!");
      setEditingPatientId(null);
      setActiveTab("view-patients");
    } else {
      // Add new patient
      try {
        const patientId = generatePatientId();
        const newPatientData = {
          patientId: patientId,
          name: patientForm.name,
          age: patientForm.age,
          gender: patientForm.gender,
          condition: patientForm.condition,
          surgeryDetails: patientForm.surgeryDetails,
          recoveryPeriod: patientForm.recoveryPeriod,
          currentStage: patientForm.currentStage,
          doctorsNotes: patientForm.doctorsNotes,
          medications: patientForm.medications,
          exercises: patientForm.exercises,
          diet: patientForm.diet,
          addedBy: staffInfo.name,
          addedByEmail: staffInfo.email
        };

        // Save to backend API
        const response = await fetch(API_ENDPOINTS.ADMIN_PATIENTS, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPatientData),
        });

        const data = await response.json();

        if (data.success) {
          // Reload patients from backend
          await loadPatients();
          alert(`Patient added successfully! Patient ID: ${patientId}\n\nPlease share this ID with the patient for login.`);
        } else {
          // Fallback to localStorage if API fails
          const newPatient = {
            id: patientId,
            ...newPatientData,
            addedAt: new Date().toISOString()
          };
          const updatedPatients = [...patients, newPatient];
          setPatients(updatedPatients);
          localStorage.setItem("allPatients", JSON.stringify(updatedPatients));
          alert(`Patient added successfully (saved locally)! Patient ID: ${patientId}\n\nPlease share this ID with the patient for login.`);
        }
      } catch (error) {
        console.error("Error adding patient:", error);
        // Fallback to localStorage
        const patientId = generatePatientId();
        const newPatient = {
          id: patientId,
          patientId: patientId,
          ...patientForm,
          addedBy: staffInfo.name,
          addedByEmail: staffInfo.email,
          addedAt: new Date().toISOString()
        };
        const updatedPatients = [...patients, newPatient];
        setPatients(updatedPatients);
        localStorage.setItem("allPatients", JSON.stringify(updatedPatients));
        alert(`Patient added successfully (saved locally)! Patient ID: ${patientId}\n\nPlease share this ID with the patient for login.`);
      }
    }

    // Reset form
    setPatientForm({
      name: "",
      age: "",
      gender: "",
      condition: "",
      surgeryDetails: "",
      recoveryPeriod: "",
      currentStage: "",
      doctorsNotes: "",
      medications: "",
      prescription: "",
      exercises: "",
      diet: ""
    });
  };

  const editPatient = (patient) => {
    setPatientForm({
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      condition: patient.condition,
      surgeryDetails: patient.surgeryDetails,
      recoveryPeriod: patient.recoveryPeriod,
      currentStage: patient.currentStage,
      doctorsNotes: patient.doctorsNotes,
      medications: patient.medications,
      prescription: patient.prescription,
      exercises: patient.exercises,
      diet: patient.diet
    });
    setEditingPatientId(patient._id || patient.id);
    setActiveTab("add-patient");
  };

  const cancelEdit = () => {
    setEditingPatientId(null);
    setPatientForm({
      name: "",
      age: "",
      gender: "",
      condition: "",
      surgeryDetails: "",
      recoveryPeriod: "",
      currentStage: "",
      doctorsNotes: "",
      medications: "",
      prescription: "",
      exercises: "",
      diet: ""
    });
  };

  const deletePatient = (patientId) => {
    if (window.confirm("Are you sure you want to delete this patient? This action cannot be undone.")) {
      const updatedPatients = patients.filter(p => (p._id || p.id) !== patientId);
      setPatients(updatedPatients);
      localStorage.setItem("allPatients", JSON.stringify(updatedPatients));
    }
  };

  const togglePatientDetails = (patientId) => {
    setExpandedPatientId(expandedPatientId === patientId ? null : patientId);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const saveProfile = (e) => {
    e.preventDefault();
    
    // Update staff info in approvedStaff
    const approvedStaff = JSON.parse(localStorage.getItem("approvedStaff") || "[]");
    const updatedStaff = approvedStaff.map(staff => 
      staff.id === staffInfo.id 
        ? { ...staff, ...profileData, updatedAt: new Date().toISOString() }
        : staff
    );
    localStorage.setItem("approvedStaff", JSON.stringify(updatedStaff));
    
    // Update session
    const updatedSession = { ...staffInfo, ...profileData };
    localStorage.setItem("staffSession", JSON.stringify(updatedSession));
    setStaffInfo(updatedSession);
    setEditingProfile(false);
    alert("Profile updated successfully!");
  };

  const handleMigration = async () => {
    if (!window.confirm("This will migrate all patients from local storage to the database. Continue?")) {
      return;
    }
    
    setIsMigrating(true);
    try {
      const result = await migrateLocalPatientsToBackend();
      if (result.success) {
        alert(`Migration complete!\nTotal: ${result.total}\nMigrated: ${result.migrated}\nFailed: ${result.failed}`);
        await loadPatients(); // Reload patients from backend
      } else {
        alert(`Migration failed: ${result.error}`);
      }
    } catch (error) {
      alert(`Migration error: ${error.message}`);
    } finally {
      setIsMigrating(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("staffSession");
    navigate("/");
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (patient.patientId && patient.patientId.includes(searchQuery))
  );

  const inputStyle = {
    width: "100%",
    padding: "0.875rem",
    borderRadius: "0.75rem",
    border: "2px solid #E2E8F0",
    fontSize: "0.95rem",
    boxSizing: "border-box",
    fontFamily: "'Poppins', 'Inter', sans-serif",
    outline: "none",
    marginBottom: "1rem"
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: "120px",
    resize: "vertical"
  };

  const buttonStyle = {
    background: "#007bff",
    color: "#fff",
    border: "none",
    padding: "0.875rem 2rem",
    borderRadius: "0.75rem",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: "600",
    boxShadow: "0 4px 12px rgba(0,123,255,0.3)"
  };

  const cardStyle = {
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "1rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    marginBottom: "1.5rem"
  };

  if (!staffInfo) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#F7FAFC",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Poppins', 'Inter', sans-serif"
      }}>
        <div style={{ fontSize: "1.2rem", color: "#1A202C" }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F7FAFC",
      fontFamily: "'Poppins', 'Inter', sans-serif",
      display: "flex"
    }}>
      {/* Sidebar */}
      <div style={{
        width: isSidebarCollapsed ? "70px" : "260px",
        background: "#fff",
        boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        height: "100vh",
        zIndex: 100,
        transition: "width 0.3s ease",
        overflow: "hidden"
      }}>
        {/* Logo */}
        <div style={{
          padding: "1.5rem",
          borderBottom: "1px solid #E2E8F0",
          position: "relative"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: isSidebarCollapsed ? "center" : "flex-start" }}>
            <span style={{ fontSize: "1.5rem" }}>🩺</span>
            {!isSidebarCollapsed && (
              <span style={{ fontSize: "1.25rem", fontWeight: "700", color: "#007bff" }}>LifeSense AI</span>
            )}
          </div>
          {/* Toggle Button */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            style={{
              position: "absolute",
              right: isSidebarCollapsed ? "50%" : "10px",
              top: "50%",
              transform: isSidebarCollapsed ? "translate(50%, -50%)" : "translateY(-50%)",
              background: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: "28px",
              height: "28px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.875rem",
              boxShadow: "0 2px 6px rgba(0,123,255,0.3)",
              transition: "all 0.3s ease",
              zIndex: 10
            }}
            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isSidebarCollapsed ? "→" : "←"}
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: "1rem 0" }}>
          <button
            onClick={() => setActiveTab("dashboard")}
            style={{
              width: "100%",
              padding: "0.875rem 1.5rem",
              border: "none",
              background: activeTab === "dashboard" ? "#E3F2FD" : "transparent",
              color: activeTab === "dashboard" ? "#007bff" : "#64748b",
              textAlign: "left",
              cursor: "pointer",
              fontSize: "0.95rem",
              fontWeight: activeTab === "dashboard" ? "600" : "500",
              display: "flex",
              alignItems: "center",
              justifyContent: isSidebarCollapsed ? "center" : "flex-start",
              gap: "0.75rem",
              transition: "all 0.2s"
            }}
            title={isSidebarCollapsed ? "Dashboard" : ""}
          >
            <span style={{ fontSize: "1.25rem" }}>🏠</span>
            {!isSidebarCollapsed && "Dashboard"}
          </button>
          <button
            onClick={() => setActiveTab("view-patients")}
            style={{
              width: "100%",
              padding: "0.875rem 1.5rem",
              border: "none",
              background: activeTab === "view-patients" ? "#E3F2FD" : "transparent",
              color: activeTab === "view-patients" ? "#007bff" : "#64748b",
              textAlign: "left",
              cursor: "pointer",
              fontSize: "0.95rem",
              fontWeight: activeTab === "view-patients" ? "600" : "500",
              display: "flex",
              alignItems: "center",
              justifyContent: isSidebarCollapsed ? "center" : "flex-start",
              gap: "0.75rem",
              transition: "all 0.2s"
            }}
            title={isSidebarCollapsed ? `Patients (${patients.length})` : ""}
          >
            <span style={{ fontSize: "1.25rem" }}>👥</span>
            {!isSidebarCollapsed && `Patients (${patients.length})`}
          </button>
          <button
            onClick={() => setActiveTab("add-patient")}
            style={{
              width: "100%",
              padding: "0.875rem 1.5rem",
              border: "none",
              background: activeTab === "add-patient" ? "#E3F2FD" : "transparent",
              color: activeTab === "add-patient" ? "#007bff" : "#64748b",
              textAlign: "left",
              cursor: "pointer",
              fontSize: "0.95rem",
              fontWeight: activeTab === "add-patient" ? "600" : "500",
              display: "flex",
              alignItems: "center",
              justifyContent: isSidebarCollapsed ? "center" : "flex-start",
              gap: "0.75rem",
              transition: "all 0.2s"
            }}
            title={isSidebarCollapsed ? "Add Patient" : ""}
          >
            <span style={{ fontSize: "1.25rem" }}>➕</span>
            {!isSidebarCollapsed && "Add Patient"}
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            style={{
              width: "100%",
              padding: "0.875rem 1.5rem",
              border: "none",
              background: activeTab === "analytics" ? "#E3F2FD" : "transparent",
              color: activeTab === "analytics" ? "#007bff" : "#64748b",
              textAlign: "left",
              cursor: "pointer",
              fontSize: "0.95rem",
              fontWeight: activeTab === "analytics" ? "600" : "500",
              display: "flex",
              alignItems: "center",
              justifyContent: isSidebarCollapsed ? "center" : "flex-start",
              gap: "0.75rem",
              transition: "all 0.2s"
            }}
            title={isSidebarCollapsed ? "Analytics" : ""}
          >
            <span style={{ fontSize: "1.25rem" }}>📈</span>
            {!isSidebarCollapsed && "Analytics"}
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            style={{
              width: "100%",
              padding: "0.875rem 1.5rem",
              border: "none",
              background: activeTab === "settings" ? "#E3F2FD" : "transparent",
              color: activeTab === "settings" ? "#007bff" : "#64748b",
              textAlign: "left",
              cursor: "pointer",
              fontSize: "0.95rem",
              fontWeight: activeTab === "settings" ? "600" : "500",
              display: "flex",
              alignItems: "center",
              justifyContent: isSidebarCollapsed ? "center" : "flex-start",
              gap: "0.75rem",
              transition: "all 0.2s"
            }}
            title={isSidebarCollapsed ? "Settings" : ""}
          >
            <span style={{ fontSize: "1.25rem" }}>⚙️</span>
            {!isSidebarCollapsed && "Settings"}
          </button>
        </nav>

        {/* Logout Button */}
        <div style={{ padding: "1rem", borderTop: "1px solid #E2E8F0" }}>
          <button
            onClick={logout}
            style={{
              width: "100%",
              padding: "0.875rem",
              background: "#EF4444",
              color: "#fff",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.95rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem"
            }}
            title={isSidebarCollapsed ? "Logout" : ""}
          >
            <span>🔴</span>
            {!isSidebarCollapsed && "Logout"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: isSidebarCollapsed ? "70px" : "260px", flex: 1, transition: "margin-left 0.3s ease" }}>
        {/* Top Header */}
        <div style={{
          background: "#fff",
          padding: "1.5rem 2rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          borderBottom: "1px solid #E2E8F0"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h1 style={{ margin: 0, color: "#1A202C", fontSize: "1.75rem", fontWeight: "700" }}>
                Staff Dashboard
              </h1>
              <p style={{ margin: "0.5rem 0 0 0", color: "#64748b", fontSize: "1rem" }}>
                Welcome, <span style={{ fontWeight: "600", color: "#007bff" }}>{staffInfo?.name}</span> ({staffInfo?.department})
              </p>
            </div>
            {activeTab === "view-patients" && (
              <div style={{ position: "relative", width: "300px" }}>
                <input
                  type="text"
                  placeholder="🔍 Search patients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    borderRadius: "0.5rem",
                    border: "2px solid #E2E8F0",
                    fontSize: "0.95rem",
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div style={{ padding: "2rem", maxWidth: "1400px", margin: "0 auto" }}>
          {/* Dashboard Overview */}
          {activeTab === "dashboard" && (
            <div>
              {/* Stats Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem", marginBottom: "2rem" }}>
                <div style={{
                  background: "#fff",
                  padding: "1.5rem",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🩺</div>
                  <div style={{ fontSize: "0.875rem", color: "#64748b", marginBottom: "0.5rem" }}>Total Patients</div>
                  <div style={{ fontSize: "2rem", fontWeight: "700", color: "#007bff" }}>{patients.length}</div>
                </div>
                <div style={{
                  background: "#fff",
                  padding: "1.5rem",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>👨‍⚕️</div>
                  <div style={{ fontSize: "0.875rem", color: "#64748b", marginBottom: "0.5rem" }}>Active Cases</div>
                  <div style={{ fontSize: "2rem", fontWeight: "700", color: "#10b981" }}>{patients.length}</div>
                </div>
                <div style={{
                  background: "#fff",
                  padding: "1.5rem",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📊</div>
                  <div style={{ fontSize: "0.875rem", color: "#64748b", marginBottom: "0.5rem" }}>Recovery Rate</div>
                  <div style={{ fontSize: "2rem", fontWeight: "700", color: "#8b5cf6" }}>87%</div>
                </div>
                <div style={{
                  background: "#fff",
                  padding: "1.5rem",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>⏰</div>
                  <div style={{ fontSize: "0.875rem", color: "#64748b", marginBottom: "0.5rem" }}>This Month</div>
                  <div style={{ fontSize: "2rem", fontWeight: "700", color: "#f59e0b" }}>{patients.length}</div>
                </div>
              </div>

              {/* Recent Patients */}
              <div style={{
                background: "#fff",
                padding: "1.5rem",
                borderRadius: "1rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
              }}>
                <h3 style={{ margin: "0 0 1rem 0", color: "#1A202C", fontSize: "1.25rem", fontWeight: "700" }}>
                  Recent Patients
                </h3>
                {patients.slice(0, 5).map(patient => (
                  <div key={patient.id} style={{
                    padding: "1rem",
                    borderBottom: "1px solid #E2E8F0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <div>
                      <div style={{ fontWeight: "600", color: "#1A202C" }}>{patient.name}</div>
                      <div style={{ fontSize: "0.875rem", color: "#64748b" }}>{patient.condition}</div>
                    </div>
                    <button
                      onClick={() => setActiveTab("view-patients")}
                      style={{
                        background: "#007bff",
                        color: "#fff",
                        border: "none",
                        padding: "0.5rem 1rem",
                        borderRadius: "0.5rem",
                        cursor: "pointer",
                        fontSize: "0.875rem"
                      }}
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add Patient Form */}
          {activeTab === "add-patient" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h2 style={{ color: "#1e293b", margin: 0 }}>{editingPatientId ? "Edit Patient" : "Add New Patient"}</h2>
              {editingPatientId && (
                <button
                  onClick={cancelEdit}
                  style={{
                    background: "#6b7280",
                    color: "#fff",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.25rem",
                    cursor: "pointer",
                    fontSize: "0.875rem"
                  }}
                >
                  Cancel Edit
                </button>
              )}
            </div>
            <div style={cardStyle}>
              <form onSubmit={handlePatientSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: "500" }}>
                      Patient Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={patientForm.name}
                      onChange={handlePatientFormChange}
                      style={inputStyle}
                      placeholder="Enter patient name"
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: "500" }}>
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={patientForm.age}
                      onChange={handlePatientFormChange}
                      style={inputStyle}
                      placeholder="Enter age"
                      required
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: "500" }}>
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={patientForm.gender}
                      onChange={handlePatientFormChange}
                      style={inputStyle}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: "500" }}>
                      Condition/Disease
                    </label>
                    <input
                      type="text"
                      name="condition"
                      value={patientForm.condition}
                      onChange={handlePatientFormChange}
                      style={inputStyle}
                      placeholder="Enter medical condition"
                      required
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: "500" }}>
                      Surgery Details
                    </label>
                    <input
                      type="text"
                      name="surgeryDetails"
                      value={patientForm.surgeryDetails}
                      onChange={handlePatientFormChange}
                      style={inputStyle}
                      placeholder="Enter surgery type/date"
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: "500" }}>
                      Recovery Period
                    </label>
                    <input
                      type="text"
                      name="recoveryPeriod"
                      value={patientForm.recoveryPeriod}
                      onChange={handlePatientFormChange}
                      style={inputStyle}
                      placeholder="e.g., 2.5 months"
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: "500" }}>
                      Current Stage
                    </label>
                    <input
                      type="text"
                      name="currentStage"
                      value={patientForm.currentStage}
                      onChange={handlePatientFormChange}
                      style={inputStyle}
                      placeholder="e.g., Week 3 (mild swelling)"
                    />
                  </div>
                  <div style={{ visibility: "hidden" }}>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: "500" }}>
                    Doctor's Notes
                  </label>
                  <textarea
                    name="doctorsNotes"
                    value={patientForm.doctorsNotes}
                    onChange={handlePatientFormChange}
                    style={textareaStyle}
                    placeholder="Enter doctor's notes and recommendations"
                  />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: "500" }}>
                    Medications
                  </label>
                  <textarea
                    name="medications"
                    value={patientForm.medications}
                    onChange={handlePatientFormChange}
                    style={textareaStyle}
                    placeholder="Enter current medications and dosages"
                  />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: "500" }}>
                    Prescription Details
                  </label>
                  <textarea
                    name="prescription"
                    value={patientForm.prescription}
                    onChange={handlePatientFormChange}
                    style={textareaStyle}
                    placeholder="Enter prescription details"
                  />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: "500" }}>
                    Physiotherapy Exercises
                  </label>
                  <textarea
                    name="exercises"
                    value={patientForm.exercises}
                    onChange={handlePatientFormChange}
                    style={textareaStyle}
                    placeholder="Enter recommended exercises"
                  />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: "500" }}>
                    Dietary Instructions
                  </label>
                  <textarea
                    name="diet"
                    value={patientForm.diet}
                    onChange={handlePatientFormChange}
                    style={textareaStyle}
                    placeholder="Enter dietary recommendations"
                  />
                </div>

                <button type="submit" style={buttonStyle}>
                  {editingPatientId ? "Update Patient" : "Add Patient"}
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === "view-patients" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h2 style={{ color: "#1e293b", margin: 0 }}>All Patients</h2>
              <button
                onClick={handleMigration}
                disabled={isMigrating}
                style={{
                  background: isMigrating ? "#9ca3af" : "#8b5cf6",
                  color: "#fff",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.5rem",
                  cursor: isMigrating ? "not-allowed" : "pointer",
                  fontSize: "0.875rem",
                  fontWeight: "500"
                }}
              >
                {isMigrating ? "Migrating..." : "🔄 Migrate Local Data"}
              </button>
            </div>
            {patients.length === 0 ? (
              <div style={cardStyle}>
                <p style={{ color: "#6b7280", textAlign: "center" }}>No patients added yet</p>
              </div>
            ) : (
              filteredPatients.map(patient => (
                <div key={patient._id || patient.id} style={cardStyle}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div>
                      <h3 style={{ margin: 0, color: "#1e293b" }}>{patient.name}</h3>
                      <p style={{ 
                        margin: "0.5rem 0 0 0", 
                        color: "#2563eb", 
                        fontWeight: "600",
                        fontFamily: "monospace",
                        fontSize: "0.875rem"
                      }}>
                        Patient ID: {patient.patientId || patient.id}
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <span style={{ 
                        background: "#f0f9ff", 
                        color: "#0369a1", 
                        padding: "0.25rem 0.5rem", 
                        borderRadius: "0.25rem",
                        fontSize: "0.75rem"
                      }}>
                        Added by: {patient.addedBy}
                      </span>
                      <button
                        onClick={() => togglePatientDetails(patient._id || patient.id)}
                        style={{
                          background: "#3b82f6",
                          color: "#fff",
                          border: "none",
                          padding: "0.5rem 1rem",
                          borderRadius: "0.25rem",
                          cursor: "pointer",
                          fontSize: "0.75rem",
                          fontWeight: "500"
                        }}
                      >
                        {expandedPatientId === (patient._id || patient.id) ? "Hide Details" : "View Details"}
                      </button>
                      <button
                        onClick={() => editPatient(patient)}
                        style={{
                          background: "#10b981",
                          color: "#fff",
                          border: "none",
                          padding: "0.5rem 1rem",
                          borderRadius: "0.25rem",
                          cursor: "pointer",
                          fontSize: "0.75rem",
                          fontWeight: "500"
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deletePatient(patient._id || patient.id)}
                        style={{
                          background: "#ef4444",
                          color: "#fff",
                          border: "none",
                          padding: "0.5rem 1rem",
                          borderRadius: "0.25rem",
                          cursor: "pointer",
                          fontSize: "0.75rem",
                          fontWeight: "500"
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                    <p style={{ margin: 0, color: "#6b7280" }}><strong>Age:</strong> {patient.age}</p>
                    <p style={{ margin: 0, color: "#6b7280" }}><strong>Gender:</strong> {patient.gender}</p>
                    <p style={{ margin: 0, color: "#6b7280" }}><strong>Condition:</strong> {patient.condition}</p>
                    <p style={{ margin: 0, color: "#6b7280" }}><strong>Surgery Details:</strong> {patient.surgeryDetails || 'Not specified'}</p>
                    <p style={{ margin: 0, color: "#6b7280" }}><strong>Recovery Period:</strong> {patient.recoveryPeriod}</p>
                  </div>

                  {expandedPatientId === (patient._id || patient.id) && (
                    <div>
                  {patient.currentStage && (
                    <p style={{ margin: "0 0 1rem 0", color: "#6b7280" }}>
                      <strong>Current Stage:</strong> {patient.currentStage}
                    </p>
                  )}

                  {patient.doctorsNotes && (
                    <div style={{ marginBottom: "1rem" }}>
                      <strong style={{ color: "#374151" }}>Doctor's Notes:</strong>
                      <p style={{ margin: "0.5rem 0 0 0", color: "#6b7280", whiteSpace: "pre-line" }}>
                        {patient.doctorsNotes}
                      </p>
                    </div>
                  )}

                  {patient.medications && (
                    <div style={{ marginBottom: "1rem" }}>
                      <strong style={{ color: "#374151" }}>Medications:</strong>
                      <p style={{ margin: "0.5rem 0 0 0", color: "#6b7280", whiteSpace: "pre-line" }}>
                        {patient.medications}
                      </p>
                    </div>
                  )}

                  {patient.prescription && (
                    <div style={{ marginBottom: "1rem" }}>
                      <strong style={{ color: "#374151" }}>Prescription:</strong>
                      <p style={{ margin: "0.5rem 0 0 0", color: "#6b7280", whiteSpace: "pre-line" }}>
                        {patient.prescription}
                      </p>
                    </div>
                  )}

                  {patient.exercises && (
                    <div style={{ marginBottom: "1rem" }}>
                      <strong style={{ color: "#374151" }}>Exercises:</strong>
                      <p style={{ margin: "0.5rem 0 0 0", color: "#6b7280", whiteSpace: "pre-line" }}>
                        {patient.exercises}
                      </p>
                    </div>
                  )}

                  {patient.diet && (
                    <div style={{ marginBottom: "1rem" }}>
                      <strong style={{ color: "#374151" }}>Diet:</strong>
                      <p style={{ margin: "0.5rem 0 0 0", color: "#6b7280", whiteSpace: "pre-line" }}>
                        {patient.diet}
                      </p>
                    </div>
                  )}

                  <p style={{ margin: "1rem 0 0 0", color: "#9ca3af", fontSize: "0.75rem" }}>
                    Added on: {new Date(patient.addedAt).toLocaleDateString()}
                    {patient.updatedAt && ` • Last updated: ${new Date(patient.updatedAt).toLocaleDateString()} by ${patient.updatedBy}`}
                  </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div>
            <h2 style={{ color: "#1A202C", marginBottom: "1.5rem", fontSize: "1.5rem", fontWeight: "700" }}>
              📈 Analytics & Insights
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              <div style={{
                background: "#fff",
                padding: "2rem",
                borderRadius: "1rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
              }}>
                <h3 style={{ margin: "0 0 1rem 0", color: "#1A202C" }}>Patient Distribution</h3>
                <div style={{ fontSize: "3rem", textAlign: "center", margin: "2rem 0" }}>📊</div>
                <p style={{ textAlign: "center", color: "#64748b" }}>Total Patients: {patients.length}</p>
              </div>
              <div style={{
                background: "#fff",
                padding: "2rem",
                borderRadius: "1rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
              }}>
                <h3 style={{ margin: "0 0 1rem 0", color: "#1A202C" }}>Recovery Progress</h3>
                <div style={{ fontSize: "3rem", textAlign: "center", margin: "2rem 0" }}>📈</div>
                <p style={{ textAlign: "center", color: "#64748b" }}>Average Recovery: 87%</p>
              </div>
            </div>
          </div>
        )}

        {/* Settings/Profile Tab */}
        {activeTab === "settings" && (
          <div>
            <h2 style={{ color: "#1A202C", marginBottom: "1.5rem", fontSize: "1.5rem", fontWeight: "700" }}>
              ⚙️ Profile Settings
            </h2>
            <div style={cardStyle}>
              {!editingProfile ? (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                    <h3 style={{ margin: 0, color: "#1A202C", fontSize: "1.25rem", fontWeight: "700" }}>
                      Your Profile
                    </h3>
                    <button
                      onClick={() => setEditingProfile(true)}
                      style={{
                        background: "#007bff",
                        color: "#fff",
                        border: "none",
                        padding: "0.5rem 1.5rem",
                        borderRadius: "0.5rem",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "0.9rem"
                      }}
                    >
                      ✏️ Edit Profile
                    </button>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                    <div>
                      <p style={{ margin: 0, color: "#94A3B8", fontSize: "0.85rem", marginBottom: "0.25rem" }}>Name</p>
                      <p style={{ margin: 0, color: "#1A202C", fontWeight: "600", fontSize: "1rem" }}>{staffInfo?.name}</p>
                    </div>
                    <div>
                      <p style={{ margin: 0, color: "#94A3B8", fontSize: "0.85rem", marginBottom: "0.25rem" }}>Email</p>
                      <p style={{ margin: 0, color: "#1A202C", fontWeight: "600", fontSize: "1rem" }}>{staffInfo?.email}</p>
                    </div>
                    <div>
                      <p style={{ margin: 0, color: "#94A3B8", fontSize: "0.85rem", marginBottom: "0.25rem" }}>Department</p>
                      <p style={{ margin: 0, color: "#1A202C", fontWeight: "600", fontSize: "1rem" }}>{staffInfo?.department}</p>
                    </div>
                    <div>
                      <p style={{ margin: 0, color: "#94A3B8", fontSize: "0.85rem", marginBottom: "0.25rem" }}>Password</p>
                      <p style={{ margin: 0, color: "#1A202C", fontWeight: "600", fontSize: "1rem" }}>{"•".repeat(8)}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={saveProfile}>
                  <h3 style={{ margin: "0 0 1.5rem 0", color: "#1A202C", fontSize: "1.25rem", fontWeight: "700" }}>
                    Edit Your Profile
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: "500" }}>
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleProfileChange}
                        style={inputStyle}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: "500" }}>
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        style={inputStyle}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: "500" }}>
                        Password
                      </label>
                      <input
                        type="text"
                        name="password"
                        value={profileData.password}
                        onChange={handleProfileChange}
                        style={inputStyle}
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: "500" }}>
                        Department
                      </label>
                      <input
                        type="text"
                        name="department"
                        value={profileData.department}
                        onChange={handleProfileChange}
                        style={inputStyle}
                        required
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
                    <button
                      type="submit"
                      style={{
                        background: "#10b981",
                        color: "#fff",
                        border: "none",
                        padding: "0.75rem 1.5rem",
                        borderRadius: "0.75rem",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "0.95rem"
                      }}
                    >
                      💾 Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingProfile(false)}
                      style={{
                        background: "#6b7280",
                        color: "#fff",
                        border: "none",
                        padding: "0.75rem 1.5rem",
                        borderRadius: "0.75rem",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "0.95rem"
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default StaffDashboard;
