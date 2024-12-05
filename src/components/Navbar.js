import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="navbar">
     <h2 
      className="logo" 
      style={{ fontWeight: 'bold', fontFamily: '"Dancing Script", cursive' }}>
      Kendo Dashboard
   </h2>

      <div className="menuIcon" onClick={toggleMenu}>
        ☰
      </div>
      <ul className={`navLinks ${isMenuOpen ? 'open' : ''}`}>
        <li><NavLink to="/" exact className="link" activeClassName="activeLink">Metrics</NavLink></li>
        <li><NavLink to="/tasks" className="link" activeClassName="activeLink">Tasks</NavLink></li>
        <li><NavLink to="/logs" className="link" activeClassName="activeLink">Logs</NavLink></li>
        <li><NavLink to="/sales" className="link" activeClassName="activeLink">Sales</NavLink></li>
        <li><NavLink to="/users" className="link" activeClassName="activeLink">Users</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
