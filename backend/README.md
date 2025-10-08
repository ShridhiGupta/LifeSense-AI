# LifeSense AI Backend

Backend API server for LifeSense AI Healthcare Chatbot with MongoDB database.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
Create a `.env` file in this directory:

```env
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=AIzaSyAXnFRXMGK4Z7w3HrtUSqsTgiG8W6GoeQs
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3. Run Development Server
```bash
npm run dev
```

Or for production:
```bash
npm start
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/admin/login` - Admin login
- `POST /api/auth/staff/login` - Staff login
- `POST /api/auth/patient/login` - Patient login
- `POST /api/auth/staff/signup` - Staff registration

### Admin Operations
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/staff` - Get all staff
- `GET /api/admin/staff/pending` - Get pending staff approvals
- `POST /api/admin/staff/approve/:id` - Approve staff
- `DELETE /api/admin/staff/:id` - Remove staff
- `GET /api/admin/patients` - Get all patients
- `POST /api/admin/patients` - Create new patient
- `POST /api/admin/create` - Create new admin

### Chat
- `POST /api/chat` - General health chat
- `POST /api/patient-chat` - Personalized patient chat

### Health Check
- `GET /api/health` - Server health status

## 🔐 Default Admin

**Email**: guptashridhi11@gmail.com  
**Password**: shridhii

This admin account is always available and created automatically on first database connection.

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **@google/genai** - Google Gemini AI
- **googleapis** - Google Sheets integration

## 🌐 Deployment

See `DEPLOYMENT_GUIDE.md` in the root directory for complete deployment instructions.
