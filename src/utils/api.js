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
export const sendChatMessage = async (message, patientId, patientData = null) => {
  try {
    // Detect if running locally or on production
    const isLocal = typeof window !== 'undefined' && 
                    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    const apiUrl = isLocal ? 'http://localhost:3001/api/chat' : '/.netlify/functions/api';
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        patientId: patientId,
        message: message,
        patientData: patientData
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return { 
      success: data.success, 
      response: data.response,
      error: data.error
    };
  } catch (error) {
    console.error('Error sending chat message:', error);
    return { 
      success: false, 
      error: error.message,
      response: null
    };
  }
};

// Get patient data by ID
export const getPatientData = async (patientId) => {
  try {
    // Detect if running locally or on production
    const isLocal = typeof window !== 'undefined' && 
                    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    const apiUrl = isLocal ? `http://localhost:3001/api/patient/${patientId}` : '/.netlify/functions/api';
    
    let response;
    if (isLocal) {
      response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
    } else {
      response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'getPatient',
          patientId: patientId
        })
      });
    }
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Error getting patient data:', error);
    return { success: false, error: error.message };
  }
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