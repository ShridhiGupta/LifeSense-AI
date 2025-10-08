// Google Apps Script Web App URL
// IMPORTANT: Replace this with your actual Web App URL from Google Apps Script
// See GOOGLE_SHEETS_SIMPLE_SETUP.md for instructions
const WEB_APP_URL = 'PASTE_YOUR_WEB_APP_URL_HERE';

/**
 * Append patient form data to Google Sheets via Apps Script
 * @param {Object} patientData - The patient form data to append
 */
export async function appendPatientDataToSheet(patientData) {
  try {
    if (WEB_APP_URL === 'PASTE_YOUR_WEB_APP_URL_HERE') {
      console.warn('⚠️ Google Sheets Web App URL not configured!');
      console.warn('📖 Please follow the instructions in GOOGLE_SHEETS_SIMPLE_SETUP.md');
      return { success: false, error: 'Not configured' };
    }

    const response = await fetch(WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patientData)
    });
    
    console.log('✅ Patient data sent to Google Sheets successfully');
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending to Google Sheets:', error);
    throw error;
  }
}
