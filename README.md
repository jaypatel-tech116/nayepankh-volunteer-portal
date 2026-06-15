# 🌱 NayePankh Foundation — Volunteer Registration System

A complete, production-ready web application for managing volunteer registrations at **NayePankh Foundation**, an Indian NGO dedicated to empowering students and providing them with opportunities to grow, learn, and contribute to society.

> **"Giving Wings to Dreams"**

---

## ✨ Features

### 🌐 Public
- 🏠 Beautiful landing page with hero, about, mission, impact stats, testimonials
- 📝 Multi-step (3-step) volunteer registration form with real-time validation
- 🔐 Secure login with role-based redirection
- 📱 Fully responsive design (mobile, tablet, desktop)

### 👤 Volunteer Panel
- 📊 Personal dashboard with status-aware welcome message
- 👁️ View registration status (Pending / Approved / Rejected)
- ✏️ Edit profile information
- 📋 View complete volunteer details

### 🛡️ Admin Panel
- 📈 Dashboard with live statistics, charts (Recharts), and recent registrations
- 👥 Full volunteer management with search, filter, sort, and pagination
- ✅ Approve / ❌ Reject volunteers with admin notes
- 🗑️ Delete volunteers
- ☑️ Bulk approve/reject with checkbox selection
- 📄 Export reports as PDF (jsPDF) and CSV
- 📊 Detailed analytics: skills distribution, city breakdown, year/hours stats

### 🎨 Design
- 🌙 Glassmorphism cards with backdrop blur
- 🎨 Gradient buttons and modern color palette
- ✨ Scroll-reveal animations (Intersection Observer)
- 🖼️ Animated counter numbers for impact stats
- 💫 Hover effects and micro-animations throughout

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 (Vite) | UI Framework |
| Tailwind CSS v4 | Styling |
| React Router DOM v6 | Routing |
| React Hook Form + Zod | Form handling & validation |
| Axios | API calls |
| React Hot Toast | Notifications |
| Lucide React | Icons |
| Recharts | Charts & graphs |
| jsPDF + jspdf-autotable | PDF export |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database & ODM |
| JWT (jsonwebtoken) | Authentication |
| bcryptjs | Password hashing |
| express-validator | Request validation |
| cors + dotenv | CORS & config |

---

## 📁 Project Structure

```
nayepankh-volunteer-system/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/               # AdminSidebar, AdminHeader, ExportButton
│   │   │   ├── common/              # Navbar, Footer, Loader, ProtectedRoute, etc.
│   │   │   └── volunteer/           # StatusBadge
│   │   ├── context/                 # AuthContext
│   │   ├── hooks/                   # useAuth, useVolunteers
│   │   ├── pages/
│   │   │   ├── admin/               # AdminDashboard, AllVolunteers, VolunteerDetail, Reports
│   │   │   ├── public/              # LandingPage, RegisterPage, LoginPage, NotFoundPage
│   │   │   └── volunteer/           # VolunteerDashboard, EditProfile
│   │   ├── schemas/                 # registerSchema, loginSchema (Zod)
│   │   ├── services/                # api, authService, volunteerService, adminService, exportService
│   │   └── utils/                   # constants, formatters, validators
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── server/                          # Node.js Backend
│   ├── config/                      # db.js
│   ├── controllers/                 # auth, volunteer, admin, report
│   ├── middleware/                   # authMiddleware, adminMiddleware, errorHandler, validateRequest
│   ├── models/                      # User, Volunteer
│   ├── routes/                      # auth, volunteer, admin, report
│   ├── utils/                       # generateToken, sendResponse, csvGenerator, pdfGenerator
│   ├── server.js
│   ├── seed.js
│   ├── .env
│   └── package.json
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18 or higher
- **MongoDB** (local installation or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **npm** or **yarn**

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/your-username/nayepankh-volunteer-system.git
cd nayepankh-volunteer-system
```

#### 2. Setup Backend
```bash
cd server
npm install
```

