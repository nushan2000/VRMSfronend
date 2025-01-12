import React from 'react';
import '../Css/PopUp.css';

const PopUp = ({ onClose }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            
          </div>
          <div className="carousel-inner">
          <div className="carousel-item active">
              <div className="row">
                <div className="col-md-6">
                  <img src={require('../Images/logo4.png')} className="d-block logopop" alt="First slide"/>
                </div>
                <div className="col-md-6  ">
                  <div className="carousel-caption d-block colll">
                    <h2>Welcome to Faculty of Engineering Vehicle Reservations</h2>
                    <p>Software aims to streamline vehicle reservations, reduce unnecessary expenses, and enhance overall efficiency within the faculty</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row">
                <div className="col-md-6">
                  <img src={require('../Images/logo2n.png')} className="d-block logopop" alt="First slide"/>
                </div>
                <div className="col-md-6  ">
                  <div className="carousel-caption d-block colll">
                    <h2>Considering Carbon Emmission</h2>
                    <p>Software aims to streamline vehicle reservations, reduce unnecessary expenses, and enhance overall efficiency within the faculty</p>
                  </div>
                </div>
              </div>
            </div>
           
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        
      </div>
      <button className="close-btn" onClick={onClose}>Close</button>
    </div>
  );
};

export default PopUp;
