import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import useHomeSectionNavigation from '../hooks/useHomeSectionNavigation';

function Navbar() {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const goToHomeSection = useHomeSectionNavigation();

  const closeMenu = () => {
    setOpen(false);
    setOpenDropdown(null);
  };

  const handleSectionClick = (sectionId) => {
    goToHomeSection(sectionId);
    closeMenu();
  };

  const toggleDropdown = (key) => () => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  return (
    <header className="navbar">
      <Link
        to="/"
        className="logo"
        onClick={(e) => {
          e.preventDefault();
          handleSectionClick('home');
        }}
      >
        <img src={logo} alt="Book our Uttarakhand logo" />
        <span className="logo-text">Book our <span>Uttarakhand</span></span>
      </Link>
      <button
        className="nav-toggle"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={open}
        aria-controls="primary-navigation"
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
      <nav id="primary-navigation" className={open ? 'nav-menu nav-menu-open' : 'nav-menu'}>
        <button type="button" className="nav-link-button" onClick={() => handleSectionClick('home')}>
          Home
        </button>
        <div className={openDropdown === 'destinations' ? 'dropdown dropdown-open' : 'dropdown'}>
          <button
            type="button"
            className="dropdown-toggle"
            aria-haspopup="true"
            aria-expanded={openDropdown === 'destinations'}
            onClick={toggleDropdown('destinations')}
          >
            Uttarakhand Destination
          </button>
          <div className="dropdown-menu">
            <Link to="/uttarakhand-destination" onClick={closeMenu}>
              All Destinations
            </Link>
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
          <button
            type="button"
            className="dropdown-toggle"
            aria-haspopup="true"
            aria-expanded={openDropdown === 'packages'}
            onClick={toggleDropdown('packages')}
          >
            Tour Packages
          </button>
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
        <button type="button" className="nav-link-button" onClick={() => handleSectionClick('wedding-gallery')}>
          Gallery
        </button>
        <div className={openDropdown === 'wedding' ? 'dropdown dropdown-open' : 'dropdown'}>
          <button
            type="button"
            className="dropdown-toggle"
            aria-haspopup="true"
            aria-expanded={openDropdown === 'wedding'}
            onClick={toggleDropdown('wedding')}
          >
            Destination Wedding
          </button>
          <div className="dropdown-menu">
            <button type="button" onClick={() => handleSectionClick('wedding')}>
              Destination Wedding
            </button>
            <button type="button" onClick={() => handleSectionClick('wedding-gallery')}>
              Pre Wedding
            </button>
            <button type="button" onClick={() => handleSectionClick('enquiry')}>
              Wedding Planning
            </button>
          </div>
        </div>
        <div className={openDropdown === 'support' ? 'dropdown dropdown-open' : 'dropdown'}>
          <button
            type="button"
            className="dropdown-toggle"
            aria-haspopup="true"
            aria-expanded={openDropdown === 'support'}
            onClick={toggleDropdown('support')}
          >
            Support
          </button>
          <div className="dropdown-menu">
            <a href="mailto:info@example.com" onClick={closeMenu}>
              Help Center
            </a>
            <button type="button" onClick={() => handleSectionClick('best-time')}>
              FAQs
            </button>
            <a href="tel:+919876543210" onClick={closeMenu}>
              Customer Care
            </a>
          </div>
        </div>
        <button type="button" className="nav-link-button" onClick={() => handleSectionClick('enquiry')}>
          Contact
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
