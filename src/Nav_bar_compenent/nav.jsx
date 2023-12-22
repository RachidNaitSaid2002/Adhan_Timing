import React, { useEffect,useState } from 'react';
import './nav.scss';

export default function BasicDemo() {
    
  const [currentTime, setCurrentTime] = useState('');
  useEffect(() => {
    const handleBurgerMenuClick = () => {
      const navbarMenu = document.getElementById('menu');
      const bgOverlay = document.querySelector('.overlay');

      if (navbarMenu && bgOverlay) {
        navbarMenu.classList.add('is-active');
        bgOverlay.classList.toggle('is-active');
      }
    };

    const handleBgOverlayClick = () => {
      const navbarMenu = document.getElementById('menu');
      const bgOverlay = document.querySelector('.overlay');

      if (navbarMenu && bgOverlay) {
        navbarMenu.classList.remove('is-active');
        bgOverlay.classList.toggle('is-active');
      }
    };

    const handleLinkClick = () => {
      const navbarMenu = document.getElementById('menu');
      const bgOverlay = document.querySelector('.overlay');

      if (navbarMenu && bgOverlay) {
        navbarMenu.classList.remove('is-active');
        bgOverlay.classList.remove('is-active');
      }
    };

    const handleSearchToggleClick = () => {
      const searchBlock = document.querySelector('.search-block');

      if (searchBlock) {
        searchBlock.classList.toggle('is-active');
      }
    };

    const handleSearchCancelClick = () => {
      const searchBlock = document.querySelector('.search-block');

      if (searchBlock) {
        searchBlock.classList.remove('is-active');
      }
    };

    const burgerMenu = document.getElementById('burger');
    const bgOverlay = document.querySelector('.overlay');
    const searchToggle = document.querySelector('.search-toggle');
    const searchCancel = document.querySelector('.search-cancel');

    if (burgerMenu && bgOverlay) {
      burgerMenu.addEventListener('click', handleBurgerMenuClick);
    }

    if (bgOverlay) {
      bgOverlay.addEventListener('click', handleBgOverlayClick);
    }

    document.querySelectorAll('.menu-link').forEach((link) => {
      link.addEventListener('click', handleLinkClick);
    });

    if (searchToggle && searchCancel) {
      searchToggle.addEventListener('click', handleSearchToggleClick);
      searchCancel.addEventListener('click', handleSearchCancelClick);
    }

    const updateTime = () => {
        const now = new Date();
        const formattedTime = now.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        });
        setCurrentTime(formattedTime);
      };
  
      const timer = setInterval(updateTime, 1000);
  

    // Cleanup event listeners
    return () => {
      if (burgerMenu && bgOverlay) {
        burgerMenu.removeEventListener('click', handleBurgerMenuClick);
      }

      if (bgOverlay) {
        bgOverlay.removeEventListener('click', handleBgOverlayClick);
      }

      document.querySelectorAll('.menu-link').forEach((link) => {
        link.removeEventListener('click', handleLinkClick);
      });
    };
    
    clearInterval(timer);
  }, []);

  return (
    <header className="header" id="header">
      <nav className="navbar container">
        <a href="./index.html" className="brand">
          AdanTiming-4U
        </a>
        <div className="burger" id="burger">
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </div>
        <span className="overlay"></span>
        <div className="menu" id="menu">
          <ul className="menu-inner">
            <li className="time">
            {currentTime}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}