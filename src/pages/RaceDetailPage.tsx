import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Race, RaceDetail, Review } from '../types';
import RaceReview from '../components/RaceReview';
import ReviewForm from '../components/ReviewForm';
import './RaceDetailPage.css';

interface RaceDetailData {
  race: Race;
  raceDetail: RaceDetail;
  reviews: Review[];
}

const RaceDetailPage = () => {
  // Using a dummy loader function for now - we're using direct data fetching in the routes
  const dummyData = useLoaderData() as RaceDetailData;
  const race = dummyData?.race || null;
  const raceDetail = dummyData?.raceDetail || null;
  const [reviews, setReviews] = useState<Review[]>(dummyData?.reviews || []);
  
  // Format date
  const formattedDate = race?.date ? new Date(race.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';
  
  const handleReviewSubmitted = () => {
    // In a real app, we would fetch the updated reviews
    // For now, we'll just reload the page
    window.location.reload();
  };
  
  // Calculate average rating
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;
  
  if (!race || !raceDetail) {
    return null; // This page is not used directly - the route component handles loading states
  }
  
  return (
    <div className="race-detail-page">
      {/* Rest of the component remains the same */}
    </div>
  );
};

export default RaceDetailPage;