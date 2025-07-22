import React, { useState, useEffect } from 'react';
import '../Css/ReservationDash.css';
import axios from 'axios';
import { useReservation } from '../context/ReservationContext';
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
  } from "@mui/material";

export default function ReservationDash({updateTrigger}) {
    const [requests, setRequest] = useState([]);
    const token = localStorage.getItem("token"); 
    const { setSelectedRequest } = useReservation();
    const [selectedRequestId, setSelectedRequestId] = useState(null);
    useEffect(() => {
        // Fetch customer data from the backend  
        fetchReserDetail();
        console.log(1);
        
    }, [updateTrigger]);

    async function fetchReserDetail() {
        console.log(2);
        
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/request/requests`,{
            headers: {
              Authorization: `Bearer ${token}`
              
            },
      }); // Replace with the correct URL

      console.log(response);
      
        const filteredRequests = response.data.filter(request =>  request.approveHead && request.approveDeenAr&& request.approveChecker&& !request.approveDeen && request.driverStatus!=="reject"&& request.driverStatus!=="approved");
        setRequest(filteredRequests);
      
      } catch (error) {
        console.error(error);
      }
    }
    function handleItemClick(request) {
        // localStorage.setItem('selectedRequest', JSON.stringify(request));
        // document.dispatchEvent(new Event('forceUpdateHead'));
        setSelectedRequest(request);
        setSelectedRequestId(request._id);
    }

    function getFormattedDate(applyDate) {
      console.log('applyDate:', applyDate); // Log applyDate value
  
      const dateObject = new Date(applyDate); // Convert applyDate to a Date object
  
      if (!dateObject || isNaN(dateObject.getTime())) {
          console.log('applyDate is not a valid Date object');
          return 'Invalid date'; // Handle case where applyDate is not a valid Date object
      }
      
      const now = new Date();
      
      if (isNaN(now.getTime())) {
          console.log('Current date is invalid');
          return 'Current date not available'; // Handle case where current date is invalid
      }
  
      const diffInMs = now - dateObject;
      console.log('diffInMs:', diffInMs); // Log difference in milliseconds
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
      console.log('diffInDays:', diffInDays);
      if (diffInDays === 0) {
        return "Today";
    }  // Log difference in days
      return `${diffInDays} days ago`;
  }
  
  
    return (
        <Box sx={{ padding: 2 ,paddingTop:10}}>
        <Typography variant="h4" gutterBottom>
          Reservations
        </Typography>
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
    );
}
