import React, { useState, useEffect } from 'react';
import '../Css/ReservationDash.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useReservation } from '../context/ReservationContext';

export default function ReservationDash({updateTrigger}) {
    const [requests, setRequest] = useState([]);
    const { setSelectedRequest } = useReservation();
    useEffect(() => {
        // Fetch customer data from the backend  
        fetchReserDetail();
    },[updateTrigger]);

    async function fetchReserDetail() {
        try {
            
            // Retrieve the user information from the cookie
            const userInfoFromCookie = Cookies.get('userInfo');
            ////console.log(userInfoFromCookie);
            
            // Parse the user information if available
            const parsedUserInfo = userInfoFromCookie ? JSON.parse(userInfoFromCookie) : null;
            // Extract the user's email from the parsed user information
            const userEmail = parsedUserInfo ? parsedUserInfo.email : null;
    
            // If the user's email is available, extract the domain
            const loggedInUserDomain = userEmail ? userEmail.split('@')[1] : null;
            //console.log("logged",loggedInUserDomain);
            
    
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/request/requests`);
            //console.log("response",response.data);
            
            const filteredRequests = response.data.filter(request => {
                // Extract the domain from the applier's email address
                const applierDomain = request.applier.split('@')[1];
                //console.log("applierDomain",applierDomain);

                
                // Check if the applier's domain matches the logged-in user's domain
                return applierDomain === loggedInUserDomain;
            }).filter(request => !request.approveHead&&request.driverStatus!=="reject");
            //console.log("filter data",filteredRequests);
            // Sort the filteredRequests array by applyDate in descending order
            filteredRequests.sort((a, b) => new Date(b.applyDate) - new Date(a.applyDate));
    
    
            setRequest(filteredRequests);
        } catch (error) {
            //console.error(error);
        }
    }

    function handleItemClick(request) {
        setSelectedRequest(request);
    }

    function getFormattedDate(applyDate) {
        //console.log('applyDate:', applyDate); // Log applyDate value
  
        const dateObject = new Date(applyDate); // Convert applyDate to a Date object
  
        if (!dateObject || isNaN(dateObject.getTime())) {
            //console.log('applyDate is not a valid Date object');
            return 'Invalid date'; // Handle case where applyDate is not a valid Date object
        }
        

        const now = new Date();
        
        if (isNaN(now.getTime())) {
            //console.log('Current date is invalid');
            return 'Current date not available'; // Handle case where current date is invalid
        }
  
        const diffInMs = now - dateObject;
        //console.log('diffInMs:', diffInMs); // Log difference in milliseconds
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        //console.log('diffInDays:', diffInDays); // Log difference in days
        return `${diffInDays} days ago`;
    }

    return (
        <div className="container-fluid">
            <div className="row min-vh-100">
                <div className="col-lg-3 col-md-4 col-12">
                    <h1>Reservations</h1>
                    <div className="list-group" id="list-tab" role="tablist">
                        <ul className='requestdash'>
                            {requests.map(request => (
                                <li key={request._id} className={request.isNew ? 'list-item-new' : 'list-item'}>
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
