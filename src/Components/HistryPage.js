import Dashboard from './Dashboard';
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Css/HistryPageStyle.css";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

export default function HistryPage() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [expandedRequestId, setExpandedRequestId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [costs, setCosts] = useState({});
  const [co2, setCo2] = useState({});
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    // Retrieve user data from cookie
    const userInfoFromCookie = Cookies.get('userInfo');

    // If user data exists in the cookie, parse it and set the state
    if (userInfoFromCookie) {
      const parsedUserInfo = JSON.parse(userInfoFromCookie);
      const { email } = parsedUserInfo; // Extract name from user data
      setUserEmail(email);
    }
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:8080/request/requests");
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleButtonClick = (request) => {
    switch (request.driverStatus) {
      case "start":
        // Navigate to location page
        window.location.href = '/location-tracker';
        break;
      case "finish":
        // Navigate to feedback page
        window.location.href = '/user/feedback';
        break;
      default:
        // Navigate to approved page
        window.location.href = '/approvedPage';
        break;
    }
  };

  const handleExpandButtonClick = async (requestId) => {
    // Toggle the expanded section if the same request is clicked again
    if (expandedRequestId === requestId) {
      setExpandedRequestId(null);
      return;
    }

    setLoading(true); // Start loading
    setExpandedRequestId(requestId); // Expand the section and show loading

    const selectedRequest = requests.find(request => request._id === requestId);
    // Log the selected request
    console.log("Selected Request:", selectedRequest.vehicle);

    try {
      // Fetch vehicle data for the selected vehicle name
      const vehicleResponse = await axios.get("http://localhost:8080/vehicle/vehicles");
      const vehicle = vehicleResponse.data.find(v => v.vehicleName === selectedRequest.vehicle);

      if (vehicle) {
        console.log("Vehicle data fetched:", vehicle.vehicleNo);
        const costResponse = await axios.get("http://localhost:8080/costDetails/");
        const cost = costResponse.data.find(v => v.vehicleNo === vehicle.vehicleNo);
        console.log("Cost data fuelPrice:", cost.fuelPrice);
        console.log("Cost data serviceCharge :", cost.serviceCharge);
        console.log("Cost data fuelConsumption:", cost.fuelConsumption);
        console.log("Cost data tirePrice:", cost.tirePrice);
        const totalCost = (cost.serviceCharge / 5000 + cost.fuelPrice / cost.fuelConsumption + cost.tirePrice / 20000) * selectedRequest.distance;
        console.log("Total Cost:", totalCost);
        const formattedTotalCost = totalCost.toFixed(2); // Format to two decimal places
        setCosts({ ...costs, [requestId]: formattedTotalCost });
        const totalCo2 = cost.co2Emmission * selectedRequest.distance;
        setCo2({ ...co2, [requestId]: totalCo2 });
      } else {
        console.log("Vehicle not found");
      }
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <body>
      <div className="row">
        <div className="columleft">
          <Dashboard />
        </div>

        <div className="columnHistory">
          <h1>History</h1>
          <div className="historyList ">
            {requests.map(request => (
              request.applier === userEmail && (
                <div className="historydetails" key={request._id}>
                  <div className="request-row">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", height: "100%" }}>
                      <div> {request.date}</div>
                      <div>{request.depatureLocation} to {request.destination}</div>
                      <div>
                        <button className='historyBtn' onClick={() => handleButtonClick(request)}>
                          {request.driverStatus === "start" ? "Running" :
                            request.driverStatus === "finish" ? "Feedback" :
                              request.driverStatus === "notStart" ? "Pending" :
                                request.driverStatus === "approved" ? "Approved" :
                                  request.approveDeenAr === "false" ? "Reject" : ""}
                        </button>
                        {(request.driverStatus !== "notStart" && request.driverStatus !== "start" && request.driverStatus !== "approved" && request.driverStatus !== "false") && (
                          <button className='historyBtn' onClick={() => handleExpandButtonClick(request._id)}>More</button>
                        )}
                      </div>
                    </div>
                    {expandedRequestId === request._id && (
                      loading ? (
                        <div className="loading">Loading...</div> // Loading indicator
                      ) : (
                        <div className="expanded-request">
                          <div className='rowticket'>
                            <div className='columnticket1'>
                              <div>
                                <label htmlFor="cost">
                                  <h1 className='cost'>Approximate Cost:</h1>
                                </label>
                                <h1 className='value'>Rs.{costs[request._id]}</h1>
                              </div>
                              <div><label htmlFor="cost"><h1 className='cost'>CO2 Emission:</h1></label> <h1 className='value'>{co2[request._id]}g</h1></div>
                            </div>
                            <div className='columnticket2'>
                              <table className=".table-borderless">
                                <tbody className='cost'>
                                  <tr>
                                    <td><div><label htmlFor="comeBack">Come Back:</label> </div></td>
                                    <td><div>{request.comeBack ? "Yes" : "No"}</div></td>
                                  </tr>
                                  <tr>
                                    <td><div><label htmlFor="reason">Reason:</label> </div></td>
                                    <td><div>{request.reason}</div></td>
                                  </tr>
                                  <tr>
                                    <td><div><label htmlFor="distance">Distance:</label> </div></td>
                                    <td><div> {request.distance} km </div></td>
                                  </tr>
                                  <tr>
                                    <td><label htmlFor="date">Date:</label></td>
                                    <td> {request.date}</td>
                                  </tr>
                                  <tr>
                                    <td><div><label htmlFor="Time">Time:</label> </div></td>
                                    <td> {request.startTime} to {request.endTime}</td>
                                  </tr>
                                  <tr>
                                    <td><div><label htmlFor="Vehcle">Vehicle:</label> </div></td>
                                    <td>{request.vehicle}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </body>
  );
}
