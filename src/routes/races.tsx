import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import RaceCard from '../components/RaceCard';
import { Race } from '../types';
import { getRaces } from '../services/api';
import '../pages/RacesPage.css';

export default function RacesPage() {
  const [searchParams] = useSearchParams();
  const locationFromUrl = searchParams.get('location');
  
  const [races, setRaces] = useState<Race[]>([]);
  const [filteredRaces, setFilteredRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [filters, setFilters] = useState({
    search: locationFromUrl || '',
    upcoming: true,
    registrationOpen: false,
    inaugural: false,
  });
  
  // Fetch races data
  useEffect(() => {
    async function fetchRaces() {
      try {
        const racesData = await getRaces();
        
        if (Array.isArray(racesData)) {
          setRaces(racesData);
        } else {
          setError('Failed to load races data. Invalid format received.');
        }
      } catch (err) {
        setError('Failed to load races. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchRaces();
  }, []);
  
  // Filter races when races array or filters change
  useEffect(() => {
    if (!races.length) return;
    
    let results = [...races];
    
    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      results = results.filter(race => 
        race.name.toLowerCase().includes(searchTerm) || 
        race.location.toLowerCase().includes(searchTerm)
      );
    }
    
    // Filter by upcoming
    if (filters.upcoming) {
      results = results.filter(race => new Date(race.date) >= new Date());
    }
    
    // Filter by registration status
    if (filters.registrationOpen) {
      results = results.filter(race => race.registrationOpen);
    }
    
    // Filter by inaugural status
    if (filters.inaugural) {
      results = results.filter(race => race.inaugural);
    }
    
    // Sort by date
    results.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    setFilteredRaces(results);
  }, [races, filters]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFilters(prev => ({ ...prev, [name]: checked }));
  };
  
  return (
    <div className="races-page">
      <h1>Browse Races</h1>
      
      <div className="filters-container">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search races..."
            value={filters.search}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        
        <div className="checkbox-filters">
          <label className="filter-label">
            <input
              type="checkbox"
              name="upcoming"
              checked={filters.upcoming}
              onChange={handleFilterChange}
            />
            Upcoming Only
          </label>
          
          <label className="filter-label">
            <input
              type="checkbox"
              name="registrationOpen"
              checked={filters.registrationOpen}
              onChange={handleFilterChange}
            />
            Registration Open
          </label>
          
          <label className="filter-label">
            <input
              type="checkbox"
              name="inaugural"
              checked={filters.inaugural}
              onChange={handleFilterChange}
            />
            Inaugural Races
          </label>
        </div>
      </div>
      
      {loading ? (
        <div className="loading-state">
          <p>Loading races...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <p>{error}</p>
        </div>
      ) : (
        <>
          <div className="races-count">
            <span>{filteredRaces.length} races found</span>
          </div>
          
          {filteredRaces.length > 0 ? (
            <div className="races-grid">
              {filteredRaces.map(race => (
                <div key={race.id} className="race-grid-item">
                  <RaceCard race={race} />
                </div>
              ))}
            </div>
          ) : (
            <div className="no-races-found">
              <p>No races found matching your filters. Try adjusting your search criteria.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}