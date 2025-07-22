import React, { useState, useEffect } from "react";
import "../Css/ReservationDash.css";
import axios from "axios";
import { useReservation } from "../context/ReservationContext";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  Box,
  Grid,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  ListItem,
  Paper,
  Divider,
} from '@mui/material';
import { green } from "@mui/material/colors";

export default function ReservationDash({ updateTrigger }) {
  const [requests, setRequest] = useState([]);
  const [approvedRequests, setApprovedRequest] = useState([]);

  const token = localStorage.getItem("token");
  const { setSelectedRequest ,setTabValue} = useReservation();
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    // Fetch customer data from the backend
    fetchReserDetail();
    console.log(1);
  }, [updateTrigger]);

  async function fetchReserDetail() {
    console.log(2);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/request/requests`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ); // Replace with the correct URL

      console.log(response);

      const filteredRequests = response.data.filter(
        (request) =>
          request.approveHead &&
          !request.approveChecker &&
          !request.approveDeenAr &&
          !request.approveDeen &&
          request.driverStatus !== "reject" &&
          request.driverStatus !== "approved"
      );
      setRequest(filteredRequests);
      const approvedFilteredRequests = response.data.filter(
        (request) =>
          request.approveHead &&
          request.approveChecker &&
          request.approveDeenAr &&
          request.approveDeen &&
          request.driverStatus !== "reject" &&
          request.driverStatus == "approved"||request.driverStatus == "finish"||request.driverStatus == "started"
      );
      setApprovedRequest(approvedFilteredRequests);
    } catch (error) {
      console.error(error);
    }
  }
  function handleItemClick(request) {
    // localStorage.setItem('selectedRequest', JSON.stringify(request));
    // document.dispatchEvent(new Event('forceUpdateHead'));
    setSelectedRequest(request);
    setSelectedRequestId(request._id);
    setTabValue(value);
  }

  function getFormattedDate(applyDate) {
    console.log("applyDate:", applyDate); // Log applyDate value

    const dateObject = new Date(applyDate); // Convert applyDate to a Date object

    if (!dateObject || isNaN(dateObject.getTime())) {
      console.log("applyDate is not a valid Date object");
      return "Invalid date"; // Handle case where applyDate is not a valid Date object
    }

    const now = new Date();

    if (isNaN(now.getTime())) {
      console.log("Current date is invalid");
      return "Current date not available"; // Handle case where current date is invalid
    }

    const diffInMs = now - dateObject;
    console.log("diffInMs:", diffInMs); // Log difference in milliseconds
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    console.log("diffInDays:", diffInDays);
    if (diffInDays === 0) {
      return "Today";
  } // Log difference in days
    return `${diffInDays} days ago`;
  }

  return (
    <Box sx={{ padding: 2 ,paddingTop:10}}>
      <h1>Reservations</h1>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        //indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="Head Approved" />
        <Tab value="two" label="Approved" />
      </Tabs>

      {value === "one" && (
          <Box >
             
              <Paper elevation={3} sx={{ maxHeight: '80vh', overflowY: 'auto' }}>
                <List>
                  {requests.map(request => (
                    <React.Fragment key={request._id}>
                      <ListItem
                        button
                        onClick={() => handleItemClick(request)}
                        sx={{
                            backgroundColor:
                            request._id === selectedRequestId
                              ? 'rgba(0, 0, 255, 0.2)' // Selected color
                              : request.isNew
                              ? 'rgba(0, 0, 255, 0.1)' // New request color
                              : 'inherit',
                          '&:hover': { backgroundColor: 'rgba(134, 82, 82, 0.49)' },
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Box sx={{ width: '100%' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle1">{request.applier}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {getFormattedDate(request.applyDate)}
                            </Typography>
                          </Box>
                          <Typography variant="body1">{request.reason}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            To: {request.destination} | Date: {request.date}
                          </Typography>
                          
                        </Box>
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Box>
      )}

      {value === "two" && (
          <Box >
              
              <Paper elevation={3} sx={{ maxHeight: '80vh', overflowY: 'auto' }}>
                <List>
                  {approvedRequests.map(request => (
                    <React.Fragment key={request._id}>
                      <ListItem
                        button
                        onClick={() => handleItemClick(request)}
                        sx={{
                            backgroundColor:
                            request._id === selectedRequestId
                              ? 'rgba(0, 0, 255, 0.2)' // Selected color
                              : request.isNew
                              ? 'rgba(0, 0, 255, 0.1)' // New request color
                              : 'inherit',
                          '&:hover': { backgroundColor: 'rgba(134, 82, 82, 0.49)' },
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Box sx={{ width: '100%' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle1">{request.applier}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {getFormattedDate(request.applyDate)}
                            </Typography>
                          </Box>
                          <Typography variant="body1">{request.reason}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            To: {request.destination} | Date: {request.date}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Staus: {request.driverStatus}
                          </Typography>
                        </Box>
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Box>
       
      )}
    </Box>
  );
}
