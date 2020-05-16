import React from 'react';
import './footer.css';
import { Link, useLocation } from 'react-router-dom';
import routes from 'src/routes/config';

const Footer = () => {
  const location = useLocation();
  const chatRegex = new RegExp(routes.CHAT, 'g');

  if (location.pathname.match(chatRegex)) return '';
  return (
    <footer>
      <div>Copyright &copy; 2020.</div>
      <Link to={routes.PRIVACY}>Privacy Policy.</Link>
    </footer>
  );
};

export default Footer;
