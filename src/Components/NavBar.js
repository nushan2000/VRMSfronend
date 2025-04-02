import React, { useState, useEffect } from 'react';
import '../Css/NavBar.css';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const userInfoFromCookie = Cookies.get('userInfo');
  const parsedUserInfo = userInfoFromCookie ? JSON.parse(userInfoFromCookie) : null;

  const [userEmail, setUserEmail] = useState(parsedUserInfo ? parsedUserInfo.email : null);
  const [userName, setUserName] = useState(parsedUserInfo ? parsedUserInfo.firstName : null);

  useEffect(() => {

    if (userInfoFromCookie) {
 
      const { email, firstName } = parsedUserInfo; 
      setUserEmail(email);
      setUserName(firstName);     
    }
  }, [location]);

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
