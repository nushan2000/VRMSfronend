import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './Components/NavBar';
import Signin from './Components/SignInPage';
import Signin2 from './Components/SignInPage2';
import Dean from './Components/DeanePage';
import ArPage from './Components/ArPage';
import Head from './Components/DepartmentHeadPage';
import Footer from './Components/Footer';
import RequestForm from './Components/VehicleRequestPage';
import VehiDetailPage from './Components/VehicleDetailsPage';
import ReservationDash from './Components/ReservationDash';
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
import ProtectedRoute from './utils/ProtectedRoute';
import { ReservationProvider } from './context/ReservationContext';
import OperatorPage from './Components/OperatorPage';
import FormHandlerPage from './Components/FormHandlerPage';
import CherkerPage from './Components/CheckerPage';
import CherkerPage2 from './Components/CheckerPage2';
import AllRequestsPage from './Components/AllRequests';

const AppContent = () => {
  // const location = useLocation();
  // const showNavBar = location.pathname !== '/';
  // console.log('API URL:', process.env.REACT_APP_API_URL);

  return (
    <>

    </>
  );
};

function App() {
  return (
<AuthProvider>
<ReservationProvider>
      <Router>
      <NavBar />
      <Routes>

        <Route path="/"  element={<Signin/>} />
        <Route path="/sign"  element={<Signin2/>} />
        <Route path="/user" element={<HistryPage />} />
        
        <Route path="/ar" element={<ArPage />} />

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
        <Route path="/operator" element={<OperatorPage/>} />
        <Route path="/formHandler" element={<FormHandlerPage/>} />


        <Route element={<ProtectedRoute allowedRole="dean"/>}>
        <Route path="/dean" element={<Dean />} />
        <Route path="/dean/allRequests" element={<AllRequestsPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRole="head"/>}>
        <Route path="/head" element={<Head />} />
        </Route>

        <Route element={<ProtectedRoute allowedRole="checker"/>}>
        {/* <Route path="/checker" element={<CherkerPage />} /> */}
        <Route path="/checker" element={<CherkerPage2 />} />
        </Route>
        
       
      </Routes>
      <Footer />
      <ToastContainer 
        position="top-right" 
        autoClose={5000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="light" 
      />
      </Router>
      </ReservationProvider>
    </AuthProvider>
      
    
  );
}




export default App;
