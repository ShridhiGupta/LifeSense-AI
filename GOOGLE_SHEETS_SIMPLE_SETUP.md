# Simple Google Sheets Setup (Using Apps Script)

This is a simpler alternative that doesn't require service account credentials.

## Step 1: Create Google Apps Script Web App

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1XrqOBsTA5u9r6C81aEHgRatDxVhutKJqDm9ZGoYfW9Y/edit
2. Click **Extensions** > **Apps Script**
3. Delete any existing code
4. Paste this code:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
    const data = JSON.parse(e.postData.contents);
    
    // Add row with patient data
    sheet.appendRow([
      new Date(),
      data.patientId || '',
      data.name || '',
      data.age || '',
      data.gender || '',
      data.condition || '',
      data.recoveryPeriod || '',
      data.currentStage || '',
      data.doctorsNotes || '',
      data.medications || '',
      data.prescription || '',
      data.exercises || '',
      data.diet || ''
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

5. Click **Deploy** > **New deployment**
6. Click the gear icon ⚙️ next to "Select type"
7. Select **Web app**
8. Configure:
   - **Description**: Patient Form Submission
   - **Execute as**: Me
   - **Who has access**: Anyone
9. Click **Deploy**
10. **Copy the Web App URL** (it will look like: `https://script.google.com/macros/s/...../exec`)
11. Click **Authorize access** and grant permissions

## Step 2: Update Your Code

Replace the content of `googleSheetsService.js` with this simpler version:

```javascript
// Google Apps Script Web App URL
const WEB_APP_URL = 'YOUR_WEB_APP_URL_HERE'; // Paste the URL from Step 1

export async function appendPatientDataToSheet(patientData) {
  try {
    const response = await fetch(WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patientData)
    });
    
    console.log('Data sent to Google Sheets');
    return { success: true };
  } catch (error) {
    console.error('Error sending to Google Sheets:', error);
    throw error;
  }
}
```

## Step 3: Add Headers to Your Sheet

Make sure row 1 of your sheet has these headers:

| Timestamp | Patient ID | Name | Age | Gender | Condition | Recovery Period | Current Stage | Doctor's Notes | Medications | Prescription | Exercises | Diet |

## Done!

Now when you submit the form, data will be automatically added to your Google Sheet.
