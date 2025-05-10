// Custom middleware for JSON Server to handle CORS and logging
module.exports = (req, res, next) => {
  // Log request details
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  // Enable CORS
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
  // Continue to JSON Server
  next();
};