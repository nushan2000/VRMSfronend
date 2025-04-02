import React, { useState, useEffect } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AddUserForm from "./UserDetails/AddUserForm";
import UpdateUserForm from "./UserDetails/UpdateUserForm";
import {
  Container,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { Checkbox, FormControlLabel } from "@mui/material";
import VehicleUpdate from "./VehicleAdd/VehicleUpdate";
import QrCodeComponent from "./QrCodeComponent";

import VehicleaAdd from "./VehicleAdd/VehicleaAdd";
function OperatorPage() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchVehicles();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/user/usersdelete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const openAddModal = () => {
    console.log("Opening Add User modal");
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    fetchUsers(true);
  };

  const openUpdateModal = (user) => {
    setSelectedUser(user);
    setShowUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
    fetchUsers(true);
  };

  const [vehicles, setVehicles] = useState([]);

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false); // State to manage QR code popup visibility
  const [selectedVehicleNo, setSelectedVehicleNo] = useState("");

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/vehicle/vehicles`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setVehicles(response.data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/vehicle/vehiclesdelete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setVehicles(vehicles.filter((vehicle) => vehicle._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  //   const closeAddModal = () => {
  //     setShowAddModal(false);
  //     fetchVehicles(true);
  //   };

  //   const openAddModal = () => {
  //     setShowAddModal(true);
  //   };

  //   const openUpdateModal = vehicle => {
  //     setSelectedVehicle(vehicle);
  //     setShowUpdateModal(true);
  //   };

  //   const closeUpdateModal = () => {
  //     setShowUpdateModal(false);
  //     fetchVehicles(true);
  //   };

  const openQrModal = (vehicleNo) => {
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
      [vehicleNo]: !prev[vehicleNo],
    }));
    if (!checked[vehicleNo]) {
      openQrModal(vehicleNo);
    } else {
      closeQrModal();
    }
  };
  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/request/importUsers`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        alert(response.data.message);
    } catch (error) {
        console.error('Error uploading file:', error);
        alert(error.response?.data?.message || 'Failed to upload file');
    }
};
  return (
    <div>
     
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // Makes sure it's centered vertically
          textAlign: "center",
        }}
      >
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="User" value="1" />
              <Tab label="Vehicle" value="2" />
              <Tab label="Item Three" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
          <input type="file" onChange={(e) => handleFileUpload(e.target.files[0])} />
            <Container>
              <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Typography variant="h4">User List</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={openAddModal}
                  >
                    Add User
                  </Button>
                </Box>

                <Table sx={{ minWidth: 650 }} aria-label="user table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>Name</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Email</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Department</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Designation</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Actions</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell>
                          {user.fristName} {user.lastName}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>{user.designation}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="primary"
                            sx={{ mr: 1 }}
                            onClick={() => openUpdateModal(user)}
                          >
                            Update
                          </Button>
                          <Button
                            sx={{ mr: 1 }}
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleDeleteUser(user._id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {showAddModal && <AddUserForm onClose={closeAddModal} />}
                {showUpdateModal && (
                  <UpdateUserForm
                    user={selectedUser}
                    onClose={closeUpdateModal}
                  />
                )}
              </Paper>
            </Container>
          </TabPanel>

          <TabPanel value="2">
            {" "}
            <div className="vehicle-list-container">
              <Typography variant="h4" gutterBottom>
                Vehicle List
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={openAddModal}
              >
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
                          {vehicle.vehicleImg === "" ||
                          vehicle.vehicleImg === null ? (
                            ""
                          ) : (
                            <img
                              className="vehicleDe"
                              src={`data:image/png;base64,${vehicle.vehicleImg}`}
                              alt="Vehicle"
                              style={{ width: 50, height: 50 }}
                            />
                          )}
                        </TableCell>
                        <TableCell>{vehicle.vehicleNo}</TableCell>
                        <TableCell>{vehicle.vehicleType}</TableCell>
                        <TableCell>{vehicle.sheatCapacity}</TableCell>
                        <TableCell>{vehicle.status}</TableCell>
                        <TableCell>{vehicle.driverName}</TableCell>
                        <TableCell>{vehicle.driverEmail}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => openUpdateModal(vehicle)}
                            sx={{ mr: 1 }}
                          >
                            Update
                          </Button>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleDelete(vehicle._id)}
                            sx={{ mr: 1 }}
                          >
                            Delete
                          </Button>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checked[vehicle.vehicleNo] || false}
                                onChange={() =>
                                  handleCheckboxChange(vehicle.vehicleNo)
                                }
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
              {showUpdateModal && (
                <VehicleUpdate
                  vehicle={selectedVehicle}
                  onClose={closeUpdateModal}
                />
              )}
              {showQrModal && (
                <QrCodeComponent
                  vehicleNumber={selectedVehicleNo}
                  onClose={closeQrModal}
                />
              )}
            </div>
          </TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default OperatorPage;