Create a `.env` file (or copy `.env.example`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nayepankh_volunteers
JWT_SECRET=nayepankh_super_secret_jwt_key_2025
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Start the server:
```bash
npm run dev
```

> The admin account is auto-seeded on first server start.

#### 3. Setup Frontend
```bash
cd ../client
npm install
```

Create a `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the client:
```bash
npm run dev
```

#### 4. Open in Browser
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api

---

## 🌐 API Documentation

### Auth Routes (`/api/auth`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register new volunteer |
| POST | `/api/auth/login` | ❌ | Login (volunteer + admin) |
| GET | `/api/auth/me` | ✅ | Get current user info |
| POST | `/api/auth/logout` | ✅ | Logout |

### Volunteer Routes (`/api/volunteers`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/volunteers/profile` | ✅ Volunteer | Get own profile |
| PUT | `/api/volunteers/profile` | ✅ Volunteer | Update own profile |
| GET | `/api/volunteers/status` | ✅ Volunteer | Get own status |

### Admin Routes (`/api/admin`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/admin/volunteers` | ✅ Admin | Get all (paginated, filterable) |
| GET | `/api/admin/volunteers/:id` | ✅ Admin | Get single volunteer |
| PUT | `/api/admin/volunteers/:id/status` | ✅ Admin | Approve/Reject |
| DELETE | `/api/admin/volunteers/:id` | ✅ Admin | Delete volunteer |
| GET | `/api/admin/stats` | ✅ Admin | Dashboard statistics |

### Report Routes (`/api/reports`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/reports/pdf` | ✅ Admin | Export as PDF data |
| GET | `/api/reports/csv` | ✅ Admin | Export as CSV file |
| GET | `/api/reports/stats` | ✅ Admin | Detailed statistics |

---

## 🔐 Environment Variables

### Server (`server/.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/nayepankh_volunteers` |
| `JWT_SECRET` | JWT signing secret | (required) |
| `JWT_EXPIRE` | Token expiry duration | `7d` |
| `NODE_ENV` | Environment | `development` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:5173` |

### Client (`client/.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api` |

---

## 👥 Default Credentials

### Admin
- **Email**: `admin@nayepankh.org`
- **Password**: `Admin@123`

### Test Volunteer
- Register a new account at `/register`

---

## 📸 Screenshots

| Page | Description |
|------|-------------|
| Landing Page | Hero section with animated stats, about, mission cards |
| Register | 3-step form with progress bar and real-time validation |
| Login | Clean card design with role-based redirect |
| Volunteer Dashboard | Status-aware welcome, profile summary, skills |
| Admin Dashboard | Stats cards, Recharts pie/bar charts, recent table |
| All Volunteers | Search, filter, sort, paginate, bulk actions |
| Reports | PDF/CSV export with detailed analytics |

---

## 🌐 Deployment & Hosting Guide

This project is optimized for direct hosting: **Backend API on Render** and **Frontend Client on Vercel**.

### 1. Backend Deployment (Render)
1. Sign up/Log in to [Render](https://render.com).
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository containing this codebase.
4. Set the following settings:
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Click **Advanced** to add Environment Variables:
   - `PORT`: `5000` (or leave default, Render sets it dynamically)
   - `MONGODB_URI`: Your MongoDB Atlas Connection String
   - `JWT_SECRET`: A long, secure random string for signing tokens
   - `JWT_EXPIRE`: `7d`
   - `NODE_ENV`: `production`
   - `CLIENT_URL`: Your deployed Vercel URL (e.g., `https://your-app.vercel.app`, or `*` to allow multiple origins during setup)

### 2. Frontend Deployment (Vercel)
1. Sign up/Log in to [Vercel](https://vercel.com).
2. Click **Add New** -> **Project**.
3. Connect your GitHub repository containing this codebase.
4. Set the following settings:
   - **Framework Preset**: `Vite` (automatically detected)
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Under **Environment Variables**, add:
   - `VITE_API_URL`: Your deployed Render API URL followed by `/api` (e.g., `https://your-backend.onrender.com/api`)
6. Deploy! Vercel will automatically handle routing thanks to the configured [vercel.json](file:///d:/VS%20CODE/NAYEPANKH%20FOUNDATION/nayepankh-volunteer-system/client/vercel.json) rewrite rule inside the `client` folder.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🙏 Acknowledgements

- **NayePankh Foundation** for inspiring this project
- Built with ❤️ to support student empowerment across India
