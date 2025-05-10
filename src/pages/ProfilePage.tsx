import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../layouts/RootLayout';
import { getRaces } from '../services/api';
import { Race } from '../types';
import RaceCard from '../components/RaceCard';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [registeredRaces, setRegisteredRaces] = useState<Race[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    const fetchRegisteredRaces = async () => {
      if (!user?.registeredRaces?.length) return;
      
      setIsLoading(true);
      try {
        const allRaces = await getRaces();
        const userRaces = allRaces.filter(race => 
          user.registeredRaces.includes(race.id)
        );
        setRegisteredRaces(userRaces);
      } catch (error) {
        console.error('Error fetching registered races:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRegisteredRaces();
  }, [user, isAuthenticated, navigate]);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  if (!isAuthenticated || !user) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-info">
          <h1>My Profile</h1>
          <p className="user-email">{user.email}</p>
        </div>
        
        <button onClick={handleLogout} className="logout-button">
          Log Out
        </button>
      </div>
      
      <div className="profile-section">
        <h2>My Registered Races</h2>
        
        {isLoading ? (
          <div className="loading-message">Loading your races...</div>
        ) : registeredRaces.length > 0 ? (
          <div className="races-grid">
            {registeredRaces.map(race => (
              <div key={race.id} className="race-grid-item">
                <RaceCard race={race} />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>You haven't registered for any races yet.</p>
            <button onClick={() => navigate('/races')} className="browse-races-button">
              Browse Races
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;