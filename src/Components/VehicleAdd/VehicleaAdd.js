import React, { useState } from "react";
import axios from "axios";
import '../../Css/AddNewVehicle.css';
import { toast } from "react-toastify";
// AddVehicleForm.js
 // Import CSS file for styling

const AddVehicleForm = ({ onClose }) => {
  const token = localStorage.getItem("token"); 
  const [formData, setFormData] = useState({
    vehicleNo: '',
    vehicleType: '',
    sheatCapacity: '',
    driverName: '',
    driverEmail: '',
    vehicleName: '',
    status: '',
    vehicleImg: '',
  });
  const [vehicleImg, setVehicleImg] = useState(""); // Define vehicleImg state

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/vehicle/addVehicle`, formData,{
        headers: {
          Authorization: `Bearer ${token}`
          
        },
      });
      console.log("created");
      
      onClose();
      toast.success('Request submitted successfully!');
    } catch (err) {
      console.error(err);
    }
  };
  function convertToBase64(e) {
    if (e.target.files.length > 0) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setFormData({ ...formData, vehicleImg: reader.result.split(",")[1] });
        setVehicleImg(reader.result.split(",")[1]); // Set only the base64 data
      };
      reader.onerror = (error) => {
        console.log("Error", error);
      };
    }
  }
  return (
    <div className="main">
      <div className="main-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add Vehicle</h2>
        <form onSubmit={handleSubmit}>
            <div className="rowVehi">
                <div className="columnVehi">
                <div className="form-group">
            <label>Vehicle No:</label>
            <input type="text" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Vehicle Type:</label>
            <input type="text" name="vehicleType" value={formData.vehicleType} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Seat Capacity:</label>
            <input type="number" name="sheatCapacity" value={formData.sheatCapacity} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Driver Name:</label>
            <input type="text" name="driverName" value={formData.driverName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Driver Email:</label>
            <input type="email" name="driverEmail" value={formData.driverEmail} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Vehicle Name:</label>
            <input type="text" name="vehicleName" value={formData.vehicleName} onChange={handleChange} />
          </div>
                </div>
<div className="columnVehi">
                <div className="form-group">
            <label> Status:</label>
            <input type="text" name="status" value={formData.status} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Vehicle Name:</label>
            <input type="text" name="vehicleName" value={formData.vehicleName} onChange={handleChange} />
          </div>
          <div>
                    <label>Image</label>
                    <input type="file" className="form-control" id="vehicleImg" accept="image/*" onChange={convertToBase64}></input>
                    {vehicleImg === "" || vehicleImg == null ? "" : <img className="vehiclebutton" src={`data:image/png;base64,${formData.vehicleImg}`} alt="Vehicle" />}
                </div>
                </div>
            </div>
          
          <button type="submit">Add Vehicle</button>
        </form>
      </div>
    </div>
  );
};

export default AddVehicleForm;
