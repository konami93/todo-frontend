# Todo Frontend

Frontend application for task management (Todo App) built with React, TypeScript, Vite, and Tailwind CSS.

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Backend API running and accessible

## Installation

1. Clone the repository (if you haven't already):
```bash
git clone <repository-url>
cd todo-frontend
```

2. Install dependencies:
```bash
npm install
```

## Backend Configuration

To connect the application with the backend, you need to configure the `VITE_API_URL` environment variable.

### Option 1: `.env` File (Recommended)

Create a `.env` file in the project root with the following content:

```env
VITE_API_URL=http://localhost:3000/api
```

**Note:** Replace `http://localhost:3000/api` with your backend API URL.

**Linux/Mac:**
```bash
export VITE_API_URL=http://localhost:3000/api
npm run dev
```

### Default URL

If `VITE_API_URL` is not configured, the application will use by default: `http://localhost:3000/api`

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port that Vite assigns).

### Build for Production

```bash
npm run build
```

The compiled files will be generated in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
todo-frontend/
├── src/
│   ├── components/     # Reusable components
│   ├── contexts/       # React contexts (AuthContext)
│   ├── pages/          # Application pages
│   ├── services/       # API services (api.ts)
│   ├── types/          # TypeScript definitions
│   └── utils/          # Utilities
├── public/             # Static files
└── package.json        # Dependencies and scripts
```

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Static typing
- **Vite** - Build tool and dev server
- **Tailwind CSS** - CSS framework
- **Axios** - HTTP client
- **React Router** - Routing

## Authentication

The application uses JWT tokens stored in `localStorage`. The token is automatically sent in the `Authorization` header as `Bearer <token>` in all authenticated requests.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build application for production
- `npm run preview` - Preview production build
- `npm run lint` - Run linter
