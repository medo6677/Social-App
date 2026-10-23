<div align="center">

  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/flame.svg" width="68" height="68" alt="App Logo" />

  # 🌟 SocialPulse | Next-Gen Social Media Experience

  <p align="center">
    <b>A modern, high-performance, and feature-rich social media platform built with React 19, TypeScript, Tailwind CSS v4, and HeroUI.</b>
  </p>

  <p align="center">
    <a href="#-key-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-project-architecture">Architecture</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-environment-variables">Environment</a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
    <img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/React_Query-v5-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" alt="TanStack Query" />
    <img src="https://img.shields.io/badge/HeroUI-3.2-000000?style=for-the-badge&logo=nextui&logoColor=white" alt="HeroUI" />
  </p>

</div>

---

## 🚀 Overview

**SocialPulse** is a responsive, lightning-fast social networking application delivering a seamless user experience across all devices (mobile, tablet, desktop). Crafted with modern software architecture, type-safe APIs, robust state management, and fluid animations.

---

## ✨ Key Features

### 🔐 Authentication & Security
- **JWT-Based Authentication**: Persistent and secure token management.
- **Form Validation**: Strict schema validation powered by **Zod** & **React Hook Form**.
- **Protected Routes**: Restrict unauthorized access with auto-redirects.
- **Account Settings**: Seamless password changing and security preferences.

### 📰 Interactive Feed & Posts
- **Infinite Feed**: Smooth dynamic post loading with skeleton previews.
- **Rich Media Creation**: Create posts with text and image attachments.
- **Engagement Engine**:
  - Instant **Like / Unlike** feedback with optimistic updates.
  - Interactive **Comments** system (add, view, and manage comments).
  - Quick **Share & Copy Link** utilities.
- **Detailed Post View**: Dedicated post page with responsive layout optimized down to 320px mobile screens.

### 👤 Profile & Customization
- **Personal Profile**: Dedicated space for user posts, saved content, and media.
- **Public User Profiles**: Visit and explore other community members' profiles.
- **Smart Image Cropping**:
  - Interactive avatar crop & adjustment modal via `react-easy-crop`.
  - Custom cover banner upload with real-time preview and positioning.
- **Polished Skeletons**: Zero layout shifts with modern loading states.

### 🎨 Design & Experience
- **Tailwind CSS v4 & HeroUI**: Modern styling, clean tokens, and accessible interactive primitives.
- **Fully Responsive**: Crafted specifically for mobile-first fluid scaling (320px to 4K).
- **Toast Notifications**: Contextual, non-intrusive alerts powered by `react-hot-toast`.
- **Lucide Icons**: Unified, elegant iconography.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool & Bundler** | [Vite](https://vitejs.dev/) |
| **Styling & Design** | [Tailwind CSS v4](https://tailwindcss.com/) & [HeroUI](https://heroui.com/) |
| **Server State & Caching** | [TanStack React Query v5](https://tanstack.com/query) |
| **HTTP Client** | [Axios](https://axios-http.com/) |
| **Form & Validation** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **Icons & Media** | [Lucide React](https://lucide.dev/) & [React Easy Crop](https://github.com/ValentinH/react-easy-crop) |
| **Date & Utilities** | [Moment.js](https://momentjs.com/) |

---

## 📁 Project Architecture

```plaintext
socialMediaApp/
├── 📁 public/                 # Static public assets
├── 📁 src/
│   ├── 📁 Assets/            # Local images, illustrations & icons
│   ├── 📁 Components/        # Modular & reusable UI components
│   │   ├── 📁 Auth/          # Login, Register forms
│   │   ├── 📁 Common/        # Buttons, Modals, Share, Skeletons
│   │   ├── 📁 Context/       # Token & Auth context providers
│   │   ├── 📁 Feed/          # PostCard, CreatePost, Feed lists
│   │   ├── 📁 Layouts/       # Master layouts, Sidebars, Navbar
│   │   ├── 📁 Profile/       # Avatar/Cover modals, Profile tabs
│   │   ├── 📁 ProtectedRoutes# Route guards
│   │   └── 📁 Settings/      # Password change & Account settings
│   ├── 📁 Hooks/             # Custom hooks (CRUD, useGet, usePost, etc.)
│   ├── 📁 Interfaces/        # Shared TypeScript types & data models
│   ├── 📁 Pages/             # Top-level application route views
│   ├── 📁 Schemas/           # Zod validation schemas
│   ├── 📁 Services/          # Centralized API service layer
│   ├── 📄 App.tsx            # Main router and provider configuration
│   ├── 📄 main.tsx           # Application entry point
│   └── 📄 index.css          # Global Tailwind styles & font imports
├── 📄 .env.example           # Template for environment variables
├── 📄 .gitignore             # Git exclusions
├── 📄 package.json           # Dependencies and run scripts
└── 📄 vite.config.ts         # Vite bundler configuration
```

---

## 🚦 Getting Started

Follow these simple steps to get a local development copy up and running:

### Prerequisites

Ensure you have **Node.js** (v18 or higher recommended) and **npm** installed:
```bash
node -v
npm -v
```

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/medo6677/Social-App.git
   cd Social-App
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create your local `.env` file from the example:
   ```bash
   cp .env.example .env.local
   ```
   Configure your backend API endpoint inside `.env.local`:
   ```env
   VITE_BASE_URL=https://route-posts.routemisr.com
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   Navigate to `http://localhost:5173` to explore the app!

---

## ⚙️ Environment Variables

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `VITE_BASE_URL` | Base API URL for backend services & endpoints | `https://route-posts.routemisr.com` |

---

## 📜 Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| **Development** | `npm run dev` | Runs the app in development mode with HMR |
| **Build** | `npm run build` | Compiles TypeScript and creates optimized production bundle in `dist/` |
| **Preview** | `npm run preview` | Locally previews the production build |
| **Lint** | `npm run lint` | Runs ESLint to check code quality |

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center">

  Made with ❤️ by **[Mohamad Ahmed](https://github.com/medo6677)**

  ⭐️ *If you found this project helpful, please consider giving it a star!* ⭐️

</div>
