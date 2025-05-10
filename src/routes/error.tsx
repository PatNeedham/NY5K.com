import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import '../pages/ErrorPage.css';

export default function ErrorPage() {
  const error = useRouteError();
  
  let errorMessage = 'An unexpected error occurred';
  let statusCode = 500;
  
  if (isRouteErrorResponse(error)) {
    errorMessage = error.data?.message || error.statusText;
    statusCode = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }
  
  return (
    <div className="error-page">
      <h1>{statusCode}</h1>
      <h2>Oops! Something went wrong</h2>
      <p>{errorMessage}</p>
      <Link to="/" className="back-home-button">Go back home</Link>
    </div>
  );
}