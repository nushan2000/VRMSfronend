import React, { useState, useEffect } from "react";
import "../Css/DepartmentHeadPageStyle.css";
import ReservationDash from "./ReservationDash";
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
} from "@mui/material";
import { toast } from "react-toastify";
import { useReservation } from "../context/ReservationContext";
export default function Head() {
  const { selectedRequest } = useReservation();
  const [vehicleList, setVehicleList] = useState([]);
  const [vehicle, setVehicle] = useState({});
  const token = localStorage.getItem("token");
  const [updateTrigger, setUpdateTrigger] = useState(false);

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
      setPassengerList(selectedRequest.passengers)
      console.log("Updated form data:", { ...selectedRequest, driverStatus: "reject" });
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/vehicle/viewVehicle/${selectedRequest.vehicle}`
        )
        .then((response) => {setVehicle(response.data)})
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
      approveHead: value,
      
      driverStatus: value ? "notStart" : "reject"
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
        departmentHeadNote: "",
        
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
    <div className="row min-vh-100">
      <div className="column1 ">
        <div className="requestbutton">
          <ReservationDash updateTrigger={updateTrigger} />
        </div>
      </div>
      <div className="column21" style={{ backgroundColor: "#ccc" }}>
        <div className="formhead">
          <form className="vehicleRequestForm1" title="Vehicle Request Form">
            <h3>Vehicle Request Form</h3>

            <FormControl fullWidth margin="normal">
              <TextField
                label="Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.date}
                onChange={handleChange}
                id="date"
                disabled
              />
            </FormControl>

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

            <FormControl fullWidth margin="normal">
              <TextField
                label="Start Time"
                type="time"
                InputLabelProps={{ shrink: true }}
                value={formData.startTime}
                onChange={handleChange}
                id="startTime"
                disabled
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                label="End Time"
                type="time"
                InputLabelProps={{ shrink: true }}
                value={formData.endTime}
                onChange={handleChange}
                id="endTime"
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

            <FormControl fullWidth margin="normal">
              <TextField
                label="Reason"
                value={formData.reason}
                onChange={handleChange}
                id="reason"
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

            <FormControl component="fieldset" margin="normal">
              <FormLabel>
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

            <TableContainer>
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

            <FormControl fullWidth margin="normal">
              <Typography
                component="label"
                htmlFor="Vehicle Request Forme"
                color="red"
              >
                * Add a note
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
                disabled={!formData.date}
              />
            </FormControl>
            <FormControl component="fieldset" margin="normal">
              <RadioGroup
                row
                value={formData.approveHead}
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
            <FormControl fullWidth margin="normal">
              <Button
                variant="contained"
                color="primary"
                // type="submit"
                onClick={submitHeadForm}
              >
                Proceed
              </Button>
            </FormControl>
          </form>
        </div>
      </div>
      <div className="column3" style={{ backgroundColor: "#fff" }}>
        <h2>DashBoard</h2>
        <Link style={{ textDecoration: "none" }} to="/request">
          <button className="deenrequwst  ">Add Reservation</button>
        </Link>
        <Link to="/user">
          <button className="deenrequwst">Your History</button>
        </Link>
      </div>
    </div>
  );
}
