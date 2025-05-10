import { Race, RaceDetail, User, Review } from '../types';

// Import mock data directly
const mockData = {
  "races": [
    {
      "id": 1,
      "name": "Central Park Spring Fling 5K",
      "date": "2025-05-25",
      "time": "08:00 AM",
      "location": "New York City, NY",
      "registrationOpen": true,
      "inaugural": false,
      "entryPrice": 35,
      "raceWebsite": "https://example.com/central-park-spring-fling",
      "photoUrl": "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1350&q=80",
      "description": "A beautiful 5K through Central Park in the spring. Experience the beauty of Central Park in full bloom as you run through scenic paths and iconic landmarks.",
      "organizerId": 1
    },
    {
      "id": 2,
      "name": "Brooklyn Bridge Dash",
      "date": "2025-06-09",
      "time": "07:30 AM",
      "location": "Brooklyn, NY",
      "registrationOpen": true,
      "inaugural": true,
      "entryPrice": 40,
      "raceWebsite": "https://example.com/brooklyn-bridge-dash",
      "photoUrl": "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "description": "Run across the iconic Brooklyn Bridge with stunning views of the Manhattan skyline. This exciting urban race takes you across the famous Brooklyn Bridge and through the vibrant streets of Brooklyn.",
      "organizerId": 2
    },
    {
      "id": 3,
      "name": "Albany River Run Spectacular",
      "date": "2025-07-09",
      "time": "09:00 AM",
      "location": "Albany, NY",
      "registrationOpen": true,
      "inaugural": false,
      "entryPrice": 30,
      "raceWebsite": "https://example.com/albany-river-run",
      "photoUrl": "https://images.unsplash.com/photo-1502224562085-639556652f33?auto=format&fit=crop&w=1350&q=80",
      "description": "A beautiful 5K along the Hudson River in Albany. Enjoy scenic views and a flat, fast course perfect for setting a personal record.",
      "organizerId": 3
    },
    {
      "id": 4,
      "name": "Syracuse Lakeview Loop Challenge",
      "date": "2025-08-08",
      "time": "08:30 AM",
      "location": "Syracuse, NY",
      "registrationOpen": true,
      "inaugural": false,
      "entryPrice": 35,
      "raceWebsite": "https://example.com/syracuse-lakeview",
      "photoUrl": "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=1350&q=80",
      "description": "Run around beautiful Onondaga Lake with stunning views and a mostly flat course. This popular annual race offers beautiful lake views and a supportive community atmosphere.",
      "organizerId": 2
    },
    {
      "id": 5,
      "name": "Buffalo Canalside Sprint Fest",
      "date": "2025-08-28",
      "time": "08:00 AM",
      "location": "Buffalo, NY",
      "registrationOpen": true,
      "inaugural": true,
      "entryPrice": 35,
      "raceWebsite": "https://example.com/buffalo-canalside",
      "photoUrl": "https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=1350&q=80",
      "description": "A fast and flat course along Buffalo's revitalized waterfront and canal district. Experience Buffalo's renaissance while running through the vibrant Canalside district.",
      "organizerId": 1
    }
  ],
  "raceDetails": [
    {
      "id": 1,
      "raceId": 1,
      "courseThumbnail": "https://images.unsplash.com/photo-1600975815238-1be84b60e1b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "courseDescription": "This 5K course loops around the southern portion of Central Park, starting and finishing near Tavern on the Green. The course includes rolling hills through beautiful scenery with plenty of shade from the park's mature trees.",
      "ageGroupCategories": ["Under 18", "19-29", "30-39", "40-49", "50-59", "60+"],
      "specialPrizes": ["Top 3 Overall", "Age Group Winners", "Team Competition"],
      "previousRaces": [
        {
          "year": 2024,
          "participantCount": 1250,
          "winningTime": "15:42",
          "averageTime": "28:15",
          "resultsUrl": "https://example.com/results/central-park-5k-2024",
          "photos": "https://example.com/photos/central-park-5k-2024"
        },
        {
          "year": 2023,
          "participantCount": 1150,
          "winningTime": "15:58",
          "averageTime": "28:30",
          "resultsUrl": "https://example.com/results/central-park-5k-2023",
          "photos": "https://example.com/photos/central-park-5k-2023"
        }
      ]
    },
    {
      "id": 2,
      "raceId": 2,
      "courseThumbnail": "https://images.unsplash.com/photo-1655377239795-cdd7f9dc53e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "courseDescription": "This inaugural race takes runners across the iconic Brooklyn Bridge and through the streets of Brooklyn. Participants will enjoy unparalleled views of the Manhattan skyline and East River during this unique urban 5K.",
      "ageGroupCategories": ["Under 18", "19-29", "30-39", "40-49", "50-59", "60+"],
      "specialPrizes": ["Top 3 Overall", "Age Group Winners", "Best Brooklyn-themed Costume"],
      "previousRaces": []
    },
    {
      "id": 3,
      "raceId": 3,
      "courseThumbnail": "https://images.unsplash.com/photo-1534787300217-a325a72e3c8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "courseDescription": "This Albany 5K follows a scenic route along the Hudson River, featuring historic sites and beautiful waterfront views. The relatively flat course makes it perfect for runners of all levels.",
      "ageGroupCategories": ["Under 18", "19-29", "30-39", "40-49", "50-59", "60+"],
      "specialPrizes": ["Top 3 Overall", "Age Group Winners", "Local Resident Award"],
      "previousRaces": [
        {
          "year": 2024,
          "participantCount": 850,
          "winningTime": "16:12",
          "averageTime": "29:45",
          "resultsUrl": "https://example.com/results/albany-river-run-2024",
          "photos": "https://example.com/photos/albany-river-run-2024"
        }
      ]
    },
    {
      "id": 4,
      "raceId": 4,
      "courseThumbnail": "https://images.unsplash.com/photo-1517776832751-0a7e6993de03?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "courseDescription": "The Syracuse Lakeview Loop Challenge circles the beautiful Onondaga Lake with stunning views throughout the entire course. Runners will enjoy a mostly flat terrain with small rolling hills and plenty of water stations.",
      "ageGroupCategories": ["Under 18", "19-29", "30-39", "40-49", "50-59", "60+"],
      "specialPrizes": ["Top 3 Overall", "Age Group Winners", "Syracuse University Alumni Award"],
      "previousRaces": [
        {
          "year": 2024,
          "participantCount": 750,
          "winningTime": "15:25",
          "averageTime": "27:30",
          "resultsUrl": "https://example.com/results/syracuse-lakeview-2024",
          "photos": "https://example.com/photos/syracuse-lakeview-2024"
        },
        {
          "year": 2023,
          "participantCount": 700,
          "winningTime": "15:37",
          "averageTime": "27:45",
          "resultsUrl": "https://example.com/results/syracuse-lakeview-2023",
          "photos": "https://example.com/photos/syracuse-lakeview-2023"
        }
      ]
    },
    {
      "id": 5,
      "raceId": 5,
      "courseThumbnail": "https://images.unsplash.com/photo-1598968326685-35ca9d1c50ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "courseDescription": "The Buffalo Canalside Sprint Fest takes runners through Buffalo's revitalized waterfront district and historic canal area. This completely flat course is perfect for setting a personal record while enjoying the city's renaissance.",
      "ageGroupCategories": ["Under 18", "19-29", "30-39", "40-49", "50-59", "60+"],
      "specialPrizes": ["Top 3 Overall", "Age Group Winners", "Buffalo Bills Fan Award"],
      "previousRaces": []
    }
  ],
  "users": [
    {
      "id": 1,
      "email": "user1@example.com",
      "password": "password123",
      "name": "John Runner",
      "registeredRaces": [1, 3]
    },
    {
      "id": 2,
      "email": "user2@example.com",
      "password": "password123",
      "name": "Jane Jogger",
      "registeredRaces": [2, 5]
    }
  ],
  "reviews": [
    {
      "id": 1,
      "raceId": 1,
      "userId": 1,
      "rating": 4.5,
      "comment": "Great race with excellent organization! The course was beautiful and challenging.",
      "date": "2024-06-02"
    },
    {
      "id": 2,
      "raceId": 3,
      "userId": 1,
      "rating": 5,
      "comment": "Amazing 4th of July race. The views were incredible and the patriotic atmosphere was fun!",
      "date": "2024-07-05"
    },
    {
      "id": 3,
      "raceId": 2,
      "userId": 2,
      "rating": 4,
      "comment": "Well organized inaugural race. Looking forward to next year!",
      "date": "2024-06-16"
    },
    {
      "id": 4,
      "raceId": 5,
      "userId": 2,
      "rating": 3.5,
      "comment": "Beautiful course but water stations could be better organized.",
      "date": "2024-09-21"
    }
  ],
  "organizers": [
    {
      "id": 1,
      "name": "NYRR",
      "website": "https://example.com/nyrr",
      "description": "New York's premier running organization hosting events throughout the year."
    },
    {
      "id": 2,
      "name": "Brooklyn Running Co.",
      "website": "https://example.com/brooklyn-running",
      "description": "Brooklyn's local running club organizing community races in the borough."
    },
    {
      "id": 3,
      "name": "Liberty Running Events",
      "website": "https://example.com/liberty-running",
      "description": "Specializing in unique running experiences at iconic New York landmarks."
    }
  ]
};

