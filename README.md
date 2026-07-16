# 👑 Gourmet Palace - Premium Restaurant Web Application

<div align="center">

[![MERN Stack](https://img.shields.io/badge/MERN-Stack-MediumPurple.svg?style=for-the-badge&logo=react)](https://react.dev/)
[![React 18](https://img.shields.io/badge/React-18-blue.svg?style=for-the-badge&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-emerald.svg?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**A premium, modern restaurant web application built using the MERN stack featuring a dark and gold luxury aesthetic.**

[Live Demo](#) • [Report Bug](#) • [Request Feature](#)

</div>

---

## 🌟 मुख्य विशेषताएं (Features)

*   🎨 **Premium UI/UX:** डार्क और गोल्ड लग्जरी थीम जो रेस्टोरेंट को एक प्रीमियम लुक देती है।
*   📱 **Fully Responsive:** मोबाइल-फर्स्ट डिज़ाइन, जो हर स्क्रीन साइज पर परफेक्ट चलता है।
*   🔐 **Secure JWT Authentication:** सुरक्षित लॉगिन, रजिस्ट्रेशन और प्रोटेक्टेड राउट्स।
*   🛒 **Smart Shopping Cart:** `localStorage` के साथ परसिस्टेंट कार्ट (पेज रिफ्रेश होने पर भी आइटम सेव रहेंगे)।
*   📦 **Smooth Order Management:** पूरा चेकआउट फ्लो और ऑर्डर ट्रैकिंग सिस्टम।
*   👨‍💼 **Powerful Admin Dashboard:** एडमिन के लिए फूड आइटम्स और ऑर्डर्स को मैनेज करने का पूरा कंट्रोल।

---

## 🛠️ टेक स्टैक (Tech Stack)

| लेयर (Layer) | टेक्नोलॉजी (Technologies) |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, Framer Motion |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB with Mongoose |
| **Authentication** | JWT (JSON Web Tokens) |
| **State Management** | React Context API |

---

## 📸 स्क्रीनशॉट्स (Screenshots)

> 💡 *आकर्षण बढ़ाने के लिए यहाँ अपने प्रोजेक्ट के स्क्रीनशॉट्स या GIF ज़रूर जोड़ें।*

| Home Page (Dark + Gold Theme) | Admin Dashboard |
| --- | --- |
| `![Home Screen](https://via.placeholder.com/400x250?text=Premium+Home+UI)` | `![Dashboard](https://via.placeholder.com/400x250?text=Admin+Dashboard)` |

---

## 📁 प्रोजेक्ट स्ट्रक्चर (Project Structure)

```text
gourmet-palace/
├── client/              # React frontend (Vite)
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── context/     # Global state management
│   │   ├── pages/       # Page components (Home, Cart, Admin)
│   │   ├── services/    # Axios / API services
│   │   └── App.jsx      # Main application entry
│   └── package.json
├── server/              # Express backend
│   ├── config/          # Database connection
│   ├── controllers/     # Business logic for routes
│   ├── middleware/      # Auth & error handlers
│   ├── models/          # MongoDB Mongoose schemas
│   └── routes/          # API endpoints
└── README.md
