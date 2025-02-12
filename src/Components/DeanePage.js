import React, { useState, useEffect } from "react";
import "../Css/DepartmentHeadPageStyle.css";
import axios from "axios";
import DeenArDash from "./DeenArDash";
import { Link } from "react-router-dom";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  FormLabel,
  TextareaAutosize,
} from "@mui/material";
import { toast } from "react-toastify";
import { useReservation } from "../context/ReservationContext";
export default function ArPage() {
  const token = localStorage.getItem("token");
  const [vehicleList, setVehicleList] = useState([]);
  const [vehicle, setVehicle] = useState({});
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
    passengers: [],
    arDeanNote: "",
  });
  const [passengerList, setPassengerList] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const { selectedRequest } = useReservation();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/vehicle/vehicles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setVehicleList(response.data); // Assuming response.data is an array of vehicle names
      })
      .catch((error) => {
        console.error("Error fetching vehicle list:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedRequest) {
      setFormData((prevFormData) => ({
        ...selectedRequest, // Copy selectedRequest data
        driverStatus: "reject", // Override driverStatus
      }));
      setPassengerList(selectedRequest.passengers);
      console.log("Updated form data:", {
        ...selectedRequest,
        driverStatus: "reject",
      });
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/vehicle/viewVehicle/${selectedRequest.vehicle}`
        )
        .then((response) => {
          setVehicle(response.data);
        })
        .catch((error) => console.error("Error fetching vehicle:", error));
    }
  }, [selectedRequest]);

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
      approveDeenAr: value,
      driverStatus: value ? "approved" : "reject",
    });
  };
  const formValidation = () => {
    if (formData.date) {
      return true;
    } else {
      console.log("validation", formData.date);
      toast.error("Please select a resevation!");
      return false;
    }
  };
  const submitDeanForm = async (e) => {
    e.preventDefault();
    try {
      if (!formValidation()) return;
      const formDataWithId = { ...formData, _id: String(formData._id) };
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/request/updateRequest1/${formData._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (updateTrigger == false) {
        setUpdateTrigger(true);
      } else {
        setUpdateTrigger(false);
      }
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
        passengers: [],
        departmentHeadNote: "",
        arDeanNote: "",
      });

      //alert("Request submitted successfully!");
      toast.success("Request submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again later!");
      //alert("Error submitting form. Please try again later.");
    }
  };
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        // If the date is valid, return it in YYYY-MM-DD format
        return date.toISOString().split("T")[0];
      }
      return ""; // Fallback for invalid dates
    } catch (error) {
      return ""; // Fallback for any errors during formatting
    }
  };

  // Format the date safely
  const formattedDate = formatDate(formData.date);
  return (
    <div className="row min-vh-100">
      <div className="column1 ">
        <div className="requestbutton">
          <div>
            <DeenArDash updateTrigger={updateTrigger} />
          </div>
        </div>
      </div>
      <div className="column21" style={{ backgroundColor: "#ccc" }}>
        <div className="formhead">
          <form
            className="vehicleRequestForm1"
            title="Vehicle Request Form"
            onSubmit={submitDeanForm}
          >
            <Typography variant="h5" gutterBottom>
              Vehicle Request Form
            </Typography>

            <div className="RequestVehicle">
              <TextField
                label="Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                name="date"
                value={formattedDate}
                onChange={handleChange}
                margin="normal"
                disabled
              />

              <FormControl fullWidth margin="normal">
                <TextField
                  label="Vehicle"
                  value={vehicle.vehicleName}
                  onChange={handleChange}
                  id={vehicle._id}
                  disabled
                />
              </FormControl>
            </div>

            <div className="RequestVehicle">
              <TextField
                label="Start Time"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                margin="normal"
                disabled
              />
              <TextField
                label="End Time"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                margin="normal"
                disabled
              />
            </div>

            <FormControl fullWidth margin="normal">
              <InputLabel>Select Section</InputLabel>
              <Select
                name="section"
                value={formData.section}
                onChange={handleChange}
                disabled
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {[
                  "Administrative",
                  "Finance",
                  "Technical Officer",
                  "Academic Staff",
                  "AR Office",
                ].map((section) => (
                  <MenuItem key={section} value={section}>
                    {section}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Reason"
              fullWidth
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              margin="normal"
              disabled
            />

            <TextField
              label="Departure From"
              fullWidth
              name="depatureLocation"
              value={formData.depatureLocation}
              onChange={handleChange}
              margin="normal"
              disabled
            />

            <TextField
              label="Destination"
              fullWidth
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              margin="normal"
              disabled
            />

            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">
                Do you want to come back in the same vehicle?
              </FormLabel>
              <RadioGroup
                row
                value={formData.comeBack}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    comeBack: e.target.value === "true",
                  })
                }
                disabled
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>

            <TextField
              label="Approximate Distance"
              fullWidth
              type="number"
              name="distance"
              value={formData.distance}
              onChange={handleChange}
              margin="normal"
              disabled
            />

            <Typography variant="h6" gutterBottom>
              Passengers
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Position</TableCell>
                  <TableCell>Pickup From</TableCell>
                  <TableCell>Drop To</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formData.passengers.map((passenger, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{passenger.name}</TableCell>
                    <TableCell>{passenger.position}</TableCell>
                    <TableCell>{passenger.pickup}</TableCell>
                    <TableCell>{passenger.drop}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <FormControl fullWidth margin="normal">
              <TextareaAutosize
                placeholder="Department Head Note..."
                onChange={handleChange}
                value={formData.departmentHeadNote}
                minRows={2}
                size="md"
                id="departmentHeadNote"
                name="departmentHeadNote"
                disabled
                style={{
                  color: "#d3d3d3", // Change text color
                  backgroundColor: "#f0f0f0", // Light gray background
                  cursor: "not-allowed", // Optional: Show disabled cursor
                  border: "1px solid #ccc", // Optional: Add border
                  padding: "8px", // Improve spacing
                  fontSize: "16px", // Adjust text size
                }}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Typography
                component="label"
                htmlFor="Vehicle Request Forme"
                color="red"
              >
                * Add a note
              </Typography>
              <TextareaAutosize
                placeholder="Dean Note..."
                color="primary"
                onChange={handleChange}
                value={formData.arDeanNote}
                minRows={2}
                size="md"
                id="arDeanNote"
                name="arDeanNote"
                disabled={!formData.date}
              />
            </FormControl>
            <FormControl component="fieldset" margin="normal">
              <RadioGroup
                row
                name="setApprove"
                value={String(formData.approveDeenAr)}
                onChange={handleApproveChange}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Approved"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="Rejected"
                />
              </RadioGroup>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              onClick={submitDeanForm}
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
          <button className="deenrequwst">Add Reservation</button>
        </Link>
        <Link to="/user">
          <button className="deenrequwst">Your History</button>
        </Link>
        <Link to="/vehiclelist">
          <button className="deenrequwst">Add Vehicle</button>
        </Link>
        <Link to="/userlistar">
          <button className="deenrequwst">Add User</button>
        </Link>
        <Link to="/user/feedback/review">
          <button className="deenrequwst">Driver Reviews</button>
        </Link>
      </div>
    </div>
  );
}
