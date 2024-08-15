import React from 'react';
import './all.css';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate=useNavigate()
  return (
    <nav className="navbar">
      <h1>Quiz Website</h1>
      <Link 
  to='/signup' 
  style={{ 
    marginRight: '10px', 
    padding: '8px 16px', 
    backgroundColor: '#4CAF50', 
    color: 'white', 
    textDecoration: 'none', 
    borderRadius: '4px' 
  }}
>
  Signup
</Link>

<Link 
  to='/login' 
  style={{ 
    padding: '8px 16px', 
    backgroundColor: '#4CAF50', 
    color: 'white', 
    textDecoration: 'none', 
    borderRadius: '4px' 
  }}
>
  Login
</Link>

    </nav>
  );
}

export default Navbar;
