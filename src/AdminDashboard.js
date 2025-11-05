import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "./config/api.js";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [pendingStaff, setPendingStaff] = useState([]);
  const [approvedStaff, setApprovedStaff] = useState([]);
  const [allPatients, setAllPatients] = useState([]);
  const [allAdmins, setAllAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ email: "", password: "" });
  const [editingAdminId, setEditingAdminId] = useState(null);
  const [editAdminData, setEditAdminData] = useState({ email: "", password: "" });
  const [editingStaffId, setEditingStaffId] = useState(null);
  const [editStaffData, setEditStaffData] = useState({ name: "", email: "", password: "", department: "" });
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [visibleStaffPasswords, setVisibleStaffPasswords] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    const adminSession = localStorage.getItem("adminSession");
    if (!adminSession) {
      navigate("/admin-login");
      return;
    }

    // Load data from localStorage
    loadPendingStaff();
    loadApprovedStaff();
    loadAllPatients();
    loadAllAdmins();
  }, []);

  const loadPendingStaff = () => {
    const staff = JSON.parse(localStorage.getItem("pendingStaff") || "[]");
    setPendingStaff(staff);
  };

  const loadApprovedStaff = async () => {
    try {
      // Try to load from API first
      const response = await fetch(API_ENDPOINTS.ADMIN_STAFF);
      const data = await response.json();
      if (data.success && data.staff) {
        const approved = data.staff.filter(s => s.approved === true);
        if (approved.length > 0) {
          setApprovedStaff(approved);
          return;
        }
      }
    } catch (error) {
      console.error("Error loading staff from API:", error);
    }
    
    // Fallback to localStorage
    const staff = JSON.parse(localStorage.getItem("approvedStaff") || "[]");
    setApprovedStaff(staff);
  };

  const loadAllPatients = async () => {
    try {
      // Try to load from API first
      const response = await fetch(API_ENDPOINTS.ADMIN_PATIENTS);
      const data = await response.json();
      if (data.success && data.patients && data.patients.length > 0) {
        setAllPatients(data.patients);
        return;
      }
    } catch (error) {
      console.error("Error loading patients from API:", error);
    }
    
    // Fallback to localStorage
    try {
      const localPatients = JSON.parse(localStorage.getItem("allPatients") || "[]");
      setAllPatients(localPatients);
    } catch (error) {
      console.error("Error loading patients from localStorage:", error);
      setAllPatients([]);
    }
  };

  const loadAllAdmins = () => {
    const admins = JSON.parse(localStorage.getItem("admins") || "[]");
    setAllAdmins(admins);
  };

  const approveStaff = (staffId) => {
    const staff = pendingStaff.find(s => s.id === staffId);
    if (staff) {
      // Move to approved staff
      const approvedStaff = JSON.parse(localStorage.getItem("approvedStaff") || "[]");
      approvedStaff.push({ ...staff, approvedAt: new Date().toISOString() });
      localStorage.setItem("approvedStaff", JSON.stringify(approvedStaff));

      // Remove from pending
      const updatedPending = pendingStaff.filter(s => s.id !== staffId);
      setPendingStaff(updatedPending);
      localStorage.setItem("pendingStaff", JSON.stringify(updatedPending));
    }
  };

  const rejectStaff = (staffId) => {
    const updatedPending = pendingStaff.filter(s => s.id !== staffId);
    setPendingStaff(updatedPending);
    localStorage.setItem("pendingStaff", JSON.stringify(updatedPending));
  };

  const deleteApprovedStaff = (staffId) => {
    if (window.confirm("Are you sure you want to delete this staff member? This action cannot be undone.")) {
      const updatedStaff = approvedStaff.filter(s => s.id !== staffId);
      setApprovedStaff(updatedStaff);
      localStorage.setItem("approvedStaff", JSON.stringify(updatedStaff));
    }
  };

  const deletePatient = async (patientId) => {
    if (window.confirm("Are you sure you want to delete this patient? This action cannot be undone.")) {
      try {
        const response = await fetch(`${API_ENDPOINTS.ADMIN_PATIENTS}/${patientId}`, {
          method: "DELETE"
        });
        if (response.ok) {
          loadAllPatients(); // Reload the list
        }
      } catch (error) {
        console.error("Error deleting patient:", error);
        alert("Failed to delete patient");
      }
    }
  };

  const createNewAdmin = (e) => {
    e.preventDefault();
    if (newAdmin.email && newAdmin.password) {
      const admins = JSON.parse(localStorage.getItem("admins") || "[]");
      const newAdminData = {
        id: Date.now().toString(),
        email: newAdmin.email,
        password: newAdmin.password,
        createdAt: new Date().toISOString()
      };
      admins.push(newAdminData);
      localStorage.setItem("admins", JSON.stringify(admins));
      setAllAdmins(admins);
      setNewAdmin({ email: "", password: "" });
      alert("New admin created successfully!");
    }
  };

  const deleteAdmin = (adminId) => {
    if (window.confirm("Are you sure you want to delete this admin? This action cannot be undone.")) {
      const updatedAdmins = allAdmins.filter(a => a.id !== adminId);
      setAllAdmins(updatedAdmins);
      localStorage.setItem("admins", JSON.stringify(updatedAdmins));
    }
  };

  const startEditingAdmin = (admin) => {
    setEditingAdminId(admin.id);
    setEditAdminData({ email: admin.email, password: admin.password });
  };

  const cancelEditingAdmin = () => {
    setEditingAdminId(null);
    setEditAdminData({ email: "", password: "" });
  };

  const saveAdminChanges = (adminId) => {
    const updatedAdmins = allAdmins.map(admin => 
      admin.id === adminId 
        ? { ...admin, email: editAdminData.email, password: editAdminData.password, updatedAt: new Date().toISOString() }
        : admin
    );
    setAllAdmins(updatedAdmins);
    localStorage.setItem("admins", JSON.stringify(updatedAdmins));
    setEditingAdminId(null);
    setEditAdminData({ email: "", password: "" });
    alert("Admin credentials updated successfully!");
  };

  const togglePasswordVisibility = (adminId) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [adminId]: !prev[adminId]
    }));
  };

  const toggleStaffPasswordVisibility = (staffId) => {
    setVisibleStaffPasswords(prev => ({
      ...prev,
      [staffId]: !prev[staffId]
    }));
  };

  const startEditingStaff = (staff) => {
    setEditingStaffId(staff.id);
    setEditStaffData({ 
      name: staff.name, 
      email: staff.email, 
      password: staff.password,
      department: staff.department 
    });
  };

  const cancelEditingStaff = () => {
    setEditingStaffId(null);
    setEditStaffData({ name: "", email: "", password: "", department: "" });
  };

  const saveStaffChanges = (staffId) => {
    const updatedStaff = approvedStaff.map(staff => 
      staff.id === staffId 
        ? { ...staff, ...editStaffData, updatedAt: new Date().toISOString() }
        : staff
    );
    setApprovedStaff(updatedStaff);
    localStorage.setItem("approvedStaff", JSON.stringify(updatedStaff));
    setEditingStaffId(null);
    setEditStaffData({ name: "", email: "", password: "", department: "" });
    alert("Staff information updated successfully!");
  };

  const logout = () => {
    localStorage.removeItem("adminSession");
    navigate("/");
  };

  const cardStyle = {
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "1rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    marginBottom: "1.5rem"
  };

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

  const buttonStyle = {
    padding: "0.75rem 1.5rem",
    borderRadius: "0.75rem",
    border: "none",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: "600"
  };

  const approveButtonStyle = {
    ...buttonStyle,
    background: "#10b981",
    color: "#fff"
  };

  const rejectButtonStyle = {
    ...buttonStyle,
    background: "#ef4444",
    color: "#fff"
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8fbff 0%, #e9f2ff 100%)",
      fontFamily: "'Poppins', 'Inter', sans-serif",
      display: "flex"
    }}>
      {/* Sidebar */}
      <div style={{
        width: isSidebarCollapsed ? "70px" : "280px",
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
            <span style={{ fontSize: "1.5rem" }}>🏥</span>
            {!isSidebarCollapsed && (
              <span style={{ fontSize: "1.25rem", fontWeight: "700", color: "#007bff" }}>LifeSense AI</span>
            )}
          </div>
          {!isSidebarCollapsed && (
            <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.85rem", color: "#64748b" }}>Admin Portal</p>
          )}
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
        <nav style={{ flex: 1, padding: "1rem 0", overflowY: "auto" }}>
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
            onClick={() => setActiveTab("staff-approval")}
            style={{
              width: "100%",
              padding: "0.875rem 1.5rem",
              border: "none",
              background: activeTab === "staff-approval" ? "#E3F2FD" : "transparent",
              color: activeTab === "staff-approval" ? "#007bff" : "#64748b",
              textAlign: "left",
              cursor: "pointer",
              fontSize: "0.95rem",
              fontWeight: activeTab === "staff-approval" ? "600" : "500",
              display: "flex",
              alignItems: "center",
              justifyContent: isSidebarCollapsed ? "center" : "flex-start",
              gap: "0.75rem",
              transition: "all 0.2s",
              position: "relative"
            }}
            title={isSidebarCollapsed ? `Staff Approval (${pendingStaff.length})` : ""}
          >
            <span style={{ fontSize: "1.25rem" }}>⏳</span>
            {!isSidebarCollapsed && "Staff Approval"}
            {pendingStaff.length > 0 && (
              <span style={{
                background: "#f59e0b",
                color: "#fff",
                padding: "0.25rem 0.5rem",
                borderRadius: "0.5rem",
                fontSize: "0.75rem",
                fontWeight: "700",
                marginLeft: isSidebarCollapsed ? "0" : "auto",
                position: isSidebarCollapsed ? "absolute" : "static",
                top: isSidebarCollapsed ? "5px" : "auto",
                right: isSidebarCollapsed ? "5px" : "auto"
              }}>
                {pendingStaff.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("approved-staff")}
            style={{
              width: "100%",
              padding: "0.875rem 1.5rem",
              border: "none",
              background: activeTab === "approved-staff" ? "#E3F2FD" : "transparent",
              color: activeTab === "approved-staff" ? "#007bff" : "#64748b",
              textAlign: "left",
              cursor: "pointer",
              fontSize: "0.95rem",
              fontWeight: activeTab === "approved-staff" ? "600" : "500",
              display: "flex",
              alignItems: "center",
              justifyContent: isSidebarCollapsed ? "center" : "flex-start",
              gap: "0.75rem",
              transition: "all 0.2s"
            }}
            title={isSidebarCollapsed ? `Approved Staff (${approvedStaff.length})` : ""}
          >
            <span style={{ fontSize: "1.25rem" }}>👥</span>
            {!isSidebarCollapsed && `Approved Staff (${approvedStaff.length})`}
          </button>
          <button
            onClick={() => setActiveTab("patients")}
            style={{
              width: "100%",
              padding: "0.875rem 1.5rem",
              border: "none",
              background: activeTab === "patients" ? "#E3F2FD" : "transparent",
              color: activeTab === "patients" ? "#007bff" : "#64748b",
              textAlign: "left",
              cursor: "pointer",
              fontSize: "0.95rem",
              fontWeight: activeTab === "patients" ? "600" : "500",
              display: "flex",
              alignItems: "center",
              justifyContent: isSidebarCollapsed ? "center" : "flex-start",
              gap: "0.75rem",
              transition: "all 0.2s"
            }}
            title={isSidebarCollapsed ? `All Patients (${allPatients.length})` : ""}
          >
            <span style={{ fontSize: "1.25rem" }}>🩺</span>
            {!isSidebarCollapsed && `All Patients (${allPatients.length})`}
          </button>
          <button
            onClick={() => setActiveTab("manage-admins")}
            style={{
              width: "100%",
              padding: "0.875rem 1.5rem",
              border: "none",
              background: activeTab === "manage-admins" ? "#E3F2FD" : "transparent",
              color: activeTab === "manage-admins" ? "#007bff" : "#64748b",
              textAlign: "left",
              cursor: "pointer",
              fontSize: "0.95rem",
              fontWeight: activeTab === "manage-admins" ? "600" : "500",
              display: "flex",
              alignItems: "center",
              justifyContent: isSidebarCollapsed ? "center" : "flex-start",
              gap: "0.75rem",
              transition: "all 0.2s"
            }}
            title={isSidebarCollapsed ? `Manage Admins (${allAdmins.length})` : ""}
          >
            <span style={{ fontSize: "1.25rem" }}>⚙️</span>
            {!isSidebarCollapsed && `Manage Admins (${allAdmins.length})`}
          </button>
          <button
            onClick={() => setActiveTab("create-admin")}
            style={{
              width: "100%",
              padding: "0.875rem 1.5rem",
              border: "none",
              background: activeTab === "create-admin" ? "#E3F2FD" : "transparent",
              color: activeTab === "create-admin" ? "#007bff" : "#64748b",
              textAlign: "left",
              cursor: "pointer",
              fontSize: "0.95rem",
              fontWeight: activeTab === "create-admin" ? "600" : "500",
              display: "flex",
              alignItems: "center",
              justifyContent: isSidebarCollapsed ? "center" : "flex-start",
              gap: "0.75rem",
              transition: "all 0.2s"
            }}
            title={isSidebarCollapsed ? "Create Admin" : ""}
          >
            <span style={{ fontSize: "1.25rem" }}>➕</span>
            {!isSidebarCollapsed && "Create Admin"}
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
      <div style={{ marginLeft: isSidebarCollapsed ? "70px" : "280px", flex: 1, transition: "margin-left 0.3s ease" }}>
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
                Admin Dashboard
              </h1>
              <p style={{ margin: "0.5rem 0 0 0", color: "#64748b", fontSize: "1rem" }}>
                System Administration & Management
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #007bff 0%, #0056b3 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "1.25rem",
                fontWeight: "700"
              }}>
                👤
              </div>
            </div>
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
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  borderLeft: "4px solid #f59e0b"
                }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🧑‍⚕️</div>
                  <div style={{ fontSize: "0.875rem", color: "#64748b", marginBottom: "0.5rem" }}>Staff Pending</div>
                  <div style={{ fontSize: "2rem", fontWeight: "700", color: "#f59e0b" }}>{pendingStaff.length}</div>
                  <div style={{ fontSize: "0.75rem", color: "#94A3B8", marginTop: "0.5rem" }}>Awaiting approval</div>
                </div>
                <div style={{
                  background: "#fff",
                  padding: "1.5rem",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  borderLeft: "4px solid #007bff"
                }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>👨‍⚕️</div>
                  <div style={{ fontSize: "0.875rem", color: "#64748b", marginBottom: "0.5rem" }}>Approved Staff</div>
                  <div style={{ fontSize: "2rem", fontWeight: "700", color: "#007bff" }}>{approvedStaff.length}</div>
                  <div style={{ fontSize: "0.75rem", color: "#94A3B8", marginTop: "0.5rem" }}>Total approved</div>
                </div>
                <div style={{
                  background: "#fff",
                  padding: "1.5rem",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  borderLeft: "4px solid #10b981"
                }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>👩‍🦰</div>
                  <div style={{ fontSize: "0.875rem", color: "#64748b", marginBottom: "0.5rem" }}>Patients Registered</div>
                  <div style={{ fontSize: "2rem", fontWeight: "700", color: "#10b981" }}>{allPatients.length}</div>
                  <div style={{ fontSize: "0.75rem", color: "#94A3B8", marginTop: "0.5rem" }}>Active patients</div>
                </div>
                <div style={{
                  background: "#fff",
                  padding: "1.5rem",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  borderLeft: "4px solid #6b7280"
                }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔧</div>
                  <div style={{ fontSize: "0.875rem", color: "#64748b", marginBottom: "0.5rem" }}>Admins</div>
                  <div style={{ fontSize: "2rem", fontWeight: "700", color: "#6b7280" }}>{allAdmins.length}</div>
                  <div style={{ fontSize: "0.75rem", color: "#94A3B8", marginTop: "0.5rem" }}>Total admins</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div style={cardStyle}>
                <h3 style={{ margin: "0 0 1rem 0", color: "#1A202C", fontSize: "1.25rem", fontWeight: "700" }}>
                  Quick Actions
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
                  <button
                    onClick={() => setActiveTab("staff-approval")}
                    style={{
                      background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                      color: "#fff",
                      border: "none",
                      padding: "1rem",
                      borderRadius: "0.75rem",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "0.95rem",
                      boxShadow: "0 4px 12px rgba(245,158,11,0.3)"
                    }}
                  >
                    ⏳ Review Pending Staff
                  </button>
                  <button
                    onClick={() => setActiveTab("approved-staff")}
                    style={{
                      background: "linear-gradient(135deg, #007bff 0%, #0056b3 100%)",
                      color: "#fff",
                      border: "none",
                      padding: "1rem",
                      borderRadius: "0.75rem",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "0.95rem",
                      boxShadow: "0 4px 12px rgba(0,123,255,0.3)"
                    }}
                  >
                    👥 View All Staff
                  </button>
                  <button
                    onClick={() => setActiveTab("create-admin")}
                    style={{
                      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                      color: "#fff",
                      border: "none",
                      padding: "1rem",
                      borderRadius: "0.75rem",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "0.95rem",
                      boxShadow: "0 4px 12px rgba(16,185,129,0.3)"
                    }}
                  >
                    ➕ Create New Admin
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div style={cardStyle}>
                <h3 style={{ margin: "0 0 1rem 0", color: "#1A202C", fontSize: "1.25rem", fontWeight: "700" }}>
                  Recent Activity
                </h3>
                {pendingStaff.slice(0, 3).map(staff => (
                  <div key={staff.id} style={{
                    padding: "0.75rem",
                    borderBottom: "1px solid #E2E8F0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <div>
                      <div style={{ fontWeight: "600", color: "#1A202C", fontSize: "0.95rem" }}>{staff.name}</div>
                      <div style={{ fontSize: "0.8rem", color: "#64748b" }}>Pending approval - {staff.department}</div>
                    </div>
                    <button
                      onClick={() => setActiveTab("staff-approval")}
                      style={{
                        background: "#007bff",
                        color: "#fff",
                        border: "none",
                        padding: "0.5rem 1rem",
                        borderRadius: "0.5rem",
                        cursor: "pointer",
                        fontSize: "0.8rem"
                      }}
                    >
                      Review
                    </button>
                  </div>
                ))}
                {pendingStaff.length === 0 && (
                  <p style={{ color: "#94A3B8", textAlign: "center", padding: "1rem" }}>No recent activity</p>
                )}
              </div>
            </div>
          )}

      <div style={{ padding: "0" }}>
        {activeTab === "staff-approval" && (
          <div>
            <h2 style={{ color: "#1e293b", marginBottom: "1rem" }}>Pending Staff Approvals</h2>
            {pendingStaff.length === 0 ? (
              <div style={cardStyle}>
                <p style={{ color: "#6b7280", textAlign: "center" }}>No pending staff approvals</p>
              </div>
            ) : (
              pendingStaff.map(staff => (
                <div key={staff.id} style={cardStyle}>
                  <h3 style={{ margin: "0 0 0.5rem 0", color: "#1e293b" }}>{staff.name}</h3>
                  <p style={{ margin: "0 0 0.5rem 0", color: "#6b7280" }}>Email: {staff.email}</p>
                  <p style={{ margin: "0 0 1rem 0", color: "#6b7280" }}>Department: {staff.department}</p>
                  <button onClick={() => approveStaff(staff.id)} style={approveButtonStyle}>
                    Approve
                  </button>
                  <button onClick={() => rejectStaff(staff.id)} style={rejectButtonStyle}>
                    Reject
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "approved-staff" && (
          <div>
            <h2 style={{ color: "#1e293b", marginBottom: "1rem" }}>Approved Staff Members</h2>
            {approvedStaff.length === 0 ? (
              <div style={cardStyle}>
                <p style={{ color: "#6b7280", textAlign: "center" }}>No approved staff members yet</p>
              </div>
            ) : (
              approvedStaff.map(staff => (
                <div key={staff.id} style={cardStyle}>
                  {editingStaffId === staff.id ? (
                    <div>
                      <h3 style={{ margin: "0 0 1rem 0", color: "#1e293b" }}>Edit Staff Member</h3>
                      <div style={{ marginBottom: "1rem" }}>
                        <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: "500" }}>
                          Name
                        </label>
                        <input
                          type="text"
                          value={editStaffData.name}
                          onChange={(e) => setEditStaffData(prev => ({ ...prev, name: e.target.value }))}
                          style={{
                            width: "100%",
                            padding: "0.75rem",
                            borderRadius: "0.25rem",
                            border: "1px solid #cbd5e1",
                            fontSize: "1rem",
                            boxSizing: "border-box"
                          }}
                        />
                      </div>
                      <div style={{ marginBottom: "1rem" }}>
                        <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: "500" }}>
                          Email
                        </label>
                        <input
                          type="email"
                          value={editStaffData.email}
                          onChange={(e) => setEditStaffData(prev => ({ ...prev, email: e.target.value }))}
                          style={{
                            width: "100%",
                            padding: "0.75rem",
                            borderRadius: "0.25rem",
                            border: "1px solid #cbd5e1",
                            fontSize: "1rem",
                            boxSizing: "border-box"
                          }}
                        />
                      </div>
                      <div style={{ marginBottom: "1rem" }}>
                        <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: "500" }}>
                          Password
                        </label>
                        <input
                          type="text"
                          value={editStaffData.password}
                          onChange={(e) => setEditStaffData(prev => ({ ...prev, password: e.target.value }))}
                          style={{
                            width: "100%",
                            padding: "0.75rem",
                            borderRadius: "0.25rem",
                            border: "1px solid #cbd5e1",
                            fontSize: "1rem",
                            boxSizing: "border-box"
                          }}
                        />
                      </div>
                      <div style={{ marginBottom: "1rem" }}>
                        <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: "500" }}>
                          Department
                        </label>
                        <input
                          type="text"
                          value={editStaffData.department}
                          onChange={(e) => setEditStaffData(prev => ({ ...prev, department: e.target.value }))}
                          style={{
                            width: "100%",
                            padding: "0.75rem",
                            borderRadius: "0.25rem",
                            border: "1px solid #cbd5e1",
                            fontSize: "1rem",
                            boxSizing: "border-box"
                          }}
                        />
                      </div>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          onClick={() => saveStaffChanges(staff.id)}
                          style={{
                            background: "#10b981",
                            color: "#fff",
                            border: "none",
                            padding: "0.5rem 1rem",
                            borderRadius: "0.25rem",
                            cursor: "pointer",
                            fontSize: "0.875rem"
                          }}
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={cancelEditingStaff}
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
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ margin: "0 0 0.5rem 0", color: "#1e293b" }}>{staff.name}</h3>
                        <p style={{ margin: "0 0 0.5rem 0", color: "#6b7280" }}>Email: {staff.email}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                          <p style={{ margin: 0, color: "#6b7280" }}>
                            Password: {visibleStaffPasswords[staff.id] ? staff.password : "•".repeat(staff.password.length)}
                          </p>
                          <button
                            onClick={() => toggleStaffPasswordVisibility(staff.id)}
                            style={{
                              background: "#e5e7eb",
                              color: "#374151",
                              border: "none",
                              padding: "0.25rem 0.5rem",
                              borderRadius: "0.25rem",
                              cursor: "pointer",
                              fontSize: "0.75rem"
                            }}
                          >
                            {visibleStaffPasswords[staff.id] ? "Hide" : "Show"}
                          </button>
                        </div>
                        <p style={{ margin: "0 0 0.5rem 0", color: "#6b7280" }}>Department: {staff.department}</p>
                        <p style={{ margin: "0", color: "#9ca3af", fontSize: "0.75rem" }}>
                          Approved on: {new Date(staff.approvedAt).toLocaleDateString()}
                        </p>
                        {staff.updatedAt && (
                          <p style={{ margin: "0.25rem 0 0 0", color: "#9ca3af", fontSize: "0.75rem" }}>
                            Last updated: {new Date(staff.updatedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          onClick={() => startEditingStaff(staff)}
                          style={{
                            background: "#3b82f6",
                            color: "#fff",
                            border: "none",
                            padding: "0.5rem 1rem",
                            borderRadius: "0.25rem",
                            cursor: "pointer",
                            fontSize: "0.875rem"
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteApprovedStaff(staff.id)}
                          style={{
                            background: "#ef4444",
                            color: "#fff",
                            border: "none",
                            padding: "0.5rem 1rem",
                            borderRadius: "0.25rem",
                            cursor: "pointer",
                            fontSize: "0.875rem"
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "patients" && (
          <div>
            <h2 style={{ color: "#1e293b", marginBottom: "1rem" }}>All Patients</h2>
            {allPatients.length === 0 ? (
              <div style={cardStyle}>
                <p style={{ color: "#6b7280", textAlign: "center" }}>No patients registered yet</p>
              </div>
            ) : (
              allPatients.map(patient => (
                <div key={patient.id} style={cardStyle}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <h3 style={{ margin: "0 0 0.5rem 0", color: "#1e293b" }}>{patient.name}</h3>
                      <p style={{ 
                        margin: "0 0 0.5rem 0", 
                        color: "#2563eb", 
                        fontWeight: "600",
                        fontFamily: "monospace"
                      }}>
                        Patient ID: {patient.patientId || patient.id}
                      </p>
                      <p style={{ margin: "0 0 0.5rem 0", color: "#6b7280" }}>Age: {patient.age} | Gender: {patient.gender}</p>
                      <p style={{ margin: "0 0 0.5rem 0", color: "#6b7280" }}>Condition: {patient.condition}</p>
                      <p style={{ margin: "0", color: "#6b7280" }}>Added by: {patient.addedBy}</p>
                    </div>
                    <button
                      onClick={() => deletePatient(patient.id)}
                      style={{
                        background: "#ef4444",
                        color: "#fff",
                        border: "none",
                        padding: "0.5rem 1rem",
                        borderRadius: "0.25rem",
                        cursor: "pointer",
                        fontSize: "0.875rem"
                      }}
                    >
                      Delete Patient
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "manage-admins" && (
          <div>
            <h2 style={{ color: "#1e293b", marginBottom: "1rem" }}>Manage Admins</h2>
            {allAdmins.length === 0 ? (
              <div style={cardStyle}>
                <p style={{ color: "#6b7280", textAlign: "center" }}>No admins created yet</p>
              </div>
            ) : (
              allAdmins.map(admin => (
                <div key={admin.id} style={cardStyle}>
                  {editingAdminId === admin.id ? (
                    <div>
                      <h3 style={{ margin: "0 0 1rem 0", color: "#1e293b" }}>Edit Admin</h3>
                      <div style={{ marginBottom: "1rem" }}>
                        <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: "500" }}>
                          Email
                        </label>
                        <input
                          type="email"
                          value={editAdminData.email}
                          onChange={(e) => setEditAdminData(prev => ({ ...prev, email: e.target.value }))}
                          style={{
                            width: "100%",
                            padding: "0.75rem",
                            borderRadius: "0.25rem",
                            border: "1px solid #cbd5e1",
                            fontSize: "1rem",
                            boxSizing: "border-box"
                          }}
                        />
                      </div>
                      <div style={{ marginBottom: "1rem" }}>
                        <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: "500" }}>
                          Password
                        </label>
                        <input
                          type="text"
                          value={editAdminData.password}
                          onChange={(e) => setEditAdminData(prev => ({ ...prev, password: e.target.value }))}
                          style={{
                            width: "100%",
                            padding: "0.75rem",
                            borderRadius: "0.25rem",
                            border: "1px solid #cbd5e1",
                            fontSize: "1rem",
                            boxSizing: "border-box"
                          }}
                        />
                      </div>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          onClick={() => saveAdminChanges(admin.id)}
                          style={{
                            background: "#10b981",
                            color: "#fff",
                            border: "none",
                            padding: "0.5rem 1rem",
                            borderRadius: "0.25rem",
                            cursor: "pointer",
                            fontSize: "0.875rem"
                          }}
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={cancelEditingAdmin}
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
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ margin: "0 0 0.5rem 0", color: "#1e293b" }}>{admin.email}</h3>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                          <p style={{ margin: 0, color: "#6b7280", fontSize: "0.875rem" }}>
                            Password: {visiblePasswords[admin.id] ? admin.password : "•".repeat(admin.password.length)}
                          </p>
                          <button
                            onClick={() => togglePasswordVisibility(admin.id)}
                            style={{
                              background: "#e5e7eb",
                              color: "#374151",
                              border: "none",
                              padding: "0.25rem 0.5rem",
                              borderRadius: "0.25rem",
                              cursor: "pointer",
                              fontSize: "0.75rem"
                            }}
                          >
                            {visiblePasswords[admin.id] ? "Hide" : "Show"}
                          </button>
                        </div>
                        <p style={{ margin: "0", color: "#9ca3af", fontSize: "0.75rem" }}>
                          Created on: {new Date(admin.createdAt).toLocaleDateString()} at {new Date(admin.createdAt).toLocaleTimeString()}
                        </p>
                        {admin.updatedAt && (
                          <p style={{ margin: "0.25rem 0 0 0", color: "#9ca3af", fontSize: "0.75rem" }}>
                            Last updated: {new Date(admin.updatedAt).toLocaleDateString()} at {new Date(admin.updatedAt).toLocaleTimeString()}
                          </p>
                        )}
                      </div>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          onClick={() => startEditingAdmin(admin)}
                          style={{
                            background: "#3b82f6",
                            color: "#fff",
                            border: "none",
                            padding: "0.5rem 1rem",
                            borderRadius: "0.25rem",
                            cursor: "pointer",
                            fontSize: "0.875rem"
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteAdmin(admin.id)}
                          style={{
                            background: "#ef4444",
                            color: "#fff",
                            border: "none",
                            padding: "0.5rem 1rem",
                            borderRadius: "0.25rem",
                            cursor: "pointer",
                            fontSize: "0.875rem"
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "create-admin" && (
          <div>
            <h2 style={{ color: "#1e293b", marginBottom: "1rem" }}>Create New Admin</h2>
            <div style={cardStyle}>
              <form onSubmit={createNewAdmin}>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: "500" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={newAdmin.email}
                    onChange={(e) => setNewAdmin(prev => ({ ...prev, email: e.target.value }))}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      borderRadius: "0.25rem",
                      border: "1px solid #cbd5e1",
                      fontSize: "1rem"
                    }}
                    placeholder="Enter admin email"
                    required
                  />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: "500" }}>
                    Password
                  </label>
                  <input
                    type="password"
                    value={newAdmin.password}
                    onChange={(e) => setNewAdmin(prev => ({ ...prev, password: e.target.value }))}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      borderRadius: "0.25rem",
                      border: "1px solid #cbd5e1",
                      fontSize: "1rem"
                    }}
                    placeholder="Enter admin password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    background: "#3b82f6",
                    color: "#fff",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "0.25rem",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontWeight: "500"
                  }}
                >
                  Create Admin
                </button>
              </form>
            </div>
          </div>
        )}
        </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
