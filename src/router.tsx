import { createBrowserRouter } from 'react-router-dom';

// Import route modules
import Root from './routes/root';
import ErrorPage from './routes/error';
import HomePage from './routes/home';
import RacesPage from './routes/races';
import RaceDetailPage from './routes/raceDetail';
import LoginPage from './routes/login';
import RegisterPage from './routes/register';
import ProfilePage from './routes/profile';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'races',
        element: <RacesPage />,
      },
      {
        path: 'races/:raceId',
        element: <RaceDetailPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
    ],
  },
]);