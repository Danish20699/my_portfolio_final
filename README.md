# 🚀 Danish Portfolio

A modern, premium portfolio website built with **React** and **Vite**. This project showcases my personal brand, projects, and technical articles with a sleek, responsive design.

## ✨ Features

- **🎨 Modern Aesthetics**: Premium glassmorphism design with smooth animations.
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices.
- **⚛️ Tech Stack**: Built using React 18, React Router v6, and Vite for blazing fast performance.
- **📂 Project Showcase**: Dynamic project gallery with featured and archive views.
- **📝 Blog Section**: A dedicated space for technical articles and insights.
- **🛣️ Client-Side Routing**: Smooth navigation without page reloads.

## 🛠️ Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine.

### Installation

1.  **Clone the repository** (if you haven't already):
    ```bash
    git clone https://github.com/Danish2/my_portfolio_webiste.git
    cd danish_portfolio
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Start the Development Server**:
    ```bash
    npm run dev
    ```
    The app will be accessible at `http://localhost:5173`.

### 🏗️ Building for Production

To create an optimized build for deployment:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 📂 Project Structure

```bash
danish_portfolio/
├── src/
│   ├── components/          # Reusable UI components (Navbar, Footer, Cards)
│   ├── App.jsx              # Routes + scroll restoration + skip link
│   ├── Home.jsx             # Landing page with sections
│   ├── Projects.jsx         # Dedicated projects page
│   ├── Blog.jsx             # Blog page for articles
│   ├── NotFound.jsx         # 404 page
│   ├── projectsData.js      # Data file for project entries
│   ├── blogData.js          # Data file for blog posts
│   ├── testimonialsData.js  # Real client quotes (section hides when empty)
│   ├── index.css            # Global styles and design tokens
│   └── main.jsx             # Application entry point
├── public/                  # Static assets served as-is
├── _legacy/                 # Pre-React files, kept for reference only
├── index.html               # HTML entry point
├── package.json             # Project dependencies and scripts
└── vite.config.ts           # Vite configuration
```

> **Styling note:** `src/index.css` is the single live stylesheet. The old
> root-level `styles.css` and `script.js` belong to the pre-React version and
> now live in `_legacy/` — nothing imports them.

## 🔗 Routes

- **`/`**: Homepage (Hero, About, Featured Projects)
- **`/projects`**: Full list of projects
- **`/blog`**: Technical articles and updates

## 🎨 Technology Stack

- **Frontend**: React, Javascript (ES6+)
- **Styling**: Vanilla CSS (Custom variables, Flexbox/Grid)
- **Build Tool**: Vite
- **Routing**: React Router DOM

---

© 2026 Danish. All Rights Reserved.