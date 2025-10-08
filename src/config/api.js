// API Configuration
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  // Auth endpoints
  ADMIN_LOGIN: `${API_URL}/api/auth/admin/login`,
  STAFF_LOGIN: `${API_URL}/api/auth/staff/login`,
  PATIENT_LOGIN: `${API_URL}/api/auth/patient/login`,
  STAFF_SIGNUP: `${API_URL}/api/auth/staff/signup`,
  
  // Admin endpoints
  ADMIN_STATS: `${API_URL}/api/admin/stats`,
  ADMIN_STAFF: `${API_URL}/api/admin/staff`,
  ADMIN_STAFF_PENDING: `${API_URL}/api/admin/staff/pending`,
  ADMIN_STAFF_APPROVE: (id) => `${API_URL}/api/admin/staff/approve/${id}`,
  ADMIN_STAFF_DELETE: (id) => `${API_URL}/api/admin/staff/${id}`,
  ADMIN_PATIENTS: `${API_URL}/api/admin/patients`,
  ADMIN_CREATE: `${API_URL}/api/admin/create`,
  
  // Chat endpoints
  CHAT: `${API_URL}/api/chat`,
  PATIENT_CHAT: `${API_URL}/api/patient-chat`,
  
  // Health check
  HEALTH: `${API_URL}/api/health`
};

export default API_URL;
