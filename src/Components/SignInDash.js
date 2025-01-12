import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VehicleDetails from './vehiDetails'; // Assuming this is the correct import for your VehicleDetails component
import '../Css/PopupDash.css';

export default function SignInDash() {
    const [vehicles, setItems] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [showPopup, setShowPopUp] = useState(false);

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };
    useEffect(() => {
        fetchVehiDetail();
    }, []);

    async function fetchVehiDetail() {
        try {
            const response = await axios.get('http://localhost:8080/vehicle/vehicles');
            setItems(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleLabelClick = (vehicle) => {
        setSelectedVehicle(vehicle);
        setShowPopUp(true);
    };

   

    return (
        <div>
            <ol className="Dashboard">
                <h1>Today Available</h1>
                {vehicles.map((vehicle) => (
                    <li key={vehicle._id}>
                        <label
                            className="form-label sidetails"
                            style={vehicle.availability === "yes" ? { backgroundColor: '#E8F5E9' } : { backgroundColor: '#FFEBEE' }}
                            onClick={() => handleLabelClick(vehicle)}>
                            <div className="rowbutton" >
                                <div className="columnbuttonleft ">
                                    <div>
                                        {vehicle.vehicleImg === "" || vehicle.vehicleImg === null ? "" : <img className='vehiclebutton' src={`data:image/png;base64,${vehicle.vehicleImg}`} alt="Vehicle" />}
                                    </div>
                                </div>
                                <div className="columnbuttonright ">
                                    <p>
                                        <span className="tabbed-text">Available:</span>
                                        {vehicle.availability === "yes" ? (
                                            <img src={require('../Images/yes1.png')} alt="Yes" style={{ color: 'green', width: '24px', height: '24px' }} />
                                        ) : (
                                            <img src={require('../Images/no4.png')} alt="No" style={{ width: '24px', height: '24px' }} />
                                        )} <br />
                                        <span className="tabbed-text">Available seats:</span>{vehicle.avilableSheat} <br />
                                        <span className="tabbed-text">Status:</span>{vehicle.status}
                                    </p>
                                </div>
                            </div>
                        </label>
                    </li>
                ))}
            </ol>
            {showPopup && <VehicleDetails vehicle={selectedVehicle} onClose={handleClosePopUp} />}
        </div>
    );
}
