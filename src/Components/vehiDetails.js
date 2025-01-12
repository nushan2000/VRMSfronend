import React, { useEffect } from "react";
import "../Css/PopupDash.css";
import CalendarGfg from "./Calander";

export default function VehiDetails({ vehicle, onClose }) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      const popupInner = document.getElementById("popup1");
      if (popupInner && !popupInner.contains(event.target)) {
        window.close();
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  if (!vehicle) {
    return null;
  }

  return (
    <div>
      <div className="popup1" id="popup1">
        <button className="close-button" onClick={onClose}>Close</button>
        <div className="rowpop">
          <div className="columnpop">
            <div className="popup-inner1">
              <div>
                {vehicle.vehicleImg ? (
                  <img
                    className="vehiclebutton"
                    src={`data:image/png;base64,${vehicle.vehicleImg}`}
                    alt="Vehicle"
                  />
                ) : null}
              </div>
            </div>
          </div>
          <div className="columnpop">
            <div className="popup-inner1">
              <h2>Vehicle Details</h2>
              <div className="vehicleDetailsShow">
                <p>Vehicle No: {vehicle.vehicleNo}</p>
                <p>Vehicle Type: {vehicle.vehicleType}</p>
                <p>Model: {vehicle.vehicleName}</p>
                <p>Driver: {vehicle.driverName}</p>
                <p>Seats Capacity: {vehicle.sheatCapacity}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="rowpop2">
          <div className="columnpop">
            <div className="popup-inner2">
              <section>
                <CalendarGfg vehicle={vehicle} />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
