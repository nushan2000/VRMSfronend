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

export default function HistryPage() {
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

  // const handleExpandButtonClick = async (requestId) => {
  //   // Toggle the expanded section if the same request is clicked again
  //   if (expandedRequestId === requestId) {
  //     setExpandedRequestId(null);
  //     return;
  //   }

  //   setLoading(true); // Start loading
  //   setExpandedRequestId(requestId); // Expand the section and show loading

  //   const selectedRequest = requests.find(request => request._id === requestId);
  //   // Log the selected request
  //   console.log("Selected Request:", selectedRequest.vehicle);

  //   try {
  //     // Fetch vehicle data for the selected vehicle name
  //     const vehicleResponse = await axios.get(`${process.env.REACT_APP_API_URL}/vehicle/vehicles`,{
  //             headers: {
  //               Authorization: `Bearer ${token}`

  //             },
  //           }).then(() => {
  //             toast.success('This is a success message!');
  //           }).catch(()=>{
  //             toast.error('This is an error message!');
  //           });
  //     const vehicle = vehicleResponse.data.find(v => v.vehicleName === selectedRequest.vehicle);

  //     if (vehicle) {
  //       console.log("Vehicle data fetched:", vehicle.vehicleNo);
  //       const costResponse = await axios.get(`${process.env.REACT_APP_API_URL}/costDetails/`,{
  //               headers: {
  //                 Authorization: `Bearer ${token}`

  //               },
  //             });
  //       const cost = costResponse.data.find(v => v.vehicleNo === vehicle.vehicleNo);
  //       console.log("Cost data fuelPrice:", cost.fuelPrice);
  //       console.log("Cost data serviceCharge :", cost.serviceCharge);
  //       console.log("Cost data fuelConsumption:", cost.fuelConsumption);
  //       console.log("Cost data tirePrice:", cost.tirePrice);
  //       const totalCost = (cost.serviceCharge / 5000 + cost.fuelPrice / cost.fuelConsumption + cost.tirePrice / 20000) * selectedRequest.distance;
  //       console.log("Total Cost:", totalCost);
  //       const formattedTotalCost = totalCost.toFixed(2); // Format to two decimal places
  //       setCosts({ ...costs, [requestId]: formattedTotalCost });
  //       const totalCo2 = cost.co2Emmission * selectedRequest.distance;
  //       setCo2({ ...co2, [requestId]: totalCo2 });
  //     } else {
  //       console.log("Vehicle not found");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching vehicle data:", error);
  //   } finally {
  //     setLoading(false); // Stop loading
  //   }
  // };

  return (
    <body>
      <div className="row">
        <div className="columleft">
          <Dashboard />
        </div>

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
                      .filter((request) => request.applier === userEmail)
                      .map((request) => (
                        <Row
                          key={request._id}
                          request={request}
                          fetchRequests={fetchRequests}
                        />
                      ))}
                  </TableBody>
                </Table>

                {/* {expandedRequestId === request._id &&
                        (loading ? (
                          <div className="loading">Loading...</div> // Loading indicator
                        ) : (
                          <div className="expanded-request">
                            <div className="rowticket">
                              <div className="columnticket1">
                                <div>
                                  <label htmlFor="cost">
                                    <h1 className="cost">Approximate Cost:</h1>
                                  </label>
                                  <h1 className="value">
                                    Rs.{costs[request._id]}
                                  </h1>
                                </div>
                                <div>
                                  <label htmlFor="cost">
                                    <h1 className="cost">CO2 Emission:</h1>
                                  </label>{" "}
                                  <h1 className="value">{co2[request._id]}g</h1>
                                </div>
                              </div>
                              <div className="columnticket2">
                                <table className=".table-borderless">
                                  <tbody className="cost">
                                    <tr>
                                      <td>
                                        <div>
                                          <label htmlFor="comeBack">
                                            Come Back:
                                          </label>{" "}
                                        </div>
                                      </td>
                                      <td>
                                        <div>
                                          {request.comeBack ? "Yes" : "No"}
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div>
                                          <label htmlFor="reason">
                                            Reason:
                                          </label>{" "}
                                        </div>
                                      </td>
                                      <td>
                                        <div>{request.reason}</div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div>
                                          <label htmlFor="distance">
                                            Distance:
                                          </label>{" "}
                                        </div>
                                      </td>
                                      <td>
                                        <div> {request.distance} km </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <label htmlFor="date">Date:</label>
                                      </td>
                                      <td> {request.date}</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div>
                                          <label htmlFor="Time">Time:</label>{" "}
                                        </div>
                                      </td>
                                      <td>
                                        {" "}
                                        {request.startTime} to {request.endTime}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div>
                                          <label htmlFor="Vehcle">
                                            Vehicle:
                                          </label>{" "}
                                        </div>
                                      </td>
                                      <td>{request.vehicle}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        ))} */}
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

              <TableCell>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleCancel(request._id)}
                  disabled={request.driverStatus !== "notStart"}
                >
                  Delete
                </Button>
              </TableCell>
              <Table size="small" aria-label="vehicle details">
                <TableHead>
                  <TableRow>
                    <TableCell>Head Approval</TableCell>
                    <TableCell>Assign Driver</TableCell>
                    <TableCell>Ar Approval</TableCell>
                    <TableCell>Dean Approval</TableCell>
                    <TableCell>Trip Started</TableCell>
                    <TableCell>Trip Ended</TableCell>
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
