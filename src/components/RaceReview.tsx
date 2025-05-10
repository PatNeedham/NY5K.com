import { Review, User } from '../types';
import './RaceReview.css';

interface RaceReviewProps {
  review: Review;
  user?: User;
}

const RaceReview = ({ review, user }: RaceReviewProps) => {
  // Format date
  const formattedDate = new Date(review.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Generate stars for rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(review.rating);
    const hasHalfStar = review.rating % 1 >= 0.5;
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="star filled">★</span>);
    }
    
    // Half star
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half-filled">★</span>);
    }
    
    // Empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star">☆</span>);
    }
    
    return stars;
  };
  
  return (
    <div className="review">
      <div className="review-header">
        <div className="review-author">
          <strong>{user?.name || 'Anonymous User'}</strong>
        </div>
        <div className="review-date">{formattedDate}</div>
      </div>
      
      <div className="review-rating">
        {renderStars()}
        <span className="rating-number">{review.rating.toFixed(1)}</span>
      </div>
      
      <div className="review-comment">
        <p>{review.comment}</p>
      </div>
    </div>
  );
};

export default RaceReview;