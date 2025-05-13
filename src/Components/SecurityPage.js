import Dashboard from "./Dashboard";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Css/HistryPageStyle.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  TableContainer,
  Paper,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Collapse,
  Box,
  Typography,
  TableRow as MuiTableRow,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { green } from "@mui/material/colors";

export default function () {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [expandedRequestId, setExpandedRequestId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [costs, setCosts] = useState({});
  const [co2, setCo2] = useState({});
  const [loading, setLoading] = useState(false); // Add loading state
  const token = localStorage.getItem("token");
 
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    // Retrieve user data from cookie
    const userInfoFromCookie = Cookies.get("userInfo");

    // If user data exists in the cookie, parse it and set the state
    if (userInfoFromCookie) {
      const parsedUserInfo = JSON.parse(userInfoFromCookie);
      const { email } = parsedUserInfo; // Extract name from user data
      setUserEmail(email);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/request/requests`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRequests(response.data);
      console.log("res", response.data);

      //toast.success('This is a success message!');
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("This is an error message!");
    }
  };

  //const [startClicked, setStartClicked] = useState("start");
 // const [startButtonDisabled, setStartButtonDisabled] = useState(request.driverStatus !== "approved");  
  const handleButtonClick = (request) => {
    switch (request.driverStatus) {
      case "start":
        // Navigate to location page
        window.location.href = "/location-tracker";
        break;
      case "finish":
        // Navigate to feedback page
        window.location.href = "/user/feedback";
        break;
      default:
        // Navigate to approved page
        window.location.href = "/approvedPage";
        break;
    }
  };

  return (
    <body>
      <div className="row">
        <div className="columnHistory">
          <h1>History</h1>
          <div className=" ">
            <div className="">
              <div className="request-row">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Date</TableCell>
                      <TableCell>Route</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {requests
                      .filter(
                        (request) =>
                          request.approveDeenAr &&
                          request.approveDeen &&
                          request.driverStatus !== "reject" &&
                          request.driverStatus == "approved"|| request.driverStatus === "started"|| request.driverStatus === "finish"
                      )
                      .map((request) => (
                        <Row
                          key={request._id}
                          request={request}
                          fetchRequests={fetchRequests}
                        />
                      ))}
                  </TableBody>
                </Table>

            
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}
function Row({ request, fetchRequests }) {
  const [open, setOpen] = useState(false);

  const handleCancel = async (requestId) => {
    console.log("id", requestId);

    if (!window.confirm("Are you sure you want to cancel this request?")) {
      return;
    }

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/request/requests/${requestId}`
      );
      alert(response.data.message || "Request cancelled successfully");
      fetchRequests();
      // You can refresh data here if needed, e.g., refetch requests list
    } catch (error) {
      console.error("Failed to cancel request:", error);
      alert(error.response?.data?.message || "Failed to cancel request");
    }
  };

  const handleStart= async (requestId) => {
    const token = localStorage.getItem("token");
    console.log("id", requestId);
    const startTime = new Date().toISOString();
    if (!window.confirm("Are you sure you want to start this request?")) {
      return;
    }

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/request/updateRequest1/${requestId}`,
        {startDateTime: startTime,
          driverStatus: "started",
          approveStatus:"driverStarted"},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message || "Request Start successfully");
      fetchRequests();
      // You can refresh data here if needed, e.g., refetch requests list
    } catch (error) {
      console.error("Failed to start request:", error);
      alert(error.response?.data?.message || "Failed to start request");
    }
  };
  const handleEnd= async (requestId) => {
    const token = localStorage.getItem("token");
    console.log("id", requestId);
    const endTime = new Date().toISOString();
    if (!window.confirm("Are you sure you want to end this request?")) {
      return;
    }

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/request/updateRequest1/${requestId}`,
        {endDateTime: endTime,
          driverStatus: "finish",
          approveStatus:"driverFinished"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message || "Request end successfully");
      fetchRequests();
      // You can refresh data here if needed, e.g., refetch requests list
    } catch (error) {
      console.error("Failed to end request:", error);
      alert(error.response?.data?.message || "Failed to end request");
    }
  };





  return (
    <React.Fragment>
      {/* Main Row */}
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{request.date}</TableCell>
        <TableCell>
          {request.depatureLocation} to {request.destination}
        </TableCell>
        <TableCell>
          <label
            className={`historyLabel ${
              request.driverStatus === "start"
                ? "running"
                : request.driverStatus === "end"
                ? "feedback"
                : request.driverStatus === "notStart"
                ? "pending"
                : request.driverStatus === "approved"
                ? "approved"
                : request.driverStatus === "reject"
                ? "reject"
                : ""
            }`}
          >
            {request.driverStatus === "start"
              ? "Running"
              : request.driverStatus === "end"
              ? "Completed"
              : request.driverStatus === "notStart"
              ? "Pending"
              : request.driverStatus === "approved"
              ? "Approved"
              : request.driverStatus === "reject"
              ? "Reject"
              : ""}
          </label>
        </TableCell>
      </TableRow>

      {/* Collapsible Details Row */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <TableCell>
                {" "}
                <Typography variant="h6" gutterBottom component="div">
                  Approval Steps
                </Typography>
              </TableCell>

              {/* <TableCell>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleCancel(request._id)}
                  disabled={request.driverStatus !== "notStart"}
                >
                  Delete
                </Button>
              </TableCell> */}
              <Table size="small" aria-label="vehicle details">
                <TableHead>
                  <TableRow>
                    <TableCell>Head Approval</TableCell>
                    <TableCell>Assign Driver</TableCell>
                    <TableCell>Ar Approval</TableCell>
                    <TableCell>Dean Approval</TableCell>
                    <TableCell>
                      Trip Started{" "}
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleStart(request._id)}
                        disabled={request.driverStatus !== "approved"}
                      >
                        Start
                      </Button>
                    </TableCell>
                    <TableCell>
                      Trip Ended{" "}
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleEnd(request._id)}
                        disabled={request.driverStatus !== "started"}
                      >
                        End
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {request.approveStatus === "headApproved" ||
                      request.approveStatus === "arApproved" ||
                      request.approveStatus === "driverAssigned" ||
                      request.approveStatus === "deanApproved" ||
                      request.approveStatus === "driverStarted" ||
                      request.approveStatus === "driverFinished" ? (
                        <CheckCircleIcon sx={{ color: green[500] }} />
                      ) : (
                        <ErrorIcon color="disabled" />
                      )}
                    </TableCell>
                    <TableCell>
                      {request.approveStatus === "driverAssigned" ||
                      request.approveStatus === "arApproved" ||
                      request.approveStatus === "deanApproved" ||
                      request.approveStatus === "driverStarted" ||
                      request.approveStatus === "driverFinished" ? (
                        <CheckCircleIcon sx={{ color: green[500] }} />
                      ) : (
                        <ErrorIcon color="disabled" />
                      )}
                    </TableCell>
                    <TableCell>
                      {" "}
                      {request.approveStatus === "arApproved" ||
                      request.approveStatus === "deanApproved" ||
                      request.approveStatus === "driverStarted" ||
                      request.approveStatus === "driverFinished" ? (
                        <CheckCircleIcon sx={{ color: green[500] }} />
                      ) : (
                        <ErrorIcon color="disabled" />
                      )}
                    </TableCell>
                    <TableCell>
                      {" "}
                      {request.approveStatus === "deanApproved" ||
                      request.approveStatus === "driverStarted" ||
                      request.approveStatus === "driverFinished" ? (
                        <CheckCircleIcon sx={{ color: green[500] }} />
                      ) : (
                        <ErrorIcon color="disabled" />
                      )}
                    </TableCell>
                    <TableCell>
                      {" "}
                      {request.approveStatus === "driverStarted" ||
                      request.approveStatus === "driverFinished" ? (
                        <CheckCircleIcon sx={{ color: green[500] }} />
                      ) : (
                        <ErrorIcon color="disabled" />
                      )}
                    </TableCell>
                    <TableCell>
                      {" "}
                      {request.approveStatus === "driverFinished" ? (
                        <CheckCircleIcon sx={{ color: green[500] }} />
                      ) : (
                        <ErrorIcon color="disabled" />
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
