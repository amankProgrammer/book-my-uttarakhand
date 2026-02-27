import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useSmoothScroll from '../hooks/useSmoothScroll';

function Navbar() {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const scrollHome = useSmoothScroll('#home');
  const scrollEnquiry = useSmoothScroll('#enquiry');

  const closeMenu = () => {
    setOpen(false);
    setOpenDropdown(null);
  };

  const handleHomeClick = (e) => {
    // If already on home, just smooth scroll instead of re-navigating.
    if (window.location.pathname === '/') {
      e.preventDefault();
      scrollHome();
    }
    // Otherwise let React Router change the route to "/".
    closeMenu();
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    scrollEnquiry();
    closeMenu();
  };

  const toggleDropdown = (key) => (e) => {
    // On mobile (menu open), clicking the dropdown header should expand/collapse it.
    if (!open) return;
    e.preventDefault();
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  return (
    <header className="navbar">
      <div className="logo" onClick={handleHomeClick}>
        Book my<span>Uttarakhand</span>
      </div>
      <button
        className="nav-toggle"
        type="button"
        aria-label="Toggle navigation"
        onClick={() => {
          setOpen((v) => {
            const next = !v;
            if (!next) setOpenDropdown(null);
            return next;
          });
        }}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={open ? 'nav-menu nav-menu-open' : 'nav-menu'}>
        <Link to="/" className="home" onClick={handleHomeClick}>
          Home
        </Link>
        <div className={openDropdown === 'destinations' ? 'dropdown dropdown-open' : 'dropdown'}>
          <Link to="/uttarakhand-destination" onClick={toggleDropdown('destinations')}>
            Uttarakhand Destination
          </Link>
          <div className="dropdown-menu">
            <Link to="/uttarakhand-destination" onClick={closeMenu}>
              Nainital– Lake District of India
            </Link>
            <Link to="/uttarakhand-destination" onClick={closeMenu}>
              Almora – Cultural Hill Town
            </Link>
            <Link to="/uttarakhand-destination" onClick={closeMenu}>
              Kausani – Mini Switzerland of India
            </Link>
          </div>
        </div>
        <div className={openDropdown === 'packages' ? 'dropdown dropdown-open' : 'dropdown'}>
          <Link to="/tour-packages" onClick={toggleDropdown('packages')}>
            Tour Packages
          </Link>
          <div className="dropdown-menu">
            <Link to="/tour-packages" onClick={closeMenu}>
              Family Package
            </Link>
            <Link to="/tour-packages" onClick={closeMenu}>
              Luxury Package
            </Link>
            <Link to="/tour-packages" onClick={closeMenu}>
              Budget Package
            </Link>
          </div>
        </div>
        <Link to="/hotels-resorts" onClick={closeMenu}>
          Hotels/Resort
        </Link>
        <a href="#" onClick={(e) => e.preventDefault()}>
          Gallery
        </a>
        <div className={openDropdown === 'wedding' ? 'dropdown dropdown-open' : 'dropdown'}>
          <a href="#" onClick={toggleDropdown('wedding')}>
            Destination Wedding
          </a>
          <div className="dropdown-menu">
            <a href="#" onClick={(e) => e.preventDefault()}>
              Destination Wedding
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Pre Wedding
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Wedding Planning
            </a>
          </div>
        </div>
        <div className={openDropdown === 'support' ? 'dropdown dropdown-open' : 'dropdown'}>
          <a href="#" onClick={toggleDropdown('support')}>
            Support
          </a>
          <div className="dropdown-menu">
            <a href="#" onClick={(e) => e.preventDefault()}>
              Help Center
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              FAQs
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Customer Care
            </a>
          </div>
        </div>
        <a href="#enquiry" onClick={handleContactClick}>
          Contact
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
