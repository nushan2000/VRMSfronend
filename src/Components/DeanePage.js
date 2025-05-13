import React, { useState, useEffect } from "react";
import "../Css/DepartmentHeadPageStyle.css";
import axios from "axios";
import DeenDash from "./DeenDash";
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
  Checkbox,
  TableContainer,
  Grid,
  Box,
  Autocomplete,
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
    approveDeen: false,
    driverStatus: "notStart",
    applier: "",
    applyDate: "",
    passengers: [],
    deanNote: "",
    arDeanNote:""
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
      approveDeen: value,
      approveStatus: value ? "deanApproved" : "reject",
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
        approveDeen: false,
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
    // <div className="row min-vh-100">
    //   <div className="column1 ">
    //     <div className="requestbutton">
    //       <div>

    //       </div>
    //     </div>
    //   </div>
    <Grid container spacing={2} sx={{ minHeight: "100vh" }}>
      {/* Left Column */}
      <Grid item xs={12} md={3} sx={{ backgroundColor: "#f4cdd4" }}>
        <DeenDash updateTrigger={updateTrigger} />
      </Grid>

      {/* Center Column */}

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
            <FormControl fullWidth margin="normal">
              <TextField
                label="Vehicle"
                value={vehicle.vehicleName}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
                id={vehicle._id}
                disabled
              />
            </FormControl>
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
          <Box>
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
              style={{ width: "100%", padding: "10px", fontSize: "1rem" }}
              disabled
            />
            <FormControl fullWidth margin="normal">
              <Typography variant="h6" gutterBottom>
                Checker Note
              </Typography>
              <TextareaAutosize
                placeholder="Checker Note..."
                value={formData.checkerNote}
                onChange={handleChange}
                minRows={2}
                id="checkerNote"
                name="checkerNote"
                style={{ width: "100%", padding: "10px", fontSize: "1rem" }}
                disabled
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
                style={{ width: "100%", padding: "10px", fontSize: "1rem" }}
                disabled
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
                id="deanNote"
                name="deanNote"
                style={{ width: "100%", padding: "10px", fontSize: "1rem" }}
              />
            </FormControl>
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
                onClick={submitDeanForm}
                fullWidth
              >
                Send To The Driver
              </Button>
            </Box>
          </FormControl>
        </Box>
      </Grid>
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

    // <FormControl fullWidth margin="normal">
    // <Typography variant="h6" gutterBottom>
    //               Ar Note
    //             </Typography>
    // <TextareaAutosize
    //   placeholder="Ar Note..."
    //   onChange={handleChange}
    //   value={formData.arDeanNote}
    //   minRows={2}
    //   size="md"
    //   id="arDeanNote"
    //   name="arDeanNote"
    //   disabled
    //   style={{
    //     color: "#d3d3d3", // Change text color
    //     backgroundColor: "#f0f0f0", // Light gray background
    //     cursor: "not-allowed", // Optional: Show disabled cursor
    //     border: "1px solid #ccc", // Optional: Add border
    //     padding: "8px", // Improve spacing
    //     fontSize: "16px", // Adjust text size
    //   }}
    // />
    // </FormControl>
    // <FormControl fullWidth margin="normal">
    //   <Typography
    //     component="label"
    //     htmlFor="Vehicle Request Forme"
    //     color="red"
    //   >
    //     * Add a note
    //   </Typography>
    //   <TextareaAutosize
    //     placeholder="Dean Note..."
    //     color="primary"
    //     onChange={handleChange}
    //     value={formData.deanNote}
    //     minRows={2}
    //     size="md"
    //     id="deanNote"
    //     name="deanNote"
    //     disabled={!formData.date}
    //   />
    // </FormControl>
    // <FormControl component="fieldset" margin="normal">
    //   <RadioGroup
    //     row
    //     name="setApprove"
    //     value={String(formData.approveDeen)}
    //     onChange={handleApproveChange}
    //   >
    //     <FormControlLabel
    //           value="true"
    //           control={<Radio />}
    //           label="Approved"
    //         />
    //         <FormControlLabel
    //           value="false"
    //           control={<Radio />}
    //           label="Rejected"
    //         />
    //       </RadioGroup>
    //     </FormControl>

    //     <Button
    //       variant="contained"
    //       color="primary"
    //       onClick={submitDeanForm}
    //       fullWidth
    //     >
    //       Send To The Driver
    //     </Button>
    //   </form>
    // </div>
    // </div>
    // <div className="column3" style={{ backgroundColor: "#fff" }}>
    //   <h2>DashBoard</h2>
    //   <Link style={{ textDecoration: "none" }} to="/request">
    //     <button className="deenrequwst">Add Reservation</button>
    //   </Link>
    //   <Link to="/user">
    //     <button className="deenrequwst">Your History</button>
    //   </Link>
    //     {/* <Link to="/vehiclelist">
    //       <button className="deenrequwst">Add Vehicle</button>
    //     </Link>*/}
    //     {/* <Link to="/dean/allRequests">
    //       <button className="deenrequwst">All Requests</button>
    //     </Link>
    //     <Link to="/user/feedback/review">
    //       <button className="deenrequwst">Driver Reviews</button>
    //     </Link>
    //   </div>
    // </div>  */}
  );
}
