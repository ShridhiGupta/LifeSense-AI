# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration for the LifeSense AI chatbot to automatically save form submissions to your Google Sheet.

## Prerequisites

- A Google account
- Access to the Google Cloud Console
- The Google Sheet where you want to store the data (already created: https://docs.google.com/spreadsheets/d/1XrqOBsTA5u9r6C81aEHgRatDxVhutKJqDm9ZGoYfW9Y/edit)

## Step 1: Set Up Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note down your project ID

## Step 2: Enable Google Sheets API

1. In the Google Cloud Console, go to **APIs & Services** > **Library**
2. Search for "Google Sheets API"
3. Click on it and press **Enable**

## Step 3: Create Service Account

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **Service Account**
3. Fill in the service account details:
   - **Service account name**: `lifesense-sheets-service`
   - **Service account ID**: (auto-generated)
   - **Description**: Service account for LifeSense AI Google Sheets integration
4. Click **Create and Continue**
5. Skip the optional steps (Grant access & Grant users access)
6. Click **Done**

## Step 4: Create and Download Service Account Key

1. In the **Credentials** page, find your newly created service account
2. Click on the service account email
3. Go to the **Keys** tab
4. Click **Add Key** > **Create new key**
5. Select **JSON** as the key type
6. Click **Create**
7. A JSON file will be downloaded to your computer
8. **IMPORTANT**: Rename this file to `credentials.json`
9. Move `credentials.json` to the root directory of your project:
   ```
   c:\Users\HP\Downloads\LifeSense AI\chatbot-ui\credentials.json
   ```

## Step 5: Share Google Sheet with Service Account

1. Open the downloaded `credentials.json` file
2. Find the `client_email` field (it looks like: `lifesense-sheets-service@your-project.iam.gserviceaccount.com`)
3. Copy this email address
4. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1XrqOBsTA5u9r6C81aEHgRatDxVhutKJqDm9ZGoYfW9Y/edit
5. Click the **Share** button (top right)
6. Paste the service account email
7. Give it **Editor** permissions
8. Uncheck "Notify people" (since it's a service account)
9. Click **Share**

## Step 6: Set Up Your Google Sheet Structure

Make sure your Google Sheet has the following columns in the first row (Sheet1):

| A | B | C | D | E | F | G | H | I | J | K | L | M |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Timestamp | Patient ID | Name | Age | Gender | Condition | Recovery Period | Current Stage | Doctor's Notes | Medications | Prescription | Exercises | Diet |

## Step 7: Update Sheet Name (if needed)

If your sheet tab is not named "Sheet1", update the `SHEET_NAME` constant in `googleSheetsService.js`:

```javascript
const SHEET_NAME = 'YourSheetName'; // Change to your actual sheet tab name
```

## Step 8: Security - Add credentials.json to .gitignore

**CRITICAL**: Never commit `credentials.json` to version control!

Create or update `.gitignore` file in your project root:

```
# Google Sheets credentials
credentials.json

# Environment variables
.env
```

## Step 9: Test the Integration

1. Start your server:
   ```bash
   node server.js
   ```

2. Start your React app:
   ```bash
   npm start
   ```

3. Fill out the patient form and submit it
4. Check your Google Sheet - a new row should appear with the submitted data

## Troubleshooting

### Error: "credentials.json not found"
- Make sure `credentials.json` is in the root directory of your project
- Check the file name is exactly `credentials.json` (case-sensitive)

### Error: "The caller does not have permission"
- Make sure you shared the Google Sheet with the service account email
- Verify the service account has Editor permissions

### Error: "Unable to parse range"
- Check that your sheet name matches the `SHEET_NAME` in `googleSheetsService.js`
- Verify the column range (A:M) matches your sheet structure

### Data not appearing in sheet
- Check the server console for error messages
- Verify the Google Sheets API is enabled in your Google Cloud project
- Make sure the service account has the correct permissions

## Alternative: Using API Key (Not Recommended for Production)

If you want a simpler setup for testing (less secure):

1. In Google Cloud Console, go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **API Key**
3. Copy the API key
4. Make your Google Sheet publicly accessible (Anyone with the link can edit)
5. Update `googleSheetsService.js` to use API key authentication

**Note**: This method is not recommended for production as it requires making your sheet public.

## Support

For more information, see:
- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [Google Cloud Service Accounts](https://cloud.google.com/iam/docs/service-accounts)
