import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>NY 5K</h3>
          <p>Discover 5K running races in New York and beyond.</p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/races">Races</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Sign Up</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: info@ny5k.com</p>
          <p>Phone: (555) 123-4567</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} NY 5K. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;