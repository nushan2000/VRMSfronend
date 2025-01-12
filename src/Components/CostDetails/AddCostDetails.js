import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddCostDetails = () => {
  const [formData, setFormData] = useState({
    fuelConsumption: '',
    vehicleNo: '',
    driverName: '',
    co2Emmission: '',
    fuelPrice: '',
    serviceCharge: '',
    tirePrice: '',
    driverSalary: '',
    
  });

  const [vehicleNumbers, setVehicleNumbers] = useState([]);

  useEffect(() => {
    const fetchVehicleNumbers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/vehicle/vehicles`);
        setVehicleNumbers(response.data.map(vehicle => vehicle.vehicleNo)); // Assuming vehicleNo is the property name
      } catch (error) {
        console.error('Error fetching vehicle numbers:', error);
      }
    };
  
    fetchVehicleNumbers();
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/costDetails/add`, formData);
      console.log('Cost details added:', response.data);
      // Redirect to another page or show a success message
    } catch (error) {
      console.error('Error adding cost details:', error);
      // Handle error: display error message or log it
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add Cost Details</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.formGroup}>
          <label style={styles.label}>Vehicle Number:</label>
          <select name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} style={styles.input}>
            <option value="">Select Vehicle Number</option>
            {vehicleNumbers.map((vehicleNumber) => (
              <option key={vehicleNumber} value={vehicleNumber}>{vehicleNumber}</option>
            ))}
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Fuel Consumption:</label>
          <input type="number" name="fuelConsumption" value={formData.fuelConsumption} onChange={handleChange} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Fuel Price:</label>
          <input type="number" name="fuelPrice" value={formData.fuelPrice} onChange={handleChange} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Service Charge:</label>
          <input type="number" name="serviceCharge" value={formData.serviceCharge} onChange={handleChange} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Tire Price:</label>
          <input type="number" name="tirePrice" value={formData.tirePrice} onChange={handleChange} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Co2 Emmission:</label>
          <input type="number" name="co2Emmission" value={formData.co2Emmission} onChange={handleChange} style={styles.input} />
        </div>
       
        {/* Add other input fields for the rest of the cost details */}
        <button type="submit" style={styles.button}>Add Cost Details</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    margin: '20px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    marginBottom: '5px',
    fontSize: '16px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default AddCostDetails;
