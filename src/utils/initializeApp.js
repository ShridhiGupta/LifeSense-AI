/**
 * Initialize application with default data
 * This ensures the admin account and data structures exist on first load
 */
export const initializeApp = () => {
  // Initialize default admin if not exists
  const adminInitialized = localStorage.getItem("adminInitialized");
  
  if (!adminInitialized) {
    // Set flag to prevent re-initialization
    localStorage.setItem("adminInitialized", "true");
    
    // Initialize empty arrays for data if they don't exist
    if (!localStorage.getItem("allPatients")) {
      localStorage.setItem("allPatients", "[]");
    }
    
    if (!localStorage.getItem("approvedStaff")) {
      localStorage.setItem("approvedStaff", "[]");
    }
    
    if (!localStorage.getItem("pendingStaff")) {
      localStorage.setItem("pendingStaff", "[]");
    }
    
    if (!localStorage.getItem("admins")) {
      localStorage.setItem("admins", "[]");
    }
    
    console.log("✅ App initialized with default data structures");
  }
  
  // Note: The hardcoded admin (guptashridhi11@gmail.com / shridhii) 
  // is checked directly in the login components and doesn't need localStorage
};

/**
 * Get the default admin credentials
 * These are hardcoded and always available
 */
export const getDefaultAdmin = () => {
  return {
    email: "guptashridhi11@gmail.com",
    password: "shridhii", // Note: In production, use proper authentication
    role: "admin",
    id: 1
  };
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (role) => {
  const sessionKey = `${role}Session`;
  const session = localStorage.getItem(sessionKey);
  return session !== null;
};

/**
 * Clear all sessions (logout all users)
 */
export const clearAllSessions = () => {
  localStorage.removeItem("adminSession");
  localStorage.removeItem("staffSession");
  localStorage.removeItem("patientSession");
};
