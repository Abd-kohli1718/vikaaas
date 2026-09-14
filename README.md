# VIKAS 2026 — Participant & Post-Registration Portal

This is the standalone **VIKAS 2026 Post-Registration & Participant Portal** application, decoupled from the main landing page repository so it can be deployed, developed, and version-controlled independently.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
The application will start on `http://localhost:5173/` (or next available port).

### 3. Build for Production
```bash
npm run build
```

---

## 📦 How to Push to a New / Different Git Repository

To push this standalone project to its own Git repository:

```bash
# 1. Navigate to this directory
cd "after reister"

# 2. Initialize a fresh Git repository
git init

# 3. Stage all files (node_modules and dist are ignored automatically by .gitignore)
git add .

# 4. Create your first commit
git commit -m "feat: initial commit for VIKAS 2026 participant portal"

# 5. Set main branch
git branch -M main

# 6. Add your remote repository URL (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME_OR_ORG/YOUR_REPO_NAME.git

# 7. Push to GitHub
git push -u origin main
```

---

## 📂 Project Architecture

```
after reister/
├── index.html                 # Main HTML entry point
├── package.json               # Dependencies (Vite, React 19, Tailwind, Framer Motion, Lucide)
├── tailwind.config.js         # Heritage theme color tokens & fonts
├── vite.config.ts             # Vite configuration
├── public/                    # Assets (logos, emblems, track artwork, textures)
└── src/
    ├── App.tsx                # Standalone Router & route definitions
    ├── main.tsx               # DOM mount entry
    ├── index.css              # Theme styling & paper aesthetic
    ├── components/
    │   ├── PostRegLayout.tsx  # Portal layout with header, torn-edge & footer
    │   ├── PostRegNavbar.tsx  # Dedicated participant portal navbar
    │   ├── GoogleAuthModal.tsx# Google OAuth & mock login selector
    │   └── CommunityQR.tsx    # WhatsApp community QR generator
    ├── pages/
    │   ├── RegisterPage.tsx   # 6-Step Registration Wizard (Category -> Track -> Author -> Team -> WhatsApp -> Passport)
    │   ├── DashboardPage.tsx  # Participant command center & timeline
    │   ├── SubmitPage.tsx     # Abstract upload & validation portal (.pdf)
    │   ├── ProfilePage.tsx    # Live participant card & profile editor
    │   ├── GuidelinesPage.tsx # Evaluation framework (100 pts) & rules
    │   ├── CommunityPage.tsx  # WhatsApp community join portal
    │   └── LoginPage.tsx      # Sign-in entrance
    ├── data/
    │   └── tracks.ts          # 9 Research tracks and criteria definitions
    └── utils/
        └── storage.ts         # LocalStorage persistence & participant schema
```

---

## 🧭 Routes Overview

| Route | Page | Description |
|---|---|---|
| `/` | Redirect | Automatically points to `/register` |
| `/register` | Registration Ledger | 6-step multi-tier registration wizard |
| `/login` | Authentication | Google sign-in and account switch |
| `/dashboard` | Dashboard | Participant hub, mission progress & status |
| `/submit` | Submit Idea | Abstract submission with drag-and-drop PDF upload |
| `/profile` | Profile | Live-updating participant passport card editor |
| `/guidelines` | Guidelines | 100-point rubric breakdown & conclave rules |
| `/community` | Community | Official IEEE conclave WhatsApp group join |
