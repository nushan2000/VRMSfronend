import React, { useState } from "react";
import axios from "axios";
import '../../Css/AddNewVehicle.css'; // Import CSS file for styling

const VehicleUpdate = ({ vehicle, onClose }) => {
  const [formData, setFormData] = useState({ ...vehicle, statusList: vehicle.statusList || [] });
  const [vehicleImg, setVehicleImg] = useState(vehicle.vehicleImg || ""); // Initialize with existing image if available
  const [statusDate, setStatusDate] = useState(""); // Define statusDate state
  const [newStatus, setNewStatus] = useState(""); // Define newStatus state

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log("Submitting formData:", formData); // Debug: log formData before submitting
    try {
      const response = await axios.put(`http://localhost:8080/vehicle/updateVeh/${vehicle._id}`, formData);
      console.log("Response from server:", response.data); // Debug: log response data from server
      if (response.status === 200) {
        alert("Vehicle updated successfully!");
        onClose();
      } else {
        alert("Failed to update vehicle.");
      }
    } catch (err) {
      console.error("Error updating vehicle:", err);
      alert("An error occurred while updating the vehicle.");
    }
  };
  

  const addStatusDate = () => {
    const newStatusDate = {
      statusDate: statusDate,
      newStatus: newStatus,
    };

    setFormData({ ...formData, statusList: [...formData.statusList, newStatusDate] });

    // Clear input fields after adding a StatusDate
    setStatusDate("");
    setNewStatus("");
  };

  const deleteStatusDate = (index) => {
    const updatedStatusDate = formData.statusList.filter((_, i) => i !== index);
    setFormData({ ...formData, statusList: updatedStatusDate });
  };

  const convertToBase64 = (e) => {
    if (e.target.files.length > 0) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        setFormData({ ...formData, vehicleImg: base64String });
        setVehicleImg(base64String); // Set only the base64 data
      };
      reader.onerror = (error) => {
        console.log("Error", error);
      };
    }
  };

  return (
    <div className="main">
      <div className="main-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Update Vehicle</h2>
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
                <label>Status:</label>
                <input type="text" name="status" value={formData.status} onChange={handleChange} />
              </div>
              <div>
                <label>Image</label>
                <input type="file" className="form-control" id="vehicleImg" accept="image/*" onChange={convertToBase64}></input>
              </div>

              <div className="addStatusDate">
                <h3>Add Status Dates</h3>
                <div className="form-group">
                  <label>Status:</label>
                  <input type="text" value={newStatus} onChange={(e) => setNewStatus(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Date:</label>
                  <input type="date" value={statusDate} onChange={(e) => setStatusDate(e.target.value)} />
                </div>
                <button type="button" onClick={addStatusDate}>Add Status Date</button>
              </div>

              <div>
                <table className="table">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Status</th>
                      <th scope="col">Date</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.statusList.map((vehiStatus, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{vehiStatus.newStatus}</td>
                        <td>{vehiStatus.statusDate}</td>
                        <td>
                          <button className="btn btn-danger" onClick={() => deleteStatusDate(index)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <button type="submit">Update Vehicle</button>
        </form>
      </div>
    </div>
  );
};

export default VehicleUpdate;
