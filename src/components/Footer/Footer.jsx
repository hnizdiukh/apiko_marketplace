import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';
import routes from 'src/routes/config';

const Footer = () => {
  return (
    <footer>
      <div>Copyright &copy; 2020.</div>
      <Link to={routes.PRIVACY}>Privacy Policy.</Link>
    </footer>
  );
};

export default Footer;
