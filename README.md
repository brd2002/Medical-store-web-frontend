# Medical Store Web Frontend

A modern web application for managing a medical store, built with React, TypeScript, Vite, and TailwindCSS.

## Features

- Customer, inventory, and sales management
- Authentication and user management
- Dashboard and reports
- Responsive UI with TailwindCSS

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd Medical project frontend/project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

- The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### 4. Build for production

```bash
npm run build
```

- The production-ready files will be in the `dist` folder.

### 5. Preview the production build

```bash
npm run preview
```

### 6. Lint the code

```bash
npm run lint
```

## Project Structure

```
project/
  src/
    components/      # React components
    data/            # Mock data
    types/           # TypeScript types
    App.tsx          # Main App component
    main.tsx         # Entry point
    index.css        # Global styles
  public/            # Static assets (if any)
  index.html         # HTML template
```

## Customization

- TailwindCSS configuration: `tailwind.config.js`
- ESLint configuration: `eslint.config.js`
- Vite configuration: `vite.config.ts`

## Notes

- No environment variables are required by default.
- For any backend/API integration, update the relevant files in `src/`.

---

Feel free to contribute or open issues for improvements!
