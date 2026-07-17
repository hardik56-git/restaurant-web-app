Markdown
# 👑 Gourmet Palace - Premium Restaurant Web Application

<div align="center">

![MERN Stack](https://img.shields.io/badge/MERN-Stack-MediumPurple.svg?style=for-the-badge&logo=react)
![React 18](https://img.shields.io/badge/React-18-blue.svg?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-emerald.svg?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC.svg?style=for-the-badge&logo=tailwind-css)

**A high-end, luxury-themed restaurant web application engineered with the MERN stack, delivering an elite fine-dining digital experience.**

[Live Demo](:https://lnkd.in/gpu7i6Pj) • [Report Bug](https://github.com/gourmet-palace/issues) • [Request Feature](https://github.com/gourmet-palace/issues)

</div>

---

## 🌟 Key Features

*   🎨 **Premium UI/UX:** Stunning luxury dark and gold aesthetic crafted specifically for fine-dining presentation.
*   📱 **100% Responsive:** Smooth mobile-first layout engineered to adapt flawlessly to smartphones, tablets, and desktops.
*   🔐 **Secure Authentication:** Robust user registration and login pipelines utilizing JSON Web Tokens (JWT) and encrypted route guarding.
*   🛒 **Smart Shopping Cart:** Highly persistent client-side cart management leveraging `localStorage` for uninterrupted user sessions.
*   📦 **End-to-End Checkout:** Seamless ordering flow complete with real-time status updates and delivery logs.
*   👨‍💼 **Executive Admin Panel:** Full-scale back-office control system to add, edit, or delete menu items and manage client orders instantly.

---

## 🛠️ Tech Stack & Architecture

### Frontend
*   **Core:** React 18 & Vite (Blazing fast build speeds)
*   **Styling:** Tailwind CSS (Custom Gold utility extensions)
*   **Animations:** Framer Motion (Delightful, premium micro-interactions)
*   **State Management:** React Context API

### Backend & Database
*   **Server Environment:** Node.js & Express.js
*   **Database ODM:** MongoDB Atlas with Mongoose schemas
*   **Security:** JWT (JSON Web Tokens) & bcrypt hashing

---

## 📸 Previews & Visuals

> 💡 *Note: You can replace these placeholder banners with your app's actual screenshots later if you deploy it.*


---

## 📁 System Architecture (Project Structure)

```text
gourmet-palace/
├── client/              # React Frontend Client (Vite)
│   ├── src/
│   │   ├── components/  # Reusable Atomic UI Components
│   │   ├── context/     # Global App State Infrastructure
│   │   ├── pages/       # Layout Views (Home, Cart, Admin Panel)
│   │   ├── services/    # Modular Axios API Client Operations
│   │   └── App.jsx      # Application Root Config
│   └── package.json
├── server/              # Express Backend Server API
│   ├── config/          # Database Drivers & Connection Config
│   ├── controllers/     # Core Business & Route Handler Logic
│   ├── middleware/      # Payload Verification & Global Error Catchers
│   ├── models/          # Structured Mongoose Data Schemas
│   └── routes/          # Clean Restful Endpoint Aggregators
└── README.md
🚀 Quick Start & Installation
Prerequisites
Node.js: Version 18.x or higher installed

Database: Active local MongoDB instance or a remote MongoDB Atlas connection URI

Installation Steps
Clone the Project Repository:

Bash
git clone [https://github.com/gourmet-palace.git](https://github.com/gourmet-palace.git)
cd gourmet-palace
Install Comprehensive Dependencies:

Bash
npm run install-all
Configure Environment Variables:
Create a dedicated .env file within your server directory:

Bash
cp server/.env.example server/.env
Open the newly created server/.env file and input your environment configurations:

Code snippet
PORT=5000
MONGO_URI=mongodb://localhost:27017/gourmet-palace
JWT_SECRET=super_secret_gourmet_palace_key_12345
Running the Application
Execute Both Client & Server Concurrently (Recommended):

Bash
npm run dev
Running Components in Separate Terminal Tabs:

Backend Engine (Port 5000):

Bash
cd server && npm run dev
Frontend Sandbox (Port 3000):

Bash
cd client && npm run dev
Local Network Access Links
Client Portal: http://localhost:3000

API Server: http://localhost:5000/api

👨‍💼 Elevating to Administrative Privileges
To easily bootstrap a fully functioning Admin account on your system:

Fire up the client, go to the registration page, and register a baseline standard user account with email admin@example.com.

Launch your favorite database viewer (MongoDB Compass or Atlas Web UI) and locate the newly created user record.

Update the role key to flag it as "admin" by running this query:

JavaScript
db.users.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } })
🔗 Clean RESTful API Endpoints Reference
🔐 Authentication Operations
POST /api/auth/register - Registers a brand new user profile.

POST /api/auth/login - Authenticates user credentials & responds with a signed JWT.

GET /api/auth/me - Retouches authenticated user payload metadata (Protected).

🍽️ Culinary Menu Management
GET /api/foods - Pulls down the complete active restaurant menu catalog.

GET /api/foods/:id - Targets and pulls specific single dish information.

POST /api/foods - Spawns a brand new dish onto the live menu list (Admin Only).

PUT /api/foods/:id - Edits pricing, titles, or descriptions of existing menu objects (Admin Only).

DELETE /api/foods/:id - Purges a dish permanently from the system registry (Admin Only).

📦 Order Operations Flow
POST /api/orders - Initializes checkout mechanics and generates an active order invoice (Protected).

GET /api/orders/my-orders - Returns chronological historical receipts for the logged-in client (Protected).

GET /api/orders/all - Exposes the entire corporate ordering backlog (Admin Only).

PUT /api/orders/:id/status - Switches status updates (e.g., Preparing, Dispatched, Fulfilled) (Admin Only).

📄 License
Distributed safely under the protective guidelines of the MIT License. Review the LICENSE file packaged within this repo for extensive data rights information.

📬 Open Collaboration & Support
Have feedback, questions, or cool feature requests? Connect via GitHub Repository issues or submit a pull request directly to the project maintainers.
