import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../routes/root';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth(); // Removed unused 'user' variable
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="logo">NY 5K</Link>
      </div>
      
      <div className="navbar-menu">
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/races" className="nav-item">Races</Link>
        
        {isAuthenticated ? (
          <>
            <Link to="/profile" className="nav-item">Profile</Link>
            <button onClick={handleLogout} className="nav-button logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-item">Login</Link>
            <Link to="/register" className="nav-button">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;