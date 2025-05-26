import React, { useState, useEffect } from "react";
import "../Css/NavBar.css";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { error } from "pdf-lib";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const userInfoFromCookie = Cookies.get("userInfo");
  const parsedUserInfo = userInfoFromCookie
    ? JSON.parse(userInfoFromCookie)
    : null;
console.log("parsedUserInfo",parsedUserInfo);

  const [userlastName, setUserlastName] = useState(
    parsedUserInfo ? parsedUserInfo.lastName : null
  );
  const [userName, setUserName] = useState(
    parsedUserInfo ? parsedUserInfo.fristName : null
  );
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (userInfoFromCookie) {
      const { lastName, fristName } = parsedUserInfo;
      setUserlastName(lastName);
      setUserName(fristName);

      // axios
      //   .get(`${process.env.REACT_APP_API_URL}/user/users`, {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   })
      //   .then((response) => {
      //     const allUsers = response.data;

      //     // Replace with the lastName you want to search
      //     //const lastNameToFind = "test@example.com";

      //     const user = allUsers.find((u) => u.lastName === userlastName);

      //     if (user) {
      //       setUserName(user.fristName);
      //       console.log(user);
      //        // or whatever field contains the name
      //     } else {
      //       console.log("User not found with that lastName");
      //     }
      //     setUserName(response.data);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    }
  }, [location]);

  const handleLogout = () => {
    // Clear user info from cookies
    Cookies.remove("userInfo");

    // Update state
    setUserlastName(null);
    setUserName(null);
    localStorage.removeItem("token");
    // Redirect to the login page
    navigate("/");
  };

  return (
    <div className="navbar-container">
      <nav className="navbar navbar-expand-lg color">
        <div className="container-fluid">
          <a className="navbar-brand logo" href="#"></a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a
                  className="nav-link active color2"
                  aria-current="page"
                  href="#"
                  style={{ color: "#ffffff", fontWeight: "60" }}
                >
                  FACULTY VEHICLE RESERVATIONS
                </a>
              </li>
            </ul>
            {userlastName && (
              <div className="d-flex align-items-center">
                <span
                  className="user-name"
                  style={{ color: "#ffffff", marginLeft: "10px" }}
                >
                 {userName}
                </span>
                <span
                  className="user-name"
                  style={{ color: "#ffffff", marginLeft: "10px" }}
                >
                  {userlastName}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-light"
                  style={{ marginLeft: "20px" }}
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
