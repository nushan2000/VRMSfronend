import React, { useState } from "react";
import axios from "axios";

const CostUpdate = ({ costDetail, onClose }) => {
  const [formData, setFormData] = useState(costDetail);
  const [costDetails, setCostDetails] = useState(null); 
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
         await axios.put(`http://localhost:8080/costDetails/updatecost/${costDetail._id}`);
       
      onClose();
    } catch (err) {
      console.error(err);
    }
  };
 
  return (
    <div className="main">
      <div className="main-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Update Cost Detail</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Fuel Consumption:</label>
            <input type="number" name="fuelConsumption" value={formData.fuelConsumption} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Vehicle Number:</label>
            <input type="text" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} />
          </div>
         
          <div className="form-group">
            <label>Fuel Price:</label>
            <input type="number" name="fuelPrice" value={formData.fuelPrice} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Service Charge:</label>
            <input type="number" name="serviceCharge" value={formData.serviceCharge} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Tire Price:</label>
            <input type="number" name="tirePrice" value={formData.tirePrice} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Driver Salary:</label>
            <input type="number" name="driverSalary" value={formData.driverSalary} onChange={handleChange} />
          </div>
          
          <button type="submit">Update Cost Detail</button>
        </form>
      </div>
    </div>
  );
};

export default CostUpdate;
