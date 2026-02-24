# 🧠 BrainScan AI - Brain Tumor Detection System

A full-stack, AI-powered web application designed to analyze MRI scans for the presence and classification of brain tumors. This application utilizes a convolutional neural network (CNN) model hosted on Hugging Face for the inference, a scalable Node.js backend for authentication and history tracking, and a premium modern React frontend with sophisticated animations.

## 🚀 Live Links

- **Frontend Application:** [https://brain-tumour-eight.vercel.app/](https://brain-tumour-eight.vercel.app/) (Deployed on Vercel)
- **Backend API:** [https://braintumour-de8v.onrender.com](https://braintumour-de8v.onrender.com) (Deployed on Render)
- **ML Inference Model:** [Hugging Face Space](https://huggingface.co/spaces/mahadiya2510/brain-tumor-ml/tree/main)
- **Database:** MongoDB Atlas

---

## 💻 Tech Stack

### Frontend
- **Framework:** React + Vite + TypeScript
- **Styling:** Tailwind CSS (Dark Mode Premium Aesthetics, Glassmorphism)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Data Fetching:** Axios / Context API

### Backend
- **Framework:** Node.js + Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Authentication:** JWT (JSON Web Tokens)
- **File Parsing:** Multer

### Machine Learning
- **Model Hosting:** Hugging Face Inference API
- **Capabilities:** Analysis of MRI scans (.jpg, .png, .dicom) with specific classification accuracy metrics.

---

## ✨ Features

- **Advanced UI Design:** A beautiful dark-themed interface built using bespoke glassmorphism concepts.
- **Micro-Animations:** Fluid loading states, staggered page entrances, and shimmer effects via Framer Motion.
- **Secure Authentication:** Fully registered user login, protected routes, and managed API tokens.
- **AI-Powered Diagnostics:** Fast and reliable tumor classification using robust neural network architectures.
- **Historical Analysis:** A dedicated dashboard containing the full trace of previous analyses with visual confidence level outputs.
- **Responsive Layouts:** Perfectly adapts to mobile, tablet, and ultra-wide desktop monitors.

---

## ⚙️ Running Locally

### 1. Requirements
Ensure you have Node.js (v18+) and npm installed. 

### 2. Backend Setup
1. Open a terminal and navigate to the backend service.
   ```bash
   cd backend
   npm install
   ```
2. Set up your `.env` variables containing your MongoDB URI and JWT secrets.
3. Start the server:
   ```bash
   npm start
   ```

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory.
   ```bash
   cd frontend
   npm install
   ```
2. Verify that your `.env` environment variables are connected to the backend API (`VITE_BACKEND_URL`).
3. Start the Vite development environment:
   ```bash
   npm run dev
   ```
4. Access the portal at `http://localhost:5173/`.
