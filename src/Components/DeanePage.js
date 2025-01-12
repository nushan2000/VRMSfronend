import React, { useState, useEffect } from "react";
import "../Css/DepartmentHeadPageStyle.css";
import axios from "axios";
import DeenArDash from "./DeenArDash";
import { Link } from 'react-router-dom';

export default function ArPage() {
  const [vehicleList, setVehicleList] = useState([]);
  const [formData, setFormData] = useState({
    _id: "",
    date: "",
    startTime: "",
    endTime: "",
    reason: "",
    section: "",
    vehicle: "",
    depatureLocation: "",
    destination: "",
    comeBack: true,
    distance: 0,
    approveHead: false,
    approveDeenAr: false,
    driverStatus: "notStart",
    applier: "",
    applyDate: "",
    passengers: []
  });

  useEffect(() => {
    axios.get('http://localhost:8080/vehicle/vehicles')
      .then(response => {
        setVehicleList(response.data); // Assuming response.data is an array of vehicle names
      })
      .catch(error => {
        console.error("Error fetching vehicle list:", error);
      });
  }, []);

  useEffect(() => {
    const handleForceUpdate = () => {
      // When the custom event is triggered, update the form data
      const requestData = JSON.parse(localStorage.getItem("selectedRequest")) || [];
      console.log("Request Data:", requestData);
      setFormData(requestData);
    };

    // Listen for the custom event to trigger a re-render
    document.addEventListener('forceUpdateHead', handleForceUpdate);

    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener('forceUpdateHead', handleForceUpdate);
    };
  }, []);

  useEffect(() => {
    // Update driver status based on approveHead
    if (formData.approveHead) {
      setFormData(prevFormData => ({
        ...prevFormData,
        driverStatus: "approved"
      }));
    }
  }, [formData.approveHead]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleApproveChange = (e) => {
    const value = e.target.value === "true"; // Convert string to boolean
    setFormData({
      ...formData,
      approveDeenAr: value
    });
  };

  const submitArForm = async (e) => {
    e.preventDefault();
    try {
      if (formData.approveDeenAr === "") {
        alert("Please select whether you accept the request or not.");
        return;
      }

      const response = await axios.put(`http://localhost:8080/request/updateRequest1/${formData._id}`, formData);
      console.log("Server Response:", response.data);

      setFormData({
        _id: "",
        date: "",
        startTime: "",
        endTime: "",
        reason: "",
        section: "",
        vehicle: "",
        depatureLocation: "",
        destination: "",
        comeBack: true,
        distance: 0,
        approveHead: false,
        approveDeenAr: false,
        driverStatus: "notStart",
        applier: "",
        applyDate: "",
        passengers: []
      });

      alert("Request submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again later.");
    }
  };

  return (
    <div className="row min-vh-100">
      <div className="column1 ">
        <div className="requestbutton">
          <div>
            <DeenArDash />
          </div>
        </div>
      </div>
      <div className="column21" style={{ backgroundColor: "#ccc" }}>
        <div className="formhead">
          <form className="vehicleRequestForm1" title="Vehicle Request Form" onSubmit={submitArForm}>
            <label htmlFor="Vehicle Request Forme" className="form-label">Vehicle Request Form</label>
            <div className="RequestVehicle">
              <label htmlFor="date" className="date">Date :</label>
              <input type="date" className="dateInput" id="date" name="date" placeholder="yyyy-mm-dd" value={formData.date}
                onChange={handleChange} />
              <label htmlFor="vehicleSelect" className="vehicle">Select Vehicle :</label>
              <select id="vehicleSelect" className="vehicleInput" name="vehicle" value={formData.vehicle}
                onChange={handleChange}>
                <option>Select</option>
                {vehicleList.map((vehicle, index) => (
                  <option key={index}>{vehicle.vehicleName}</option>
                ))}
              </select>
            </div>
            <div className="RequestVehicle">
              <label htmlFor="time" className="startTime">Start Time :</label>
              <input type="time" className="startTimeInput" id="startTime" name="startTime" placeholder="hh-mm" value={formData.startTime}
                onChange={handleChange} />
              <label htmlFor="time" className="endTime">End Time :</label>
              <input type="time" className="endTimeInput" id="endTime" name="endTime" placeholder="hh-mm" value={formData.endTime}
                onChange={handleChange} />
            </div>
            <div className="RequestVehicle">
              <label htmlFor="sectiondSelect" className="section">Select Section :</label>
              <select id="sectiondSelect" className="selectSectionInput" name="section" value={formData.section}
                onChange={handleChange}>
                <option>Select</option>
                <option>Administrative</option>
                <option>Finance</option>
                <option>Technical Officer</option>
                <option>Academic Staff</option>
                <option>AR Office</option>
              </select>
            </div>
            <div className="RequestVehicle">
              <label htmlFor="reason" className="reason">Reason :</label>
              <input type="text" className="reasonInput" id="reason" name="reason" placeholder="Enter Reason For Vehicle Reservation" value={formData.reason}
                onChange={handleChange} />
            </div>
            <div className="RequestVehicle">
              <label htmlFor="depatureFrom" className="depatureLocation">Departure From :</label>
              <input type="text" className="departureFromInput" id="depatureFrom" name="depatureLocation" placeholder="Enter Departure Location"
                value={formData.depatureLocation}
                onChange={handleChange} />
            </div>
            <div className="RequestVehicle">
              <label htmlFor="destination" className="destinationLocation">Destination :</label>
              <input type="text" className="departureFromInput" id="Destination" name="destination" placeholder="Enter Destination Location"
                value={formData.destination}
                onChange={handleChange} />
            </div>
            <div className="RequestVehicle">
              <label htmlFor="comeBack">Do you want to come back in same vehicle:</label>
              <input
                type="radio"
                id="comeBack"
                checked={formData.comeBack}
                onChange={() => setFormData({ ...formData, comeBack: true })}
              />
              <label htmlFor="comeBack">Yes</label>
              <input
                type="radio"
                id="notComeBack"
                checked={!formData.comeBack}
                onChange={() => setFormData({ ...formData, comeBack: false })}
              />
              <label htmlFor="notComeBack">No</label>
            </div>
            <div className="RequestVehicle">
              <label htmlFor="approximateDistance" className="distance">Approximate Distance :</label>
              <input type="number" className="approximateDistanceInput" id="approximateDistance" name="distance"
                value={formData.distance}
                onChange={handleChange}></input>
              <span className="approximateDistance">km</span>
            </div>
            <div>
              <table className="table">
                <thead className="table-light">
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Position</th>
                    <th scope="col">Pickup From</th>
                    <th scope="col">Drop to</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.passengers.map((passenger, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{passenger.name}</td>
                      <td>{passenger.position}</td>
                      <td>{passenger.pickup}</td>
                      <td>{passenger.drop}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="RequestVehicle">
              <div className="columncheck1">
                <span className="tabbed-text">Head Approved</span>
                {formData.approveHead ? (
                  <img src={require('../Images/yes1.png')} alt="Yes" style={{ color: 'green', width: '24px', height: '24px' }} />
                ) : (
                  <img src={require('../Images/no4.png')} alt="No" style={{ width: '24px', height: '24px' }} />
                )}
                <br />
              </div>
              <div className="columncheck1">
                <label htmlFor="approve" className="approve">The Request is &ensp;</label>
                <input
                  className="set-approve-input"
                  type="radio"
                  name="setApprove"
                  id="setApprove1"
                  value={true}
                  checked={formData.approveDeenAr === true}
                  onChange={handleApproveChange}
                />
                <label className="set-approve-label" htmlFor="setApprove1">
                  Approved &ensp;
                </label>
                <input
                  className="set-approve-input"
                  type="radio"
                  name="setApprove"
                  id="setApprove2"
                  value={false}
                  checked={formData.approveDeenAr === false}
                  onChange={handleApproveChange}
                />
                <label className="set-approve-label" htmlFor="setApprove2">
                  Rejected &ensp; by Ar
                </label>
              </div>
              <button type="submit" className="btn btn-primary submitf" onClick={submitArForm}>Proceed</button>
            </div>
          </form>
        </div>
      </div>
      <div className="column3" style={{ backgroundColor: "#fff" }}>
        <h2>DashBoard</h2>
        <Link style={{ textDecoration: "none" }} to="/request">
          <button className="deenrequwst">
            Add Reservation
          </button>
        </Link>
        <Link to="/user">
          <button className="deenrequwst">
            Your History
          </button>
        </Link>
        <Link to="/vehiclelist">
          <button className="deenrequwst">
            Add Vehicle
          </button>
        </Link>
        <Link to="/userlistar">
          <button className="deenrequwst">
            Add User
          </button>
        </Link>
      </div>
    </div>
  );
}
