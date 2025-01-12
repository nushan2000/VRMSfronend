import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddCostDetails from './AddCostDetails';
import CostUpdate from './CostUpdate';
import '../../Css/VehicelDetails/VehicleList.css';
const CostList = () => {
  const [costDetails, setCostDetails] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCost, setSelectedCost] = useState(null);
  useEffect(() => {
    fetchCostDetails();
  }, []);

  const fetchCostDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/costDetails`);
      setCostDetails(response.data);
    } catch (error) {
      console.error('Error fetching cost details:', error);
    }
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/costDetails/costdelete/${id}`);
      setCostDetails(costDetails.filter(cost => cost._id !== id));
    } catch (err) {
      console.error(err);
    }
  };
  const closeAddModal = () => {
    setShowAddModal(false);
    fetchCostDetails(true);
  };
  const openAddModal = () => {
    console.log('Opening Add User modal');
    setShowAddModal(true);

  };
  const openUpdateModal = vehicle => {
    setSelectedCost(vehicle);
    setShowUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
    fetchCostDetails(true);
  };
  return (
    <div className="vehicle-details-list-container">
      <h1>Cost Details List</h1>
      <button className="add-button" onClick={openAddModal}>Add Cost Details</button>
      <table className="vehicle-details-table">
        <thead>
          <tr>
            
            <th>Vehicle Number</th>
            <th>Fuel Consumption</th>
            <th>Fuel Price</th>
            <th>Service Charge</th>
            <th>Tire Price</th>
            <th>Driver Salary</th>
            
            
          </tr>
        </thead>
        <tbody>
          {costDetails.map(cost => (
            <tr key={cost._id}>
              <td>{cost.fuelConsumption}</td>
              <td>{cost.vehicleNo}</td>
              <td>{cost.fuelPrice}</td>
              <td>{cost.serviceCharge}</td>
              <td>{cost.tirePrice}</td>
              <td>{cost.driverSalary}</td>
              
              <td>
              <button className="update-button" onClick={() => openUpdateModal(cost)}>Update</button>
                <button className="delete-button" onClick={() => handleDelete(cost._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAddModal && <AddCostDetails onClose={closeAddModal}  />} 
      {showUpdateModal && <CostUpdate costDetail={selectedCost} onClose={closeUpdateModal} />}
   
    </div>
  );
};

export default CostList;
