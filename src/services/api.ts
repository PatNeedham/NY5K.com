import { Race, RaceDetail, User, Review } from '../types';
import { 
  getMockRaces, 
  getMockRaceById, 
  getMockRaceDetail, 
  getMockReviewsForRace,
  mockLogin,
  mockRegister,
  mockAddReview
} from './mockData';

// Check if we should use mock data
// Log the environment variable for debugging (will be removed in production)
console.log("VITE_USE_MOCK_DATA:", import.meta.env.VITE_USE_MOCK_DATA);

// Double check for both string 'true' and boolean true for maximum compatibility
const USE_MOCK_DATA = 
  import.meta.env.VITE_USE_MOCK_DATA === 'true' || 
  import.meta.env.VITE_USE_MOCK_DATA === true || 
  import.meta.env.MODE === 'mock';
const API_URL = 'http://localhost:8000';

// Generic fetch function
const fetchData = async<T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${API_URL}${endpoint}`);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  return response.json();
};

// Post data function
const postData = async<T>(endpoint: string, data: any): Promise<T> => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  return response.json();
};

// API Functions

// Race API
export const getRaces = () => {
  return USE_MOCK_DATA ? getMockRaces() : fetchData<Race[]>('/races');
};

export const getRaceById = (id: number) => {
  return USE_MOCK_DATA ? getMockRaceById(id) : fetchData<Race>(`/races/${id}`);
};

export const getRaceDetail = (id: number) => {
  return USE_MOCK_DATA ? getMockRaceDetail(id) : fetchData<RaceDetail>(`/raceDetails?raceId=${id}`);
};

// Auth API
export const login = (email: string, _password: string) => { // Renamed to _password since it's not used
  if (USE_MOCK_DATA) {
    return mockLogin(email);
  }
  
  return fetchData<User>(`/users?email=${email}`).then(users => {
    const user = Array.isArray(users) ? users[0] : users;
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // In a real app, you would validate the password here
    return user;
  });
};

export const register = (userData: Partial<User>) => {
  return USE_MOCK_DATA ? mockRegister(userData) : postData<User>('/users', userData);
};

// Reviews API
export const getReviewsForRace = (raceId: number) => {
  return USE_MOCK_DATA ? getMockReviewsForRace(raceId) : fetchData<Review[]>(`/reviews?raceId=${raceId}`);
};

export const addReview = (reviewData: Partial<Review>) => {
  return USE_MOCK_DATA ? mockAddReview(reviewData) : postData<Review>('/reviews', reviewData);
};