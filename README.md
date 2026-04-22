<div align="center">
  <div align="center">
    <h1>🎓 QuizIQ - Smart Learning Platform</h1>
  </div>
  <p align="center">
    <strong>The ultimate interactive quiz platform designed for modern educational institutions and schools.</strong>
  </p>
  <p align="center">
    <a href="https://reactjs.org/"><img src="https://img-shields.readme.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img-shields.readme.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
    <a href="https://vitejs.dev/"><img src="https://img-shields.readme.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"></a>
    <a href="https://tailwindcss.com/"><img src="https://img-shields.readme.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"></a>
    <a href="https://supabase.com/"><img src="https://img-shields.readme.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=3ECF8E" alt="Supabase"></a>
  </p>
</div>

<br />

## 📖 About The Project

**QuizIQ** is a comprehensive, feature-rich web application tailored for educational institutions. It empowers teachers to effortlessly design customized assessments and provides students with an engaging, gamified learning experience. From real-time analytics to automated digital certificates, QuizIQ provides a complete ecosystem for digital learning and evaluation.

## ✨ Key Features

- **⏱️ Smart Timer System**: Configurable time limits per question with auto-skip and auto-submission functionality.
- **📊 Advanced Analytics Dashboard**: Real-time performance tracking with comprehensive charts and reporting for both students and teachers.
- **🎨 Custom School Branding**: Tailor the platform to reflect your institution's identity (custom logos, colors, and themes).
- **🏆 Digital Certificates**: Automatically generate and distribute beautifully templated PDF certificates upon quiz completion.
- **🔐 Role-Based Access Control**: Secure, distinct portals for Students, Teachers, and Administrators.
- **📱 Responsive Design**: Fully optimized for desktops, tablets, and smartphones via modern layout primitives.

## 🛠️ Tech Stack

### Frontend Architecture
- **Framework:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **State Management & Fetching:** [React Query v5](https://tanstack.com/query/latest)
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Routing:** [React Router Dom](https://reactrouter.com/)

### Backend & Integrations
- **Backend as a Service:** [Supabase](https://supabase.com/) (PostgreSQL Database, Authentication, Edge Functions)
- **Data Visualization:** [Recharts](https://recharts.org/)
- **Document Generation:** [jsPDF](https://parall.ax/products/jspdf)

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- npm or [bun](https://bun.sh/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/anjali-codes2305/schoolhouse-quiziq.git
   cd schoolhouse-quiziq
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   # or
   bun run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:8080](http://localhost:8080) (or the port specified in your terminal).

## 📂 Project Structure

```text
src/
├── components/       # Reusable UI components (Buttons, Inputs, Navigation)
├── contexts/         # React Context providers (Theme, Auth)
├── hooks/            # Custom React hooks
├── integrations/     # Third-party integrations (Supabase setup)
├── lib/              # Utility functions and configurations
├── pages/            # Application routes and main views
├── App.tsx           # Main application component & routes
├── index.css         # Global stylesheets & Tailwind directives
└── main.tsx          # React application entry point
```

## 🤝 Contributing

Contributions make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👤 Author

**Anjali Agarwal**
- GitHub: [@anjali-codes2305](https://github.com/anjali-codes2305)
- LinkedIn: [Anjali Agarwal](https://www.linkedin.com/in/anjali230705/)
- Email: anjaliagarwal230705@gmail.com

---

<div align="center">
  <p>Made with ❤️ for modern education.</p>
</div>
