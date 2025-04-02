import React, { useState, useEffect } from 'react';
import '../Css/ReservationDash.css';
import axios from 'axios';
import { useReservation } from '../context/ReservationContext';


export default function ReservationDash({updateTrigger}) {
    const [requests, setRequest] = useState([]);
    const token = localStorage.getItem("token"); 
    const { setSelectedRequest } = useReservation();
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
      console.log('diffInDays:', diffInDays); // Log difference in days
      return `${diffInDays} days ago`;
  }
  
  
    return (
        <div>
            <div className="row">
                <div className="col-4">
                    <h1>Reservations</h1>
                    <div className="list-group" id="list-tab" role="tablist">
                        <ul className='requestdash'>
                            {requests.map(request => (
                                <li key={request._id}>
                                    <a className="list-group-item list-group-item-action" id="list-settings-list" data-bs-toggle="list" href="#list-settings" role="tab" aria-controls="list-settings" onClick={() => handleItemClick(request)}>
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">{request.applier}</h5>
                                            <small className="text-body-secondary">{console.log('applyDate:', request.applyDate) || getFormattedDate(request.applyDate)}</small>

                                        </div>
                                        <p className="mb-1">{request.reason}</p>
                                        <small className="text-body-secondary">To: {request.destination} | Date: {request.date}</small>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