// Export mock data functions that mimic the API
export const getMockRaces = (): Promise<Race[]> => {
  return Promise.resolve(mockData.races);
};

export const getMockRaceById = (id: number): Promise<Race> => {
  const race = mockData.races.find(r => r.id === id);
  if (!race) {
    return Promise.reject(new Error(`Race with ID ${id} not found`));
  }
  return Promise.resolve(race);
};

export const getMockRaceDetail = (id: number): Promise<RaceDetail> => {
  console.log(`Looking for race detail with race ID ${id}`, mockData.raceDetails);
  
  const raceDetail = mockData.raceDetails.find(rd => rd.raceId === id);
  
  if (!raceDetail) {
    console.error(`Race detail with race ID ${id} not found`);
    return Promise.reject(new Error(`Race detail with race ID ${id} not found`));
  }
  
  console.log(`Found race detail:`, raceDetail);
  return Promise.resolve(raceDetail);
};

export const getMockReviewsForRace = (raceId: number): Promise<Review[]> => {
  const reviews = mockData.reviews.filter(r => r.raceId === raceId);
  return Promise.resolve(reviews);
};

export const mockLogin = (email: string): Promise<User> => {
  const user = mockData.users.find(u => u.email === email);
  if (!user) {
    return Promise.reject(new Error('User not found'));
  }
  return Promise.resolve(user);
};

export const mockRegister = (userData: Partial<User>): Promise<User> => {
  // Create a new user with an ID that doesn't exist yet
  const newId = Math.max(...mockData.users.map(u => u.id)) + 1;
  const newUser = {
    id: newId,
    email: userData.email || '',
    name: userData.name || '',
    password: userData.password || '',
    registeredRaces: userData.registeredRaces || []
  };
  
  // In a real app, you would add the user to the database here
  // This is just a mock
  return Promise.resolve(newUser);
};

export const mockAddReview = (reviewData: Partial<Review>): Promise<Review> => {
  // Create a new review with an ID that doesn't exist yet
  const newId = Math.max(...mockData.reviews.map(r => r.id)) + 1;
  const newReview = {
    id: newId,
    raceId: reviewData.raceId || 0,
    userId: reviewData.userId || 0,
    rating: reviewData.rating || 0,
    comment: reviewData.comment || '',
    date: reviewData.date || new Date().toISOString().split('T')[0]
  };
  
  // In a real app, you would add the review to the database here
  // This is just a mock
  return Promise.resolve(newReview);
};