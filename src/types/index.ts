export interface Race {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  registrationOpen: boolean;
  inaugural: boolean;
  entryPrice: number;
  raceWebsite: string;
  photoUrl: string;
  description: string;
  organizerId: number;
}

export interface PreviousRace {
  year: number;
  participantCount: number;
  winningTime: string;
  averageTime: string;
  resultsUrl: string;
  photos: string;
}

export interface RaceDetail {
  id: number;
  raceId: number;
  courseThumbnail: string;
  courseDescription: string;
  ageGroupCategories: string[];
  specialPrizes: string[];
  previousRaces: PreviousRace[];
}

export interface User {
  id: number;
  email: string;
  name: string;
  registeredRaces: number[];
  password?: string; // Added for mock data compatibility
}

export interface Review {
  id: number;
  raceId: number;
  userId: number;
  rating: number;
  comment: string;
  date: string;
}

export interface Organizer {
  id: number;
  name: string;
  website: string;
  description: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}