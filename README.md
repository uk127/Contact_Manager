# Contact Manager - MERN Stack Application

A full-stack Contact Management Web Application built with MongoDB, Express.js, React.js, and Node.js.

## Features

- ✅ Contact form with validation (Name, Email, Phone, Message)
- ✅ Client-side validation with error messages
- ✅ RESTful API (GET, POST, DELETE)
- ✅ MongoDB database integration
- ✅ Display contacts without page reload
- ✅ Responsive design with Tailwind CSS
- ✅ Delete contact functionality
- ✅ Success messages
- ✅ Sort contacts (newest/oldest)
- ✅ Submit button disabled when form is invalid

## Tech Stack

- **Frontend**: React.js with Vite
- **Backend**: Node.js + Express.js
- **Database**: MongoDB with Mongoose
- **Styling**: Tailwind CSS
- **State Management**: React useState hooks

## Project Structure

```
Contact_Manager/
├── backend/
│   ├── models/
│   │   └── Contact.js
│   ├── routes/
│   │   └── contactRoutes.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContactForm.jsx
│   │   │   ├── ContactList.jsx
│   │   │   └── ContactCard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
└── package.json
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Installation

1. **Install all dependencies:**
   ```bash
   npm run install-all
   ```

2. **Set up MongoDB:**
   - Option 1: Use local MongoDB
     - Make sure MongoDB is running on `mongodb://localhost:27017`
   - Option 2: Use MongoDB Atlas
     - Create a cluster and get your connection string
     - Update `MONGODB_URI` in `backend/.env`

3. **Create environment file:**
   ```bash
   cd backend
   cp .env.example .env
   ```
   Edit `.env` and set your MongoDB URI if needed.

4. **Run the application:**
   ```bash
   npm run dev
   ```
   This will start both backend (port 5000) and frontend (port 3000) concurrently.

   Or run them separately:
   ```bash
   # Terminal 1 - Backend
   npm run server

   # Terminal 2 - Frontend
   npm run client
   ```

5. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## API Endpoints

- `GET /api/contacts` - Fetch all contacts
- `POST /api/contacts` - Create a new contact
- `DELETE /api/contacts/:id` - Delete a contact by ID

## Contact Schema

```javascript
{
  name: String (required, min 2 characters),
  email: String (required, valid email format),
  phone: String (required),
  message: String (optional),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## Features Breakdown

### Form Validation
- Name: Required, minimum 2 characters
- Email: Required, valid email format
- Phone: Required, valid phone format (minimum 10 digits)
- Message: Optional
- Real-time validation with error messages
- Submit button disabled when form is invalid

### UI/UX
- Responsive design (mobile, tablet, desktop)
- Clean and modern interface
- Success messages for actions
- Loading states
- Hover effects and transitions
- Sort functionality (newest/oldest)

## Development

The project uses:
- **Vite** for fast frontend development
- **Nodemon** for backend auto-reload
- **Concurrently** to run both servers together

## License

ISC

