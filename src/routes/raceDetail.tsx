import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Race, RaceDetail as RaceDetailType, Review } from '../types';
import RaceReview from '../components/RaceReview';
import ReviewForm from '../components/ReviewForm';
import { getRaceById, getRaceDetail, getReviewsForRace } from '../services/api';
import '../pages/RaceDetailPage.css';

export default function RaceDetailPage() {
  const { raceId } = useParams<{ raceId: string }>();
  const [race, setRace] = useState<Race | null>(null);
  const [raceDetail, setRaceDetail] = useState<RaceDetailType | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchRaceDetails() {
      if (!raceId) {
        setError('Race ID not provided');
        setLoading(false);
        return;
      }

      try {
        const id = Number(raceId);
        
        // Fetch race, race details, and reviews in parallel
        const [raceData, raceDetailResponse, reviewsResponse] = await Promise.all([
          getRaceById(id),
          getRaceDetail(id),
          getReviewsForRace(id),
        ]);
        
        setRace(raceData);
        
        // raceDetailResponse might be an array if using json-server with a query
        console.log('Race detail response:', raceDetailResponse);
        const detailData = Array.isArray(raceDetailResponse) 
          ? raceDetailResponse[0] 
          : raceDetailResponse;
        
        // Additional check - if response is null but we have an ID, log detailed info
        if (!detailData && raceId) {
          console.error(`Failed to get race detail for race ID ${raceId}. Response:`, raceDetailResponse);
        }
        
        setRaceDetail(detailData);
        setReviews(reviewsResponse || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to load race details. Please try again later.');
        setLoading(false);
      }
    }
    
    fetchRaceDetails();
  }, [raceId]);
  
  const handleReviewSubmitted = () => {
    // In a real app, we would fetch the updated reviews
    if (!raceId) return;
    
    // Refresh reviews data
    getReviewsForRace(Number(raceId))
      .then(data => setReviews(data))
      .catch(err => console.error('Error refreshing reviews:', err));
  };
  
  // Calculate average rating
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;
  
  if (loading) {
    return (
      <div className="loading-state">
        <p>Loading race details...</p>
      </div>
    );
  }
  
  if (error || !race || !raceDetail) {
    return (
      <div className="error-state">
        <h2>Couldn't load race details</h2>
        <p>{error || 'Race not found'}</p>
        <Link to="/races" className="back-button">Back to all races</Link>
      </div>
    );
  }
  
  // Format date
  const formattedDate = new Date(race.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <div className="race-detail-page">
      <div className="race-header">
        <div className="race-header-content">
          <h1>{race.name}</h1>
          
          <div className="race-date-location">
            <p className="race-date">{formattedDate} at {race.time}</p>
            <p className="race-location">{race.location}</p>
          </div>
          
          <div className="race-stats">
            <div className="race-stat">
              <span className="stat-label">Entry Fee</span>
              <span className="stat-value">${race.entryPrice}</span>
            </div>
            
            <div className="race-stat">
              <span className="stat-label">Registration</span>
              <span className={`stat-value ${race.registrationOpen ? 'open' : 'closed'}`}>
                {race.registrationOpen ? 'Open' : 'Closed'}
              </span>
            </div>
            
            <div className="race-stat">
              <span className="stat-label">Inaugural</span>
              <span className="stat-value">{race.inaugural ? 'Yes' : 'No'}</span>
            </div>
            
            {reviews.length > 0 && (
              <div className="race-stat">
                <span className="stat-label">Rating</span>
                <span className="stat-value rating">
                  {averageRating.toFixed(1)} <span className="star">★</span>
                </span>
              </div>
            )}
          </div>
          
          {race.registrationOpen && (
            <a 
              href={race.raceWebsite} 
              target="_blank" 
              rel="noopener noreferrer"
              className="register-button"
            >
              Register Now
            </a>
          )}
        </div>
        
        <div className="race-header-image">
          <img 
            src={race.photoUrl || 'https://placehold.co/600x400?text=Race+Image'} 
            alt={race.name} 
          />
        </div>
      </div>
      
      <div className="race-detail-content">
        <div className="race-main-content">
          <section className="race-description-section">
            <h2>About this Race</h2>
            <p>{race.description}</p>
          </section>
          
          <section className="race-course-section">
            <h2>Course Information</h2>
            <div className="course-content">
              <div className="course-thumbnail">
                <img 
                  src={raceDetail?.courseThumbnail || 'https://placehold.co/600x400?text=Course+Map'} 
                  alt="Course Map" 
                />
              </div>
              <div className="course-description">
                <p>{raceDetail?.courseDescription}</p>
              </div>
            </div>
          </section>
          
          <section className="race-categories-section">
            <h2>Categories & Prizes</h2>
            <div className="categories-content">
              <div className="age-groups">
                <h3>Age Group Categories</h3>
                <ul className="categories-list">
                  {raceDetail?.ageGroupCategories?.map((category: string, index: number) => (
                    <li key={index}>{category}</li>
                  ))}
                </ul>
              </div>
              
              <div className="special-prizes">
                <h3>Special Prizes</h3>
                <ul className="prizes-list">
                  {raceDetail?.specialPrizes?.map((prize: string, index: number) => (
                    <li key={index}>{prize}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          
          {raceDetail?.previousRaces && raceDetail.previousRaces.length > 0 && (
            <section className="previous-races-section">
              <h2>Previous Editions</h2>
              <div className="previous-races-list">
                {raceDetail.previousRaces.map((prevRace: any, index: number) => (
                  <div key={index} className="previous-race-card">
                    <h3>{race.name} {prevRace.year}</h3>
                    
                    <div className="previous-race-stats">
                      <div className="prev-race-stat">
                        <span className="stat-label">Participants</span>
                        <span className="stat-value">{prevRace.participantCount}</span>
                      </div>
                      
                      <div className="prev-race-stat">
                        <span className="stat-label">Winning Time</span>
                        <span className="stat-value">{prevRace.winningTime}</span>
                      </div>
                      
                      <div className="prev-race-stat">
                        <span className="stat-label">Avg. Time</span>
                        <span className="stat-value">{prevRace.averageTime}</span>
                      </div>
                    </div>
                    
                    <div className="previous-race-links">
                      <a 
                        href={prevRace.resultsUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="previous-race-link"
                      >
                        View Results
                      </a>
                      
                      <a 
                        href={prevRace.photos} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="previous-race-link"
                      >
                        View Photos
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        
        <div className="race-sidebar">
          <div className="reviews-section">
            <h2>Reviews ({reviews.length})</h2>
            
            <ReviewForm 
              raceId={race.id} 
              onReviewSubmitted={handleReviewSubmitted} 
            />
            
            {reviews.length > 0 ? (
              <div className="reviews-list">
                {reviews.map(review => (
                  <RaceReview key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <div className="no-reviews">
                <p>No reviews yet. Be the first to review this race!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}