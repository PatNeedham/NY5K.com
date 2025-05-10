import { useState } from 'react';
import { addReview } from '../services/api';
import { useAuth } from '../layouts/RootLayout';
import './ReviewForm.css';

interface ReviewFormProps {
  raceId: number;
  onReviewSubmitted: () => void;
}

const ReviewForm = ({ raceId, onReviewSubmitted }: ReviewFormProps) => {
  const { user, isAuthenticated } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated || !user) {
      setError('You must be logged in to submit a review');
      return;
    }
    
    if (!comment.trim()) {
      setError('Please enter a comment');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      await addReview({
        raceId,
        userId: user.id,
        rating,
        comment,
        date: new Date().toISOString().split('T')[0]
      });
      
      setComment('');
      setRating(5);
      onReviewSubmitted();
    } catch (err) {
      setError('Failed to submit review. Please try again.');
      console.error('Error submitting review:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Generate star rating UI
  const renderRatingStars = () => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          className={`star-button ${i <= rating ? 'selected' : ''}`}
          onClick={() => setRating(i)}
          aria-label={`Rate ${i} stars`}
        >
          {i <= rating ? '★' : '☆'}
        </button>
      );
    }
    
    return stars;
  };
  
  if (!isAuthenticated) {
    return (
      <div className="review-form-container">
        <p className="login-prompt">Please login to leave a review</p>
      </div>
    );
  }
  
  return (
    <div className="review-form-container">
      <h3>Write a Review</h3>
      
      <form onSubmit={handleSubmit} className="review-form">
        <div className="rating-input">
          <label>Your Rating:</label>
          <div className="stars-container">
            {renderRatingStars()}
          </div>
        </div>
        
        <div className="comment-input">
          <label htmlFor="comment">Your Review:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this race..."
            rows={4}
            required
          />
        </div>
        
        {error && <p className="error-message">{error}</p>}
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;