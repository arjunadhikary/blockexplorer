import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  return (
    <div className="header-main wrapper">
      <div>
        <img
          onClick={() => navigate('/')}
          style={{ height: '50px', width: '200px' }}
          src="https://etherscan.io/assets/svg/logos/logo-etherscan.svg?v=0.0.2"
          alt="logo"
        />
      </div>
      <div className="header-items">
        <a href="/" className="header-text link-decoration">
          Home
        </a>
        <a href="/about" className="header-text link-decoration">
          About Us
        </a>
      </div>
    </div>
  );
}
