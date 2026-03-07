## ChatBot Widget Platform
A full-stack MERN (MongoDB, Express, React, Node.js) application that allows users to create, customize, and embed AI-powered chatbot widgets on any website using a single line of code.

### 🚀 Features
User Authentication: Secure registration and login using JWT (JSON Web Tokens).

Customizable Dashboard: Real-time configuration of bot name, welcome messages, and theme colors.

Live Preview: Instant visual feedback of the widget as you change configurations.

Embeddable Widget: A lightweight JavaScript snippet to integrate the chatbot into any external site.

Dynamic Configuration: Bot settings are fetched live from the Render-hosted backend.

### 🛠️ Tech Stack
Frontend: Next.js, Tailwind CSS, Framer Motion.

Backend: Node.js, Express.js.

Database: MongoDB Atlas.

Authentication: JWT & Middleware.

Hosting: Vercel (Frontend) & Render (Backend).

### 🏗️ Project Architecture
The platform consists of three main parts:

The Dashboard: Where users manage their bots (Protected by Auth middleware).

The Embed Logic: A public API route that serves specific bot configurations based on a unique ID.

The Widget Script: A JavaScript file that generates an iframe to render the ChatWidget component.

### 🔧 Installation & Setup
Clone the Repository:

Bash
git clone [https://github.com/SatyamRaj-WebDeveloper/chatbot-platform]
Backend Configuration:

Create a .env file in the /backend folder.

Add: MONGODB_URI, JWT_SECRET, and PORT=5000.

npm install followed by npm start.

Frontend Configuration:

Update the API URLs in ChatContext.js and embed/page.js to point to your backend.

npm install followed by npm run dev.

### 📝 How to Use
Login to your account.

Customize your bot's identity (Name, Color, Welcome Message).

Copy the script tag from the "Installation Snippet" section.

Paste the script into any HTML file.


Live Deployment Link - [https://chatbot-platform-jade.vercel.app/]

### 👨‍💻 Author
Satyam Raj
Final Year Computer Science Student
Lucknow, India