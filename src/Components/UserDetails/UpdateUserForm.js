// UpdateUserForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Css/UserDetails/AddUserForm.css'; // Import CSS file for styling

const UpdateUserForm = ({ user, onClose }) => {
  const token = localStorage.getItem("token"); 
  const [formData, setFormData] = useState({
    fristName: user.fristName,
    lastName: user.lastName,
    email: user.email,
    department: user.department,
    password: user.password,
    repassword: user.repassword,
    designation: user.designation,
    telNo: user.telNo,
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/user/update/${user._id}`, formData,{
        headers: {
          Authorization: `Bearer ${token}`
          
        },
      });
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Update User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name:</label>
            <input type="text" name="fristName" value={formData.fristName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Department:</label>
            <select
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="Machenical">Machenical Department</option>
              <option value="Electrical">Electrical Department</option>
              <option value="Civil">Civil Department</option>
              <option value="Administration">Administration</option>
              <option value="Is">Interdisciplinary Studies</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Re-enter Password:</label>
            <input type="password" name="repassword" value={formData.repassword} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Designation:</label>
            <select
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              required
            >
              <option value="">Select Designation</option>
              <option value="user">User</option>
              <option value="head">Head</option>
              <option value="ar">AR</option>
              <option value="dean">Dean</option>
              <option value="security">Security</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="form-group">
            <label>Telephone Number:</label>
            <input type="tel" name="telNo" value={formData.telNo} onChange={handleChange} />
          </div>
          <button type="submit">Update User</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserForm;
