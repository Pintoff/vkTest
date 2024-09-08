import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="header">
      <nav className="nav roboto-regular">
        <ul className="ul">
          <li className={location.pathname === '/' ? 'choosed' : ''}>
            <Link to="/">Все котики</Link>
          </li>
          <li className={location.pathname === '/cats/liked' ? 'choosed' : ''}>
            <Link to="/cats/liked">Любимые котики</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;