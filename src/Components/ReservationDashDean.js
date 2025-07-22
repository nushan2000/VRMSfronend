import React, { useState, useEffect } from 'react';
import '../Css/ReservationDash.css';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function ReservationDashDean() {
    const [requests, setRequest] = useState([]);

    useEffect(() => {
        fetchReserDetail();
    }, []);

    async function fetchReserDetail() {
        try {
            const userInfoFromCookie = Cookies.get('userInfo');
            const parsedUserInfo = userInfoFromCookie ? JSON.parse(userInfoFromCookie) : null;
            const userEmail = parsedUserInfo ? parsedUserInfo.email : null;

            const response = await axios.get(`${process.env.REACT_APP_API_URL}/request/requests`);
            const filteredRequests = response.data.filter(request => {
                // Include the condition for distance greater than 7
                return request.distance > 7 && !request.approveDeenAr && request.approveHead;
            });

            // Sort the filteredRequests array by applyDate in descending order
            filteredRequests.sort((a, b) => new Date(b.applyDate) - new Date(a.applyDate));

            setRequest(filteredRequests);
        } catch (error) {
            console.error(error);
        }
    }

    function handleItemClick(request) {
        localStorage.setItem('selectedRequest', JSON.stringify(request));
        document.dispatchEvent(new Event('forceUpdateHead'));
    }

    function getFormattedDate(applyDate) {
        const dateObject = new Date(applyDate);
        if (!dateObject || isNaN(dateObject.getTime())) {
            return 'Invalid date';
        }

        const now = new Date();
        if (isNaN(now.getTime())) {
            return 'Current date not available';
        }

        const diffInMs = now - dateObject;
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
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
                                            <small className="text-body-secondary">{getFormattedDate(request.applyDate)}</small>
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
