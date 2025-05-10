import React, { useState, useEffect } from "react";
import "../Css/DepartmentHeadPageStyle.css";
import CheckerDash from "./CheckerDash";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  TextField,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Button,
  FormControl,
  InputLabel,
  FormLabel,
  TextareaAutosize,
  Typography,
  Grid,
  Box,
  Autocomplete,
} from "@mui/material";
import { toast } from "react-toastify";
import { useReservation } from "../context/ReservationContext";
export default function Checker() {
  const { selectedRequest, tabValue } = useReservation();
  const [vehicleList, setVehicleList] = useState([]);
  const [vehicle, setVehicle] = useState({});
  const token = localStorage.getItem("token");
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = React.useState(null);

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    startTime: "",
    endTime: "",
    reason: "",
    section: "",
    vehicle: null,
    comeBack: "",
    comeBackHead: "",
    distance: "",
    depatureLocation: "",
    passengerName: "",
    position: "",
    pickup: "",
    drop: "",
    isChecked: false,
    departmentHeadNote: "",
    destination: "",
    passengerList: [], // Initialize passengerList as an empty array
    approveHead: false,
    driverStatus: "reject",
  });
  const [passengerList, setPassengerList] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/vehicle/vehicles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setVehicleList(response.data);

        //toast.success("Request come successfully!"); // Assuming response.data is an array of vehicle names
      })
      .catch((error) => {
        console.error("Error fetching vehicle list:", error);
      });
  }, []);

  useEffect(() => {
    // const handleForceUpdate = () => {
    //   // When the custom event is triggered, update the form data
    //   const requestData =
    //     JSON.parse(localStorage.getItem("selectedRequest")) || [];

    //   console.log("Request Data:", requestData);
    //   setFormData(requestData);
    //   //////////////////////////////////////////////

    //   setPassengerList(requestData.passengers || []);

    //   axios
    //     .get(
    //       `${process.env.REACT_APP_API_URL}/vehicle/viewVehicle/${requestData.vehicle}`,
    //       {}
    //     )
    //     .then((response) => {
    //       setVehicle(response.data);
    //       console.log("resposeVehi", response);
    //       // Assuming response.data is an array of vehicle names
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching vehicle list:", error);
    //     });
    // };

    // // Listen for the custom event to trigger a re-render
    // document.addEventListener("forceUpdateHead", handleForceUpdate);

    // return () => {
    //   // Clean up the event listener on component unmount
    //   document.removeEventListener("forceUpdateHead", handleForceUpdate);
    // };
    if (selectedRequest) {
      setFormData((prevFormData) => ({
        ...selectedRequest, // Copy selectedRequest data
        driverStatus: "reject", // Override driverStatus
      }));
      setPassengerList(selectedRequest.passengers);
      if (selectedRequest.depatureLocation == "From Faculty?") {
        setFormData((prevFormData) => ({
          ...selectedRequest, // Copy selectedRequest data
          isChecked: true, // Override driverStatus
        }));
      }
      console.log("Updated form data:", {
        ...selectedRequest,
        driverStatus: "reject",
      });
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/request/RequestVehicles/${selectedRequest.date}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setVehicleList(response.data);
          console.log("respose", response);
          // Assuming response.data is an array of vehicle names
        })
        .catch((error) => {
          console.error("Error fetching vehicle list:", error);
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
    // If the field being updated is not "_id", update formData as usual
    if (name !== "_id") {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      // If the field being updated is "_id", preserve the existing _id value
      setFormData({
        ...formData,
        _id: formData._id,
        [name]: value,
      });
    }
  };

  // const addPassenger = () => {
  //   const newPassenger = {
  //     passengerName: formData.passengerName,
  //     position: formData.position,
  //     pickup: formData.pickup,
  //     drop: formData.drop,
  //   };
  //   console.log("New Passenger Details:", newPassenger);
  //   setPassengerList([...passengerList, newPassenger]);

  //   // Clear input fields after adding a passenger
  // };
  const handleApproveChange = (e) => {
    const value = e.target.value === "true";
    //toast.success("Request approve successfully!");
    //  // Convert string to boolean
    console.log("radio vaue", value);

    setFormData({
      ...formData,
      approveChecker: value,
      approveStatus: value ? "driverAssigned" : "reject",
      driverStatus: value ? "notStart" : "reject",
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

  const submitHeadForm = async () => {
    // Perform validation first
    if (!formValidation()) return;

    try {
      console.log(formData);

      // Prepare the form data
      const formDataWithId = { ...formData, _id: String(formData._id) };

      // Send the request to update the data
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/request/updateRequest1/${formData._id}`,
        formDataWithId,
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

      // Reset form data after successful submission
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
        destination: "",
        passengerList: [],
        approveHead: "",
        checkerNote: "",
      });

      // Show success message
      toast.success("Request submitted successfully!");

      return response;
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again later!");
    }
  };

  //const formattedDate = new Date(formData.date).toISOString().split("T")[0];

  return (
    <Grid container spacing={2} sx={{ minHeight: "100vh" }}>
      {/* Left Column */}
      <Grid item xs={12} md={3} sx={{ backgroundColor: "#f4cdd4" }}>
        <CheckerDash updateTrigger={updateTrigger} />
      </Grid>

      {/* Center Column */}
      {tabValue === "one" && (
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 3,
              backgroundColor: "#f9f9f9",
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            <Typography variant="h5" gutterBottom>
              Vehicle Request Form
            </Typography>

            <FormControl fullWidth margin="normal">
              <TextField
                label="Date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                id="date"
                InputLabelProps={{ shrink: true }}
                disabled
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <Autocomplete
                options={vehicleList || []}
                
                getOptionLabel={(option) =>
                  `${option.vehicleName} ("available sheets: "${option.availableSeats} , "maxCapacity: "${option.maxCapacity})`
                }
                value={selectedVehicle}
                onChange={(e, option) => {
                  setSelectedVehicle(option);
                  setVehicle(option ? option.id : "");
                  setFormData((prev) => ({
                    ...prev,
                    vehicle: option ? option.id : ""
                  }));
                  
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Select Vehicle" />
                )}
                style={{ cursor: "not-allowed" }}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                label="Start Time"
                type="time"
                value={formData.startTime}
                onChange={handleChange}
                id="startTime"
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
                id="endTime"
                InputLabelProps={{ shrink: true }}
                disabled
              />
            </FormControl>
            {/* <Typography variant="h7" gutterBottom>
              Departure From
            </Typography> */}
            {/* <Box sx={{ pl: 5 }}>
              <FormControlLabel
                control={
                  <Checkbox
                  disabled
                    checked={formData.isChecked}
                    onChange={handleChange}
                    name="additionalOption"
                  />
                }
                label="From Faculty?"
              />
            </Box> */}
            <Box>
              <FormControl fullWidth margin="normal">
                <TextField
                  disabled
                  label="Departure From"
                  value={formData.depatureLocation}
                  onChange={handleChange}
                  //disabled={isChecked}
                />
              </FormControl>
            </Box>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Destination"
                value={formData.destination}
                onChange={handleChange}
                id="destination"
                disabled
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                label="Section"
                value={formData.section}
                onChange={handleChange}
                id="section"
                disabled
              />
            </FormControl>
            <Typography variant="h7" gutterBottom>
              Supporting Document
            </Typography>
            <FormControl fullWidth margin="normal">
              <input
                type="file"
                disabled
                multiple
                value={formData.filePath}
                onChange={handleChange}
                accept=".pdf,.doc,.docx,.jpg,.png"
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Reason"
                value={formData.reason}
                onChange={handleChange}
                id="reason"
                disabled
              />
            </FormControl>

            {/* <Box sx={{ pl: 5 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    disabled
                    checked={true}
                    onChange={handleChange}
                    name="additionalOption"
                  />
                }
                label="Faculty Funded?"
              />
            </Box> */}
            <Box >
              <FormControl fullWidth margin="normal">
                <TextField
                  disabled
                  label="Funded From"
                  value={formData.reasonFunded}
                  onChange={handleChange}
                  //disabled={isChecked2}
                />
              </FormControl>
            </Box>

            <FormControl component="fieldset" margin="normal">
              <FormLabel>Return in same root?</FormLabel>
              <RadioGroup
                row
                value={formData.comeBack}
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: "comeBack",
                      value: e.target.value === "true",
                    },
                  })
                }
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Yes"
                  disabled
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="No"
                  disabled
                />
              </RadioGroup>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                label="Approximate Distance (km)"
                type="number"
                value={formData.distance}
                onChange={handleChange}
                id="distance"
                disabled
              />
            </FormControl>

            {/* Passenger Table */}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Passenger Name</TableCell>
                    <TableCell>Designation</TableCell>
                    <TableCell>Pickup Location</TableCell>
                    <TableCell>Drop-off Location</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {passengerList.map((passenger, index) => (
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
            </TableContainer>

            {/* Notes Section */}
            <FormControl fullWidth margin="normal">
              <TextareaAutosize
                placeholder="Head Note"
                value={formData.departmentHeadNote}
                minRows={2}
                id="headNote"
                name="headNote"
                style={{ width: "100%", padding: "10px", fontSize: "1rem" }}
                disabled
              />
              <Typography variant="body2" color="error">
                * Add a note
              </Typography>

              <TextareaAutosize
                placeholder="Checker Note..."
                value={formData.checkerNote}
                onChange={handleChange}
                minRows={2}
                id="checkerNote"
                name="checkerNote"
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "1rem",
                  marginTop: "10px",
                }}
                disabled={!formData.date}
              />
            </FormControl>

            {/* Approval */}
            <FormControl component="fieldset" margin="normal">
              <RadioGroup
                row
                value={formData.approveChecker}
                onChange={handleApproveChange}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Approved"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="Rejected"
                />
              </RadioGroup>
            </FormControl>

            {/* Submit */}
            <FormControl fullWidth margin="normal">
              <Box display="flex" fullWidth gap={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={submitHeadForm}
                >
                  Send To The AR
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={submitHeadForm}
                >
                  Download
                </Button>
              </Box>
            </FormControl>
          </Box>
        </Grid>
      )}
      {tabValue === "two" && (
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 3,
              backgroundColor: "#f9f9f9",
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            <Typography variant="h5" gutterBottom>
              Vehicle Request Form
            </Typography>

            <FormControl fullWidth margin="normal">
              <TextField
                label="Date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                id="date"
                InputLabelProps={{ shrink: true }}
                disabled
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                label="Vehicle"
                value={vehicle.vehicleName}
                id={vehicle._id}
                InputLabelProps={{ shrink: true }}
                disabled
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                label="Start Time"
                type="time"
                value={formData.startTime}
                onChange={handleChange}
                id="startTime"
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
                id="endTime"
                InputLabelProps={{ shrink: true }}
                disabled
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Departure From"
                value={formData.depatureLocation}
                onChange={handleChange}
                id="depatureLocation"
                disabled
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                label="Destination"
                value={formData.destination}
                onChange={handleChange}
                id="destination"
                disabled
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Section"
                value={formData.section}
                onChange={handleChange}
                id="section"
                disabled
              />
            </FormControl>
            <Typography variant="h7" gutterBottom>
              Supporting Document
            </Typography>
            <FormControl fullWidth margin="normal">
              <input
                type="file"
                disabled
                multiple
                value={formData.filePath}
                onChange={handleChange}
                accept=".pdf,.doc,.docx,.jpg,.png"
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Reason"
                value={formData.reason}
                onChange={handleChange}
                id="reason"
                disabled
              />
            </FormControl>
            <Box >
              <FormControl fullWidth margin="normal">
                <TextField
                  disabled
                  label="Funded From"
                  value={formData.reasonFunded}
                  onChange={handleChange}
                  //disabled={isChecked2}
                />
              </FormControl>
            </Box>
           

            <FormControl component="fieldset" margin="normal">
              <FormLabel>Return in same root?</FormLabel>
              <RadioGroup
                row
                value={formData.comeBack}
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: "comeBack",
                      value: e.target.value === "true",
                    },
                  })
                }
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Yes"
                  disabled
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="No"
                  disabled
                />
              </RadioGroup>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                label="Approximate Distance (km)"
                type="number"
                value={formData.distance}
                onChange={handleChange}
                id="distance"
                disabled
              />
            </FormControl>

            {/* Passenger Table */}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Passenger Name</TableCell>
                    <TableCell>Designation</TableCell>
                    <TableCell>Pickup Location</TableCell>
                    <TableCell>Drop-off Location</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {passengerList.map((passenger, index) => (
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
            </TableContainer>

            {/* Notes Section */}
            <FormControl fullWidth margin="normal">
              <Typography variant="h6" gutterBottom>
                Head Note
              </Typography>
              <TextareaAutosize
                placeholder="Head Note"
                value={formData.departmentHeadNote}
                minRows={2}
                id="headNote"
                name="headNote"
                // style={{ width: "100%", padding: "10px", fontSize: "1rem",cursor: "not-allowed" }}
                disabled
                size="md"
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
              <Typography variant="h6" gutterBottom>
                Checker Note
              </Typography>
              <TextareaAutosize
                placeholder="Checker Note..."
                value={formData.checkerNote}
                color="primary"
                onChange={handleChange}
                minRows={2}
                id="checkerNote"
                name="checkerNote"
                size="md"
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
              <Typography variant="h6" gutterBottom>
                Ar Note
              </Typography>
              <TextareaAutosize
                placeholder="Ar Note..."
                onChange={handleChange}
                color="primary"
                value={formData.arDeanNote}
                minRows={2}
                size="md"
                id="arDeanNote"
                name="arDeanNote"
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
              <Typography variant="h6" gutterBottom>
                Dean Note
              </Typography>
              <TextareaAutosize
                placeholder="Dean Note..."
                color="primary"
                onChange={handleChange}
                value={formData.deanNote}
                minRows={2}
                size="md"
                id="arDeanNote"
                name="arDeanNote"
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
            {/* Approval */}

            {/* Submit */}
            <FormControl fullWidth margin="normal">
              <Button
                variant="contained"
                color="primary"
                onClick={submitHeadForm}
              >
                Download
              </Button>
            </FormControl>
          </Box>
        </Grid>
      )}

      {/* Right Column */}
      <Grid item xs={12} md={3}>
        <Box
          sx={{ p: 2, backgroundColor: "#fff", borderRadius: 2, boxShadow: 1 }}
        >
          <Typography variant="h6">Dashboard</Typography>
          <Link to="/request" style={{ textDecoration: "none" }}>
            <Button fullWidth variant="outlined" sx={{ mt: 1 }}>
              Add Reservation
            </Button>
          </Link>
          <Link to="/user" style={{ textDecoration: "none" }}>
            <Button fullWidth variant="outlined" sx={{ mt: 1 }}>
              Your History
            </Button>
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
}
