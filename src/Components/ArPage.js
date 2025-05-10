import React, { useState, useEffect } from "react";
import "../Css/DepartmentHeadPageStyle.css";
import axios from "axios";
import DeenArDash from "./DeenArDash";
import { Link } from "react-router-dom";
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
  TextareaAutosize,
  Grid,
  Box,
  TableContainer,
} from "@mui/material";
import { toast } from "react-toastify";
import { useReservation } from "../context/ReservationContext";

export default function ArPage() {
  const [vehicleList, setVehicleList] = useState([]);
  const [vehicle, setVehicle] = useState({});
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
    approveDeenAr: "",
    arDeanNote: "",
  });
  const [passengerList, setPassengerList] = useState([]);
  const token = localStorage.getItem("token");
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
        setVehicleList(response.data);
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
    // if (selectedRequest.distance>45) {
    //   setFormData((prevFormData) => ({
    //     ...selectedRequest, // Copy selectedRequest data
    //     appoveDeen: true, // Override driverStatus
    //   }));
    // }
  }, [selectedRequest]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const addPassenger = () => {
  //   const newPassenger = {
  //     passengerName: formData.passengerName,
  //     position: formData.position,
  //     pickup: formData.pickup,
  //     drop: formData.drop,
  //   };
  //   setPassengerList([...passengerList, newPassenger]);
  // };

  const handleApproveChange = (e) => {
    const value = e.target.value === "true";

    setFormData((prevFormData) => {
      const isShortDistance = prevFormData.distance < 45;

      return {
        ...prevFormData,
        approveDeenAr: value,
        approveStatus: value ? "arApproved" : "reject",
        driverStatus: value
          ? isShortDistance
            ? "approved"
            : "arApproved"
          : "reject",
        approveDeen: value ? isShortDistance : false, // Fixed typo
      };
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
  const submitArForm = async () => {
    try {
      if (!formValidation()) return;
      console.log(formData);
      const formDataWithId = { ...formData, _id: String(formData._id) };
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

      setFormData({
        name: "",
        date: "",
        startTime: "",
        endTime: "",
        reason: "",
        reasonFunded: "",
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
        approveDeenAr: "",
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
    <Grid container spacing={2} sx={{ minHeight: "100vh" }}>
      {/* Left Column */}
      <Grid item xs={12} md={3} sx={{ backgroundColor: "#f4cdd4" }}>
        <DeenArDash updateTrigger={updateTrigger} />
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
                value={vehicle.vehicleName || "Not Selected"}
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
                id="reasonFunded"
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
          {/* <FormControl fullWidth margin="normal"> */}
          {/* <TextareaAutosize
              placeholder="Head Note"
              value={formData.departmentHeadNote}
              minRows={2}
              id="headNote"
              name="headNote"
              style={{ width: "100%", padding: "10px", fontSize: "1rem" }}
              disabled
            />

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
            </FormControl> */}
          <FormControl fullWidth margin="normal">
            <Typography variant="h6" gutterBottom>
              Head Note
            </Typography>

            <TextareaAutosize
              placeholder="Department Head Note..."
              color="primary"
              onChange={handleChange}
              value={formData.departmentHeadNote}
              minRows={2}
              size="md"
              id="departmentHeadNote"
              name="departmentHeadNote"
              disabled
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Typography variant="h6" gutterBottom>
              Checker Note
            </Typography>

            <TextareaAutosize
              placeholder="Department Head Note..."
              color="primary"
              onChange={handleChange}
              value={formData.checkerNote}
              minRows={2}
              size="md"
              id="checkerNote"
              name="checkerNote"
              disabled
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Typography variant="h6" gutterBottom>
              AR Note
            </Typography>
            <Typography
              component="label"
              htmlFor="Vehicle Request Forme"
              color="red"
            >
              * Add a note
            </Typography>
            <TextareaAutosize
              placeholder="AR Note..."
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
          {/* </FormControl> */}

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
                onClick={submitArForm}
                fullWidth
              >
                Send To The Checker
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
    // <div className="row mainpage min-vh-100">
    //   <div className="column1">
    //     <div className="requestbutton">
    //       <div>
    //         <DeenArDash updateTrigger={updateTrigger} />
    //       </div>
    //     </div>
    //   </div>
    //   <div className="column21" style={{ backgroundColor: "#ccc" }}>
    //     <div className="formhead">
    //       <form className="vehicleRequestForm1" title="Vehicle Request Form">
    //         <Typography variant="h4" gutterBottom>
    //           Vehicle Request Form
    //         </Typography>

    //         <FormControl fullWidth margin="normal">
    //           <TextField
    //             label="Date"
    //             type="date"
    //             value={formattedDate}
    //             onChange={handleChange}
    //             disabled
    //           />
    //         </FormControl>

    //         <FormControl fullWidth margin="normal">
    //           <TextField
    //             label="Vehicle"
    //             value={vehicle.vehicleName}
    //             InputLabelProps={{ shrink: true }}
    //             onChange={handleChange}
    //             id={vehicle._id}
    //             disabled
    //           />
    //         </FormControl>

    //         <FormControl fullWidth margin="normal">
    //           <TextField
    //             label="Start Time"
    //             type="time"
    //             value={formData.startTime}
    //             onChange={handleChange}
    //             InputLabelProps={{ shrink: true }}
    //             disabled
    //           />
    //         </FormControl>

    //         <FormControl fullWidth margin="normal">
    //           <TextField
    //             label="End Time"
    //             type="time"
    //             value={formData.endTime}
    //             onChange={handleChange}
    //             InputLabelProps={{ shrink: true }}
    //             disabled
    //           />
    //         </FormControl>

    //         <FormControl fullWidth margin="normal">
    //           <InputLabel id="section-label">Select Section</InputLabel>
    //           <Select
    //             labelId="section-label"
    //             value={formData.section}
    //             onChange={handleChange}
    //             disabled
    //           >
    //             <MenuItem value="">Select</MenuItem>
    //             <MenuItem value="Administrative">Administrative</MenuItem>
    //             <MenuItem value="Finance">Finance</MenuItem>
    //             <MenuItem value="Technical Officer">Technical Officer</MenuItem>
    //             <MenuItem value="Academic Staff">Academic Staff</MenuItem>
    //             <MenuItem value="AR Office">AR Office</MenuItem>
    //           </Select>
    //         </FormControl>

    //         <FormControl fullWidth margin="normal">
    //           <TextField
    //             label="Reason"
    //             value={formData.reason}
    //             onChange={handleChange}
    //             placeholder="Enter Reason For Vehicle Reservation"
    //             disabled
    //           />
    //         </FormControl>

    //         <FormControl fullWidth margin="normal">
    //           <TextField
    //             label="Departure From"
    //             value={formData.depatureLocation}
    //             onChange={handleChange}
    //             placeholder="Enter Departure Location"
    //             disabled
    //           />
    //         </FormControl>

    //         <FormControl fullWidth margin="normal">
    //           <TextField
    //             label="Destination"
    //             value={formData.destination}
    //             onChange={handleChange}
    //             placeholder="Enter Destination Location"
    //             disabled
    //           />
    //         </FormControl>

    //         <FormControl component="fieldset" margin="normal">
    //           <FormLabel component="legend">
    //             Do you want to come back in the same vehicle?
    //           </FormLabel>
    //           <RadioGroup
    //             row
    //             disabled
    //             value={formData.comeBack}
    //             onChange={(e) =>
    //               setFormData({
    //                 ...formData,
    //                 comeBack: e.target.value === "true",
    //               })
    //             }
    //           >
    //             <FormControlLabel
    //               value={true}
    //               control={<Radio />}
    //               label="Yes"
    //             />
    //             <FormControlLabel
    //               value={false}
    //               control={<Radio />}
    //               label="No"
    //             />
    //           </RadioGroup>
    //         </FormControl>

    //         <FormControl fullWidth margin="normal">
    //           <TextField
    //             label="Approximate Distance (km)"
    //             type="number"
    //             value={formData.distance}
    //             onChange={handleChange}
    //             disabled
    //           />
    //         </FormControl>

    //         <Typography variant="h6" gutterBottom>
    //           Passenger List
    //         </Typography>
    //         <Table>
    //           <TableHead>
    //             <TableRow>
    //               <TableCell>No</TableCell>
    //               <TableCell>Name</TableCell>
    //               <TableCell>Position</TableCell>
    //               <TableCell>Pickup From</TableCell>
    //               <TableCell>Drop to</TableCell>
    //             </TableRow>
    //           </TableHead>
    //           <TableBody>
    //             {passengerList.map((passenger, index) => (
    //               <TableRow key={index}>
    //                 <TableCell>{index + 1}</TableCell>
    //                 <TableCell>{passenger.name}</TableCell>
    //                 <TableCell>{passenger.position}</TableCell>
    //                 <TableCell>{passenger.pickup}</TableCell>
    //                 <TableCell>{passenger.drop}</TableCell>
    //               </TableRow>
    //             ))}
    //           </TableBody>
    //         </Table>
    //         <FormControl fullWidth margin="normal">
    //         <Typography variant="h6" gutterBottom>
    //         Department Head Note
    //         </Typography>
    //           <TextareaAutosize
    //             placeholder="Department Head Note..."
    //             onChange={handleChange}
    //             value={formData.departmentHeadNote}
    //             minRows={2}
    //             size="md"
    //             id="departmentHeadNote"
    //             name="departmentHeadNote"
    //             disabled
    //             style={{
    //               color: "#d3d3d3", // Change text color
    //               backgroundColor: "#f0f0f0", // Light gray background
    //               cursor: "not-allowed", // Optional: Show disabled cursor
    //               border: "1px solid #ccc", // Optional: Add border
    //               padding: "8px", // Improve spacing
    //               fontSize: "16px", // Adjust text size
    //             }}
    //           />
    //         </FormControl>

    //         <FormControl fullWidth margin="normal">
    //         <Typography variant="h6" gutterBottom>
    //         Ckecker Note
    //         </Typography>
    //           <TextareaAutosize
    //             placeholder="Ckecker Note..."
    //             onChange={handleChange}
    //             value={formData.checkerNote}
    //             minRows={2}
    //             size="md"
    //             id="checkerNote"
    //             name="checkerNote"
    //             disabled
    //             style={{
    //               color: "#d3d3d3", // Change text color
    //               backgroundColor: "#f0f0f0", // Light gray background
    //               cursor: "not-allowed", // Optional: Show disabled cursor
    //               border: "1px solid #ccc", // Optional: Add border
    //               padding: "8px", // Improve spacing
    //               fontSize: "16px", // Adjust text size
    //             }}
    //           />
    //         </FormControl>
    //         <FormControl fullWidth margin="normal">
    //           <Typography
    //             component="label"
    //             htmlFor="Vehicle Request Forme"
    //             color="red"
    //           >
    //             * Add a note
    //           </Typography>
    //           <TextareaAutosize
    //             placeholder="AR Note..."
    //             color="primary"
    //             onChange={handleChange}
    //             value={formData.arDeanNote}
    //             minRows={2}
    //             size="md"
    //             id="arDeanNote"
    //             name="arDeanNote"
    //             disabled={!formData.date}
    //           />
    //         </FormControl>
    //         <FormControl component="fieldset" margin="normal">
    //           <RadioGroup
    //             row
    //             value={formData.approveDeenAr}
    //             onChange={handleApproveChange}
    //           >
    //             <FormControlLabel
    //               value={true}
    //               control={<Radio />}
    //               label="Approved"
    //             />
    //             <FormControlLabel
    //               value={false}
    //               control={<Radio />}
    //               label="Rejected"
    //             />
    //           </RadioGroup>
    //         </FormControl>

    //         <Button
    //           variant="contained"
    //           color="primary"
    //           onClick={submitArForm}
    //           fullWidth
    //         >
    //           Proceed
    //         </Button>
    //       </form>
    //     </div>
    //   </div>
    //   <div className="column3" style={{ backgroundColor: "#fff" }}>
    //     <h2>DashBoard</h2>
    //     <Link style={{ textDecoration: "none" }} to="/request">
    //       <button className="deenrequwst">Add Reservation</button>
    //     </Link>
    //     <Link to="/user">
    //       <button className="deenrequwst">Your History</button>
    //     </Link>
    //     {/* <Link to="/vehiclelist">
    //       <button className="deenrequwst">Add Vehicle</button>
    //     </Link>
    //     <Link to="/userlistar">
    //       <button className="deenrequwst">Add User</button>
    //     </Link> */}
    //   </div>
    // </div>
  );
}
