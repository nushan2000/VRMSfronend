import React, { useState, useEffect } from "react";
import "../Css/DepartmentHeadPageStyle.css";
import axios from "axios";
import DeenArDash from "./DeenArDash";
import { Link } from 'react-router-dom';
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@mui/material';


export default function ArPage() {
  const [vehicleList, setVehicleList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    startTime: "",
    endTime: "",
    reason: "",
    section: "",
    vehicle: "",
    comeBack: "",
    comeBackHead: "",
    distance: "",
    depatureLocation: "",
    passengerName: "",
    position: "",
    pickup: "",
    drop: "",
    destination: "",
    passengerList: [],
    approveHead: "",
    approveDeenAr: ""
  });
  const [passengerList, setPassengerList] = useState([]);
  const token = localStorage.getItem("token"); 
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/vehicle/vehicles`,{
      headers: {
        Authorization: `Bearer ${token}`
        
      },
    })
      .then(response => {
        setVehicleList(response.data);
      })
      .catch(error => {
        console.error("Error fetching vehicle list:", error);
      });
  }, []);

  useEffect(() => {
    const handleForceUpdate = () => {
      const requestData = JSON.parse(localStorage.getItem("selectedRequest")) || [];
      console.log("Request Data:", requestData);
      setFormData(requestData);
      setPassengerList(requestData.passengers || []);
    };

    document.addEventListener('forceUpdateHead', handleForceUpdate);

    return () => {
      document.removeEventListener('forceUpdateHead', handleForceUpdate);
    };
  }, []);

  useEffect(() => {
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

  const addPassenger = () => {
    const newPassenger = {
      passengerName: formData.passengerName,
      position: formData.position,
      pickup: formData.pickup,
      drop: formData.drop
    };
    setPassengerList([...passengerList, newPassenger]);
  };

  const handleApproveChange = (e) => {
    const value = e.target.value === "true";
    setFormData({
      ...formData,
      approveDeenAr: value
    });
  };

  const submitArForm = async () => {
    try {
      if (formData.approveDeenAr === "") {
        alert("Please select whether you accept the request or not.");
        return;
      }

      const formDataWithId = { ...formData, _id: String(formData._id) };
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/request/updateRequest1/${formData._id}`, formDataWithId,{
        headers: {
          Authorization: `Bearer ${token}`
          
        },
      });
      console.log("Server Response:", response.data);

 

      setFormData({
        name: "",
        date: "",
        startTime: "",
        endTime: "",
        reason: "",
        section: "",
        vehicle: "",
        comeBack: "",
        comeBackHead: "",
        distance: "",
        depatureLocation: "",
        passengerName: "",
        position: "",
        pickup: "",
        drop: "",
        destination: "",
        passengerList: [],
        approveHead: "",
        approveDeenAr: ""
      });

      alert("Request submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again later.");
    }
  };

  return (
    <div className="row min-vh-100">
      <div className="column1">
        <div className="requestbutton">
          <div>
            <DeenArDash />
          </div>
        </div>
      </div>
      <div className="column21" style={{ backgroundColor: "#ccc" }}>
      <div className="formhead">
    <form className="vehicleRequestForm1" title="Vehicle Request Form">
      <Typography variant="h4" gutterBottom>
        Vehicle Request Form
      </Typography>

      <FormControl fullWidth margin="normal">
        <TextField
          label="Date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          disabled
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="vehicle-label">Select Vehicle</InputLabel>
        <Select
          labelId="vehicle-label"
          value={formData.vehicle}
          onChange={handleChange}
          disabled
        >
          <MenuItem value="">Select</MenuItem>
          {vehicleList.map((vehicle, index) => (
            <MenuItem key={index} value={vehicle.vehicleName}>
              {vehicle.vehicleName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <TextField
          label="Start Time"
          type="time"
          value={formData.startTime}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          disabled
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <TextField
          label="End Time"
          type="time"
          value={formData.endTime}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          disabled
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="section-label">Select Section</InputLabel>
        <Select
          labelId="section-label"
          value={formData.section}
          onChange={handleChange}
          disabled
        >
          <MenuItem value="">Select</MenuItem>
          <MenuItem value="Administrative">Administrative</MenuItem>
          <MenuItem value="Finance">Finance</MenuItem>
          <MenuItem value="Technical Officer">Technical Officer</MenuItem>
          <MenuItem value="Academic Staff">Academic Staff</MenuItem>
          <MenuItem value="AR Office">AR Office</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <TextField
          label="Reason"
          value={formData.reason}
          onChange={handleChange}
          placeholder="Enter Reason For Vehicle Reservation"
          disabled
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <TextField
          label="Departure From"
          value={formData.depatureLocation}
          onChange={handleChange}
          placeholder="Enter Departure Location"
          disabled
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <TextField
          label="Destination"
          value={formData.destination}
          onChange={handleChange}
          placeholder="Enter Destination Location"
          disabled
        />
      </FormControl>

      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">
          Do you want to come back in the same vehicle?
        </FormLabel>
        <RadioGroup
          row
          disabled
          value={formData.comeBack}
          onChange={(e) =>
            setFormData({ ...formData, comeBack: e.target.value === 'true' })
          }
        >
          <FormControlLabel value={true} control={<Radio />} label="Yes" />
          <FormControlLabel value={false} control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <TextField
          label="Approximate Distance (km)"
          type="number"
          value={formData.distance}
          onChange={handleChange}
          disabled
        />
      </FormControl>

      <Typography variant="h6" gutterBottom>
        Passenger List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Pickup From</TableCell>
            <TableCell>Drop to</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {passengerList.map((passenger, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{passenger.passengerName}</TableCell>
              <TableCell>{passenger.position}</TableCell>
              <TableCell>{passenger.pickup}</TableCell>
              <TableCell>{passenger.drop}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="RequestVehicle">
                <Typography variant="body1" gutterBottom>
                  Head Approved
                </Typography>
                <img
                  src={require("../Images/yes1.png")}
                  alt="Yes"
                  style={{ color: "green", width: "24px", height: "24px" }}
                />
              </div>
      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">Approval</FormLabel>
        <RadioGroup
          row
          value={formData.approveDeenAr}
          onChange={handleApproveChange}
        >
          <FormControlLabel value={true} control={<Radio />} label="Approved" />
          <FormControlLabel value={false} control={<Radio />} label="Rejected by AR" />
        </RadioGroup>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        onClick={submitArForm}
        fullWidth
      >
        Proceed
      </Button>
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
