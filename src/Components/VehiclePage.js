// VehicleList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './vehiclepage.css';

const VehiclePage = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    axios.get('/vehicles')
      .then(res => setVehicles(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h1>Vehicle List</h1>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Vehicle No</th>
              <th>Vehicle Type</th>
              <th>Seat Capacity</th>
              <th>Driver Name</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map(vehicle => (
              <tr key={vehicle._id}>
                <td>{vehicle.vehicleNo}</td>
                <td>{vehicle.vehicleType}</td>
                <td>{vehicle.sheatCapacity}</td>
                <td>{vehicle.driverName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehiclePage;
