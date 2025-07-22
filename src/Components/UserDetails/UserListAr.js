// UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddUserFormAr from './AddUserFormAr';
import UpdateUserForm from './UpdateUserForm';
import '../../Css/UserDetails/UserForm.css'; // Import CSS file for styling

const UserList = () => {
  const token = localStorage.getItem("token"); 
  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/users`,{
        headers: {
          Authorization: `Bearer ${token}`
          
        },
      });
      setUsers(response.data.filter(user => user.designation === 'user')); // Filter users with designation 'user'
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/user/usersdelete/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`
          
        },
      });
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      console.error(err);
    }
  };
  
  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    fetchUsers(true);
  };

  const openUpdateModal = user => {
    setSelectedUser(user);
    setShowUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
    fetchUsers(true);
  };

  return (
    <div className="user-list-container">
      <h1>User List</h1>
      <button className="add-button" onClick={openAddModal}>Add User</button>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.fristName} {user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.department}</td>
              <td>{user.designation}</td>
              <td>
                <button className="update-button" onClick={() => openUpdateModal(user)}>Update</button>
                <button className="delete-button" onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAddModal && <AddUserFormAr onClose={closeAddModal}  />} 
      {showUpdateModal && <UpdateUserForm user={selectedUser} onClose={closeUpdateModal} />}
    </div>
  );
};

export default UserList;
