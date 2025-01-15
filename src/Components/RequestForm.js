import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Css/RequestForm.css";
import Cookies from "js-cookie";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Checkbox,
  FormLabel
} from "@mui/material";
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';

export default function RequestForm() {

  const [vehicleList, setVehicleList] = useState([]);
  const token = localStorage.getItem("token");
  const [date, setDate] = useState("");
  const [userEmail, setUserEmail] = useState(null);
  const [approveHead, setApproveHead] = useState(false);
  const [approveDeenAr, setApproveDeenAr] = useState(false);

  useEffect(() => {
    // Retrieve user data from cookie
    const userInfoFromCookie = Cookies.get('userInfo');

    // If user data exists in the cookie, parse it and set the state
    if (userInfoFromCookie) {
      const parsedUserInfo = JSON.parse(userInfoFromCookie);
      console.log("info",parsedUserInfo);
      const { designation } = parsedUserInfo;
      console.log("desig",designation);
      if (designation === "dean" || designation === "ar") {
        setApproveDeenAr(true);
        setApproveHead(true);
      } else if (designation === "head") {
        setApproveHead(true);
      }
      
      console.log("head",approveHead);
      console.log("deanAr",approveDeenAr);
      const { email } = parsedUserInfo; // Extract name from user data
      setUserEmail(email);
    }

    axios.get(`${process.env.REACT_APP_API_URL}/request/RequestVehicles/${date}`, {
      headers: {
        Authorization: `Bearer ${token}`

      },
    })
      .then(response => {
        setVehicleList(response.data);
        console.log("respose", response);
        // Assuming response.data is an array of vehicle names
      })
      .catch(error => {
        console.error("Error fetching vehicle list:", error);
      });

  }, [date]); // Run only once after component mount



  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [reason, setReason] = useState("");
  const [section, setSection] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [comeBack, setComeBack] = useState(false);
  const [distance, setDistance] = useState("");

  const [position, setPosition] = useState("");
  const [depatureLocation, setDepatureLocation] = useState("");
  const [passengerName, setPassengerName] = useState("");
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [passengerList, setPassengerList] = useState([]);
  const [isChecked, setIsChecked] = useState(false); // Default value for checkbox
  
  
  

  const addPassenger = () => {
    const newPassenger = {
      name: name,
      position: position,
      pickup: pickup,
      drop: drop
    };

    setPassengerList([...passengerList, newPassenger]);

    // Clear input fields after adding a passenger
    setName("");
    setPosition("");
    setPickup("");
    setDrop("");
  };

  const deletePassenger = (index) => {
    const updatedPassengers = passengerList.filter(
      (passenger, i) => i !== index
    );
    setPassengerList(updatedPassengers);
  };
  const submitForm = async () => {

    try {
      // if (comeBack === "") {
      //  alert("Please select whether you want to come back in the same vehicle or not.");
      //   return;
      // }         
      // Assuming user data contains the logger name

      const currentDate = new Date().toISOString().split('T')[0];

      const formData = {

        date: date,
        startTime: startTime,
        endTime: endTime,
        reason: reason,
        section: section,
        comeBack: comeBack,
        vehicle: vehicle,
        distance: distance,
        depatureLocation: depatureLocation,
        destination: destination,
        passengers: passengerList,
        applier: userEmail, // Set applier to current logger's name
        applyDate: currentDate,
        approveDeenAr:approveDeenAr,
        approveHead:approveHead

      };

      // Replace the URL with your actual endpoint
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/request/addrequest`, formData, {
        headers: {
          Authorization: `Bearer ${token}`

        },
      });
      alert("Request submitted successfully!");
      // Handle the server response if needed
      console.log("Server Response:", response.data);


      setDate("");
      setStartTime("");
      setEndTime("");
      setReason("");
      setSection("");
      setVehicle("");
      setComeBack("");
      setDistance("");
      setPassengerList([]);
      setDepatureLocation("")
      setDestination("")
      setVehicleList(null)

    } catch (error) {

      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again later.");
    }
  };


  //Availabel sheets for every vehicle for according to date


  return (
    <form class="vehicleRequestForm" title="Vehicle Request Form" >
      <label for="Vehicle Request Forme" class="form-label">Vehicle Request Form </label>



      <FormControl fullWidth margin="normal">
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">


        <Autocomplete
          options={vehicleList}

          getOptionLabel={(option) =>
            `${option.vehicleName} ("available sheets: "${option.availableSeats} , "maxCapacity: "${option.maxCapacity})`
          }
          onChange={(e, option) => setVehicle(option ? option.vehicleName : "")}
          renderInput={(params) => <TextField {...params} label="Select Vehicle" />
        }
        />


      </FormControl>

      <FormControl fullWidth margin="normal">
        <TextField
          label="Start Time"
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="End Time"
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Select Section</InputLabel>
        <Select
          value={section}
          onChange={(e) => setSection(e.target.value)}
        >
          <MenuItem value="">Select</MenuItem>
          <MenuItem value="Administrative">Administrative</MenuItem>
          <MenuItem value="Mechanical">Mechanical</MenuItem>
          <MenuItem value="Electrical">Electrical</MenuItem>
          <MenuItem value="Civil">Civil</MenuItem>
          <MenuItem value="Marine">Marine</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Departure From"
          value={depatureLocation}
          onChange={(e) => setDepatureLocation(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </FormControl>



      <FormControlLabel
        control={
          <Checkbox
            checked={comeBack}
            onChange={(e) => setComeBack(e.target.checked)}
            name="additionalOption"
          />
        }
        label="Do you want to come back in the same vehicle?"
      />





      <FormControl fullWidth margin="normal">
        <TextField
          label="Approximate Distance (km)"
          type="number"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
      </FormControl>
      <Typography variant="h5" gutterBottom>
        Add Passenger
      </Typography>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Select Position</InputLabel>
        <Select
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        >
          <MenuItem value="">Select</MenuItem>
          <MenuItem value="Academic Staff">Academic Staff</MenuItem>
          <MenuItem value="Non-Academic Staff">Non-Academic Staff</MenuItem>
          <MenuItem value="Student">Student</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Pickup Location"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Drop Location"
          value={drop}
          onChange={(e) => setDrop(e.target.value)}
        />
      </FormControl>
      <Button variant="contained" color="primary" onClick={addPassenger}>
        Add Passenger
      </Button>
      <TableContainer component={Paper} margin="normal">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Pickup From</TableCell>
              <TableCell>Drop To</TableCell>
              <TableCell>Action</TableCell>
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
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deletePassenger(index)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={submitForm}
        margin="normal"
      >
        Submit Form
      </Button>
    </form>
  )
}
