// Save or update patient profile
export const saveProfile = async (profileData) => {
  const response = await fetch('/.netlify/functions/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'saveProfile',
      patientData: profileData
    }),
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// Send chat message and get response
export const sendChatMessage = async (message, patientId) => {
  const response = await fetch('http://localhost:5000/api/patient-chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      message: message,
      patientData: { patientId: patientId }
    }),
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  return { success: true, response: data.text };
};

// Get patient data by ID
export const getPatientData = async (patientId) => {
  const response = await fetch(`http://localhost:5000/api/patient/${patientId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// Test API connection
export const testApiConnection = async () => {
  const response = await fetch(`/.netlify/functions/api?action=test`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};