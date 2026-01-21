# Sophia Academy – SSLC Career Guidance AI Platform

A "new-gen" interactive career guidance platform designed for SSLC students. Built with a futuristic **Space MDS** aesthetic, it uses the **RIASEC psychometric model** to identify student traits and recommend the best academic streams (Science, Commerce, Arts, or Vocational).

## 🚀 Key Features
- **Space MDS Theme**: Futuristic dark mode with glassmorphism, neon accents, and smooth Framer Motion animations.
- **60-Question Assessment**: Comprehensive questionnaire covering 6 dimensions: Realistic, Investigative, Artistic, Social, Enterprising, and Conventional.
- **Real-time Progress**: Multi-phase assessment with data syncing indicators.
- **Dynamic Analysis**: Instant calculation of trait dominance and recommended pathways.
- **Branded Reports**: Generate and download professional PDF career reports.
- **FastAPI Backend**: Robust scoring engine and database integration using SQLite.

## 🛠️ Tech Stack
- **Frontend**: Vite + React, Tailwind CSS (Custom), Framer Motion, Lucide Icons, Axios.
- **Backend**: FastAPI (Python), SQLAlchemy, SQLite, ReportLab (PDF Generation).

---

## 🏗️ Project Structure
```text
Project - 03 SSLC/
├── frontend/           # React + Vite application
│   ├── src/            # Components, Logic, CSS
│   └── questions.json  # Assessment data
├── backend/            # FastAPI application
│   ├── main.py         # API endpoints & scoring logic
│   └── venv/           # Python virtual environment
└── README.md           # This guide
```

---

## ⚙️ Setup & Installation

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **Python** (v3.9 or higher)

### 2. Backend Setup
```powershell
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install fastapi uvicorn sqlalchemy reportlab pydantic
python main.py
```
*The backend will run on `http://localhost:8000`*

### 3. Frontend Setup
```powershell
cd frontend
npm install
npm run dev
```
*The frontend will run on `http://localhost:5173`*

---

## 🧠 Scoring Logic (RIASEC)
The assessment applies **Reverse Scoring** to specific questions to ensure reliability. Results are calculated as a percentage for six categories:
1. **Realistic (R)**: Practical, physical, hands-on.
2. **Investigative (I)**: Analytical, scientific, curious.
3. **Artistic (A)**: Creative, independent, expressive.
4. **Social (S)**: Helpful, empathetic, community-oriented.
5. **Enterprising (E)**: Persuasive, leadership, business-focused.
6. **Conventional (C)**: Organized, detail-oriented, structured.

---

## 📄 Generating Reports
Once the assessment is submitted, the system:
1. Analyzes the scores to find the **Dominant Trait**.
2. Maps the trait to a **Recommended Pathway** (e.g., Science/Technical for Investigative/Realistic).
3. Stores the data in `career_guidance.db`.
4. Enables the **"Download Branded PDF"** button which fetches a generated PDF from the backend.

---

## 🛡️ License
Built for **Sophia Academy**. © 2026. All Rights Reserved.
