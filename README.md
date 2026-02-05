🚀 Taskora – Task Management & Collaboration Platform

Taskora is a modern full-stack task management application designed to help users organize tasks, manage priorities, and collaborate efficiently.
It focuses on clean UI, secure authentication, and real-world backend logic, making it ideal for both practical use and portfolio demonstration.

📌 Features
🔐 Authentication & Security

User signup and login with JWT authentication

Secure password hashing

OTP-based password reset via email

Protected routes for authorized users only

📝 Task Management

Create, update, and delete tasks

Set task priorities (High, Medium, Low)

Add task descriptions and due dates

Task status management (Pending / Completed)

🧑‍💼 User Experience

Clean and responsive UI

Priority indicators with icons

Toast notifications for actions (success/error)

Smooth navigation and user-friendly forms

☁️ Backend & Database
RESTful API using Node.js & Express.js
MongoDB for data storage
Scalable and modular backend structure

🛠️ Tech Stack
Frontend

Next.js (App Router)
React.js
TypeScript
Tailwind CSS
shadcn/ui
React Hook Form
Sonner (toast notifications)
Lucide React Icons

Backend

Node.js
Express.js
MongoDB with Mongoose
JWT (JSON Web Token)
Nodemailer (OTP email service)

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/taskora.git
cd taskora

2️⃣ Backend setup
cd backend
npm install
npm run dev


Create a .env file in backend/:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password

3️⃣ Frontend setup
cd frontend
npm install
npm run dev

🔄 API Endpoints (Sample)
Method	Endpoint	Description
POST	/auth/signup	Register new user
POST	/auth/login	Login user
POST	/auth/otp	Send OTP
POST	/auth/verifyotp	Verify OTP
POST	/auth/resetpassword	Reset password
POST	/tasks	Create task
GET	/tasks	Get all tasks
PUT	/tasks/:id	Update task
DELETE	/tasks/:id	Delete task

🌍 Deployment

Frontend can be deployed on Vercel
Backend can be deployed on Render / Railway
MongoDB hosted on MongoDB Atlas

🎯 Project Objective

The main goal of Taskora is to:

Apply real-world full-stack development concepts

Practice authentication, authorization, and API design

Build a clean, scalable project suitable for internships and job portfolios

🚧 Future Improvements

Google OAuth authentication
Team-based task collaboration
File attachments for tasks
Activity logs & analytics
Dark mode support

👨‍💻 Author

Hemant Gupta
Full Stack Developer (MERN)
📌 Built as part of an internship / learning project

⭐ Support
If you like this project, consider giving it a ⭐ on GitHub — it really helps!
