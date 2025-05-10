import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RaceCard from '../components/RaceCard';
import { Race } from '../types';
import { getRaces } from '../services/api';
import '../pages/HomePage.css';

export default function HomePage() {
  const [upcomingRaces, setUpcomingRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRaces() {
      try {
        const races = await getRaces();
        
        if (!Array.isArray(races)) {
          setError('Invalid data format received from API');
          setLoading(false);
          return;
        }
        
        // Sort races by date and take the first 5
        const sortedRaces = [...races].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        ).slice(0, 5);
        
        setUpcomingRaces(sortedRaces);
        setLoading(false);
      } catch (err) {
        setError('Failed to load races. Please try again later.');
        setLoading(false);
      }
    }
    
    fetchRaces();
  }, []);
  
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Discover Your Next 5K Race</h1>
          <p>Find and review 5K races in New York and beyond.</p>
          <div className="hero-buttons">
            <Link to="/races" className="primary-button">Browse Races</Link>
            <Link to="/register" className="secondary-button">Sign Up</Link>
          </div>
        </div>
      </section>
      
      <section className="upcoming-races">
        <div className="section-header">
          <h2>Upcoming Races</h2>
          <Link to="/races" className="see-all-link">See All Races</Link>
        </div>
        
        {loading ? (
          <div className="loading-state">
            <p>Loading races...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <p>{error}</p>
          </div>
        ) : upcomingRaces && upcomingRaces.length > 0 ? (
          <div className="race-grid">
            {upcomingRaces.map(race => (
              <div key={race.id} className="race-grid-item">
                <RaceCard race={race} />
              </div>
            ))}
          </div>
        ) : (
          <div className="no-races">
            <p>No upcoming races found. Check back soon!</p>
          </div>
        )}
      </section>
      
      <section className="features-section">
        <h2>Why NY 5K?</h2>
        
        <div className="features-grid">
          <div className="feature-card">
            <h3>Discover Races</h3>
            <p>Find 5K races in your area and get all the details you need.</p>
          </div>
          
          <div className="feature-card">
            <h3>Read Reviews</h3>
            <p>See what other runners have to say about races you're interested in.</p>
          </div>
          
          <div className="feature-card">
            <h3>Share Your Experience</h3>
            <p>Rate and review races to help other runners make decisions.</p>
          </div>
        </div>
      </section>
    </div>
  );
}