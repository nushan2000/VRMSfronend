import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Css/VehicelDetails/VehicleList.css'; // Import CSS file for styling
import VehicleaAdd from './VehicleaAdd';
import VehicleUpdate from './VehicleUpdate';
import QrCodeComponent from '../QrCodeComponent';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { Checkbox, FormControlLabel } from '@mui/material';

const VehicleList = () => {
  const token = localStorage.getItem("token"); 
  const [vehicles, setVehicles] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false); // State to manage QR code popup visibility
  const [selectedVehicleNo, setSelectedVehicleNo] = useState(""); // State to store selected vehicle number for QR code

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/vehicle/vehicles`,{
        headers: {
          Authorization: `Bearer ${token}`
          
        },
      });
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/vehicle/vehiclesdelete/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`
          
        },
      });
      setVehicles(vehicles.filter(vehicle => vehicle._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    fetchVehicles(true);
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const openUpdateModal = vehicle => {
    setSelectedVehicle(vehicle);
    setShowUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
    fetchVehicles(true);
  };

  const openQrModal = vehicleNo => {
    setSelectedVehicleNo(vehicleNo);
    setShowQrModal(true);
  };

  const closeQrModal = () => {
    setShowQrModal(false);
  };
  const [checked, setChecked] = useState({});

  const handleCheckboxChange = (vehicleNo) => {
    setChecked((prev) => ({
      ...prev,
      [vehicleNo]: !prev[vehicleNo]
    }));
    if (!checked[vehicleNo]) {
      openQrModal(vehicleNo);
    } else{
      closeQrModal();
    }
  };
  return (
    <div className="vehicle-list-container">
    <Typography variant="h4" gutterBottom>
      Vehicle List
    </Typography>
    <Button variant="contained" color="primary" onClick={openAddModal}>
      Add Vehicle
    </Button>
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Vehicle No</TableCell>
            <TableCell>Vehicle Type</TableCell>
            <TableCell>Seat Capacity</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Driver Name</TableCell>
            <TableCell>Driver Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicles.map((vehicle) => (
            <TableRow key={vehicle._id}>
              <TableCell>
                {vehicle.vehicleImg === "" || vehicle.vehicleImg === null ? "" : 
                  <img className='vehicleDe' src={`data:image/png;base64,${vehicle.vehicleImg}`} alt="Vehicle" style={{ width: 50, height: 50 }} />
                }
              </TableCell>
              <TableCell>{vehicle.vehicleNo}</TableCell>
              <TableCell>{vehicle.vehicleType}</TableCell>
              <TableCell>{vehicle.sheatCapacity}</TableCell>
              <TableCell>{vehicle.status}</TableCell>
              <TableCell>{vehicle.driverName}</TableCell>
              <TableCell>{vehicle.driverEmail}</TableCell>
              <TableCell>
                <Button variant="outlined" color="primary" onClick={() => openUpdateModal(vehicle)} sx={{ mr: 1 }}>
                  Fuck
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => handleDelete(vehicle._id)} sx={{ mr: 1 }}>
                  Delete
                </Button>
                <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked[vehicle.vehicleNo] || false}
                        onChange={() => handleCheckboxChange(vehicle.vehicleNo)}
                      />
                    }
                    label="Show QR"
                  />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {showAddModal && <VehicleaAdd onClose={closeAddModal} />}
    {showUpdateModal && <VehicleUpdate vehicle={selectedVehicle} onClose={closeUpdateModal} />}
    {showQrModal && <QrCodeComponent vehicleNumber={selectedVehicleNo} onClose={closeQrModal} />}
  </div>
  );
};

export default VehicleList;