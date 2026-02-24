# ☀️ TodoSun - Premium React Task Manager

TodoSun is a modern, high-performance task management application built with **React 19**, **Vite**, and **Tailwind CSS v4**. It features a sleek, "premium" aesthetic with fully explicit styling, advanced route guarding, and a robust user experience across both light and dark themes.

---

## ✨ Features

- **🚀 Performance-First**: Built on Vite for lightning-fast HMR and build times.
- **🎨 Premium UI/UX**: Soft-shadow cards, ultra-rounded ("pill") inputs and buttons, and smooth micro-animations.
- **🌓 Adaptive Dark Mode**: Seamlessly toggle between light and high-contrast dark themes with persistence.
- **🛡️ State-of-the-Art Routing**:
  - **Guest Space**: Prevents unauthenticated users from accessing dashboards.
  - **User Space**: Prevents logged-in users from seeing Auth pages (Login/Register).
- **📝 Full Task CRUD**: Create, read, update, and delete tasks with instant feedback.
- **🔔 Toast Notifications**: Interactive alerts for auth and task actions using `react-hot-toast`.
- **⚙️ Profile Management**: View and update user credentials with secure form handling.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **State/API**: [Axios](https://axios-http.com/)
- **UI Components**: [Flowbite](https://flowbite.com/)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/YB122/Todo-App-React.git
cd Todo-App-React
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

---

## 📁 Project Structure

```text
src/
├── component/        # Modular UI components
│   ├── Home/         # Task Dashboard
│   ├── Profile/      # User Settings
│   ├── NavBar/       # Responsive Navigation
│   ├── GuestRoute/   # Auth Guard (Unauthenticated)
│   └── ProtectedRoute/ # Auth Guard (Authenticated)
├── contexts/         # React Context (User/Theme)
├── assets/           # Static media
└── index.css         # Minimal Tailwind v4 base
```

---

## 💎 Design Philosophy

TodoSun prioritizes **Explicit Styling**. Instead of relying on large custom CSS files, we use explicit Tailwind utility classes directly in our JSX templates. This ensures:
1. **Speed**: No CSS-to-JS calculation overhead.
2. **Maintenance**: Layouts and styles are co-located with logic.
3. **Good Roundedness**: All inputs and buttons utilize `rounded-full` for a modern, approachable feel.

---

## 📜 License

Created by **YB122**. Open for exploration and inspiration.
