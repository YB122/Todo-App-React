# ☀️ TodoSun - Premium React Task Management Suite

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite)](https://vite.dev/)
[![Vercel](https://img.shields.io/badge/API-PostgreSQL-000000?logo=vercel)](https://todo-nti.vercel.app/)

**TodoSun** is a state-of-the-art task management application engineered for modern professionals. It combines the power of **React 19** with the sleek aesthetics of **Tailwind CSS v4** to provide a seamless, high-performance experience across all devices.

---

## 🚀 Experience the Quality

**Live Demo**: [todoappreactnti.netlify.app](https://todoappreactnti.netlify.app/)

### ✨ Core Features

- **🎯 Precision Dashboards**: A clean, focus-oriented task list with instant CRUD (Create, Read, Update, Delete) actions. Content intelligent wrapping ensures readability on any screen size.
- **🛡️ Multi-Layered Security**: Robust authentication system with protected routes using custom `ProtectedRoute` and `GuestRoute` components.
- **👁️ Password Visibility Intelligence**: Integrated "Eye" toggle buttons across Login, Register, and Profile settings to ensure credential accuracy.
- **🌓 Intelligent Dark Mode**: A persistence-enabled theme engine that remembers your preference, featuring a high-contrast slate aesthetic for reduced eye strain.
- **⚡ Reactive Feedback System**: Real-time notifications for every action (success, error, loading) via a customized `react-hot-toast` implementation.
- **⚙️ Comprehensive Profile Suite**: Dedicated user management area allowing secure updates to personal details and credentials.
- **📱 Universal Responsiveness**: A mobile-first design strategy that adapts perfectly from 4K monitors to compact smartphones.

---

## 🛠️ Technical Architecture

### 🚀 Frontend Engine
- **Framework**: [React 19](https://react.dev/) utilizing the latest concurrent features.
- **Styling Strategy**: **Explicit Tailwind CSS v4**. We avoid external CSS files to ensure zero-config portability and high performance.
- **Logic & Forms**: [React Hook Form](https://react-hook-form.com/) combined with [Zod](https://zod.dev/) for industrial-grade schema validation.
- **State Management**: Context API for global user authentication and token handling.
- **Tooling**: [Vite 6.0](https://vite.dev/) for lightning-fast HMR and optimized production builds.

### 🌐 Backend Integration
TodoSun consumes a professional RESTful API:
- **Base URL**: `https://todo-nti.vercel.app/`
- **Endpoints**:
  - `POST /user/signup`: Registration
  - `POST /user/login`: Authentication
  - `GET /todo/get-all`: Task Retrieval
  - `POST /todo/create`: Task Creation
  - `PATCH /todo/update-todo/:id`: Task Modification
  - `DELETE /todo/delete-todo/:id`: Task Removal

---

## 📂 Project Structure

```text
src/
├── component/        # Atomic components scaled for reuse
│   ├── Home/         # Main task dashboard logic
│   ├── Login/        # Secure entry point
│   ├── Register/     # New user onboarding
│   ├── Profile/      # User account settings
│   ├── NavBar/       # Dynamic navigation with theme toggle
│   └── ...           # Layout, Guest/Protected Route wrappers
├── contexts/         # Global state (User auth & tokens)
├── assets/           # Static media and brand assets
└── App.jsx           # Root routing and configuration
```

---

## 💎 Design Philosophy

### "Glassmorphism & Flow"
The UI is inspired by modern design trends:
- **Depth**: Subtle borders and translucent backgrounds.
- **Micro-animations**: Smooth transitions for modal entries and list updates.
- **Typography**: Utilizing clean sans-serif fonts for maximum legibility.
- **Pill-Aesthetic**: Extensive use of high-border-radius elements (`rounded-full`, `rounded-3xl`) for a approachable, premium feel.

---

## 🏁 Getting Started

### Prerequisites
- Node.js (v18+)
- npm / yarn

### Installation
1. **Clone the project**
   ```bash
   git clone https://github.com/YB122/Todo-App-React.git
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Ignite development server**
   ```bash
   npm run dev
   ```
4. **Build for production**
   ```bash
   npm run build
   ```

---

## 👤 Author

**Youssef Benyamine**  
*Front-End Software Engineer*

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-blue?logo=linkedin)](https://www.linkedin.com/in/youssef-benyamine-b55a81219/)
[![GitHub](https://img.shields.io/badge/GitHub-Profile-black?logo=github)](https://github.com/YB122)

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

*Built with passion for the technical craft.*
