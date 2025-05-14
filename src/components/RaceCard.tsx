import { Link } from 'react-router-dom';
import { Race } from '../types';
import './RaceCard.css';

interface RaceCardProps {
  race: Race;
}

const RaceCard = ({ race }: RaceCardProps) => {
  const formattedDate = new Date(race.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <div className="race-card">
      <div className="race-card-image">
        <img src={race.photoUrl || 'https://placehold.co/600x400?text=Race+Image'} alt={race.name} />
        {race.inaugural && <span className="race-badge inaugural">Inaugural Race</span>}
        {!race.registrationOpen && <span className="race-badge registration-closed">Registration Closed</span>}
      </div>
      
      <div className="race-card-content">
        <h3>{race.name}</h3>
        <p className="race-location">{race.location}</p>
        <p className="race-date">{formattedDate}</p>
        
        <div className="race-card-footer">
          <Link to={`/races/${race.id}`} className="view-details-button">
            View Details
          </Link>
          <Link to={`/races?location=${race.location.split(',')[0]}`} className="find-similar-button">
            Similar Races
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RaceCard;