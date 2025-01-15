import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import './App.css';

import NavBar from './Components/NavBar';
import OtherUserPage from './Components/OtherUserPage';
import CalendarGfg from './Components/Calander';
import Signin from './Components/SignInPage';
import Dean from './Components/DeanePage';
import ArPage from './Components/ArPage';
import Head from './Components/DepartmentHeadPage';
import Footer from './Components/Footer';
import RequestForm from './Components/VehicleRequestPage';
import VehiDetailPage from './Components/VehicleDetailsPage';
import ReservationDash from './Components/ReservationDash';
import AddNewVehicle from './Components/AddNewVehicle';
import HistryPage from './Components/HistryPage';
import LocationTracker from './Components/LocationTracker';
import SecurityPage from './Components/SecurityPage';
import UserList from './Components/UserDetails/UserList';
import UserListAr from './Components/UserDetails/UserListAr';
import AddUserForm from './Components/UserDetails/AddUserForm';
import VehicleList from './Components/VehicleAdd/VehicleList';
import CostPage from './Components/CostDetails/CostPage';
import AddCostDetails from './Components/CostDetails/AddCostDetails';
import CostList from './Components/CostDetails/CostList';
import { AuthProvider } from './context/AuthContext';
import FeedbackPage from './Components/FeedbackPage';
import FeedBackReview from './Components/FeedBackReview';

const AppContent = () => {
  const location = useLocation();
  const showNavBar = location.pathname !== '/';
  console.log('API URL:', process.env.REACT_APP_API_URL);

  return (
    <>
      {showNavBar && <NavBar />}
      <Routes>
        <Route path="/" exact Component={Signin} />
        <Route path="/user" element={<HistryPage />} />
        <Route path="/dean" element={<Dean />} />
        <Route path="/ar" element={<ArPage />} />
        <Route path="/head" element={<Head />} />
        <Route path="/request" element={<RequestForm />} />
        <Route path="/vehidetail" element={<VehiDetailPage />} />
        <Route path="/reser" element={<ReservationDash />} />
        <Route path="/vehiclelist" element={<VehicleList />} />
        <Route path="/location-tracker" element={<LocationTracker />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/addUser" element={<AddUserForm />} />
        <Route path="/userlistar" element={<UserListAr />} />
        <Route path="/costpage" element={<CostPage />} />
        <Route path="/addcostpage" element={<AddCostDetails />} />
        <Route path="/costlist" element={<CostList />} />
        <Route path='/user/feedback' element ={<FeedbackPage/>}/>
        <Route path='/user/feedback/review' element ={<FeedBackReview/>}/>
       
      </Routes>
      <Footer />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
