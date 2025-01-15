import React, { useState, useEffect } from 'react';
import '../Css/NavBar.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user data from cookie
    const userInfoFromCookie = Cookies.get('userInfo');

    // If user data exists in the cookie, parse it and set the state
    if (userInfoFromCookie) {
      const parsedUserInfo = JSON.parse(userInfoFromCookie);
      const { email, firstName } = parsedUserInfo; // Extract name from user data
      setUserEmail(email);
      setUserName(firstName);
    }
  }, []);

  const handleLogout = () => {
    // Clear user info from cookies
    Cookies.remove('userInfo');

    // Update state
    setUserEmail(null);
    setUserName(null);
    localStorage.removeItem("token");
    // Redirect to the login page
    navigate('/');
  };

  return (
    <div className="navbar-container">
      <nav className="navbar navbar-expand-lg color">
        <div className="container-fluid">
          <a className="navbar-brand logo" href="#"></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a className="nav-link active color2" aria-current="page" href="#" style={{ color: '#ffffff', fontWeight: '60' }}>
                  FACULTY VEHICLE RESERVATIONS
                </a>
              </li>
            </ul>
            {userEmail && (
              <div className="d-flex align-items-center">
                <span className="user-name" style={{ color: '#ffffff', marginLeft: '10px' }}>
                  <h6>{userEmail}</h6>
                </span>
                <span className="user-name" style={{ color: '#ffffff', marginLeft: '10px' }}>
                  {userName}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-light"
                  style={{ marginLeft: '20px' }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="line"></div>
    </div>
  );
}

export default Navbar;
