// This is a simple test script to check if the mock API is working correctly
// Run with: node src/test-api.js

fetch('http://localhost:8000/races')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Races data fetched successfully:');
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });