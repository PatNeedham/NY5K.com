# NY 5K - Race Discovery Platform

A React application built with React Router v7 Framework mode for discovering 5K running races.

## Features

- Browse upcoming 5K races
- View detailed race information
- Read and write race reviews
- User authentication (login/signup)
- Race filtering and search

## Tech Stack

- React 19
- React Router 7 (Framework Mode with clientLoader)
- TypeScript
- Vite
- JSON Server (for mock API)

## Project Structure

The project follows the React Router v7 Framework Mode structure:

- `src/routes/` - Contains route components with co-located clientLoader functions
- `src/components/` - Reusable UI components
- `src/services/` - API and data fetching logic
- `src/types/` - TypeScript interfaces and types

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Running the Application

#### Option 1: Using the External Mock API Server

1. Start the mock API server:

```bash
npm run mock-api
```

2. In a separate terminal, start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

#### Option 2: Using Embedded Mock Data (Recommended)

You can run the application with embedded mock data without needing a separate API server:

```bash
npm run dev:mock
```

This will start the development server with built-in mock data.

### Building for Production

#### Regular Build

To build the application for production (requires a real API or separate mock API):

```bash
npm run build
```

#### Build with Embedded Mock Data

To build the application with embedded mock data (no separate API required):

```bash
npm run build-with-mock-data
```

This is useful for demonstrations, static hosting, and testing.

The build artifacts will be stored in the `dist/` directory.

### Previewing the Build

To preview the production build locally:

```bash
npm run preview
```

Or with mock data:

```bash
npm run preview:mock
```

## API Endpoints

The application uses the following mock API endpoints:

- `GET /api/races` - Get a list of all races
- `GET /api/races/:id` - Get details for a specific race
- `GET /api/raceDetails?raceId=:id` - Get additional details for a specific race
- `GET /api/reviews?raceId=:id` - Get reviews for a specific race
- `POST /api/reviews` - Create a new review
- `GET /api/users?email=:email` - Get user by email (for login)
- `POST /api/users` - Create a new user (for registration)

## Deployment

This application is a static site that can be deployed to any web hosting service:

- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting
- AWS S3
- Cloudflare Pages
- etc.

No server-side rendering is utilized, enabling compatibility with any static file hosting service.

## Real API Implementation

To replace the mock API with a real backend:

1. Update the API service functions in `src/services/api.ts`
2. Ensure your real API endpoints match the expected data structures
3. Update the Vite proxy configuration in `vite.config.ts` to point to your real API server

## License

This project is licensed under the MIT License.