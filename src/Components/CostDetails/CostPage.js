import React, { useState, useEffect } from "react";
import axios from "axios";

const CostPage = () => {
  const [vehicleNumbers, setVehicleNumbers] = useState([]);
  const [selectedVehicleNumber, setSelectedVehicleNumber] = useState("");
  const [costDetails, setCostDetails] = useState(null);

  useEffect(() => {
    // Fetch vehicle numbers from the server when the component mounts
    const fetchVehicleNumbers = async () => {
      try {
        const response = await axios.get("YOUR_API_URL_TO_FETCH_VEHICLE_NUMBERS");
        setVehicleNumbers(response.data);
      } catch (error) {
        console.error("Error fetching vehicle numbers:", error);
      }
    };

    fetchVehicleNumbers();
  }, []);

  const handleVehicleNumberChange = async (event) => {
    const selectedNumber = event.target.value;
    setSelectedVehicleNumber(selectedNumber);

    try {
      const response = await axios.get(`YOUR_API_URL_TO_FETCH_COST_DETAILS/${selectedNumber}`);
      setCostDetails(response.data);
    } catch (error) {
      console.error("Error fetching cost details:", error);
    }
  };

  return (
    <div>
      <h2>Cost Details</h2>
      <div>
        <label htmlFor="vehicleNumber">Select Vehicle Number:</label>
        <select id="vehicleNumber" value={selectedVehicleNumber} onChange={handleVehicleNumberChange}>
          <option value="">Select</option>
          {vehicleNumbers.map((vehicleNumber) => (
            <option key={vehicleNumber} value={vehicleNumber}>
              {vehicleNumber}
            </option>
          ))}
        </select>
      </div>
      {costDetails && (
        <div>
          <h3>Cost Details for Vehicle Number: {selectedVehicleNumber}</h3>
          <p>Fuel Consumption: {costDetails.fuelConsumption}</p>
          <p>Driver Name: {costDetails.driverName}</p>
          <p>Distance: {costDetails.distance}</p>
          <p>Fuel Price: {costDetails.fuelPrice}</p>
          <p>Service Charge: {costDetails.serviceCharge}</p>
          <p>Tire Price: {costDetails.tirePrice}</p>
          <p>Driver Salary: {costDetails.driverSalary}</p>
          <p>Total Cost: {costDetails.totalCost}</p>
        </div>
      )}
    </div>
  );
};

export default CostPage;
