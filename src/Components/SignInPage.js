import React, { useEffect, useState } from "react";
import "../Css/SignInPageStyle.css";
import SignInDash from "./SignInDash";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import PopUp from "./Popup";
import Navbar from "./NavBar";
import { toast } from "react-toastify";
function Signin() {

  const [showPopUp, setShowPopUp] = useState(true);

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("designation");
    Cookies.remove("userInfo");
  }, []);

  const sendData = async (e) => {
    console.log(email,password);
    e.preventDefault();

    try{
      const config={
        headers:{
          "content-type":"application/json",//not must
        },
      };
      const{data}=await axios.post(`${process.env.REACT_APP_API_URL}/user/login`,
    {
      email,password,
    },config
    );

    console.log(data)
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data._id);
    localStorage.setItem('userEmail', data.email);
    
    Cookies.set('userInfo', JSON.stringify(data), { expires: 7 });
    if (data.designation=="user") {
      navigate('/user'); // Redirect to the admin page
    } else if (data.designation=="head"){
      navigate('/head'); // Redirect to the customer page
    }else if (data.designation=="ar"){
      navigate('/ar');
    }else if (data.designation=="dean"){
      navigate('/dean');
    }else if (data.designation=="security"){
      navigate('/security');
    }else if (data.designation=="operator"){
      navigate('/operator');
    }else if (data.designation=="checker"){
      navigate('/checker');
    }else if (data.designation=="formHandler"){
      navigate('/formHandler');
    }
    else{
      toast.error('cant login!');
    }


    // To retrieve the user information from the cookie
const userInfoFromCookie = Cookies.get('userInfo');

// If you want to parse the JSON data
const parsedUserInfo = userInfoFromCookie ? JSON.parse(userInfoFromCookie) : null;

// Now 'parsedUserInfo' contains the user information retrieved from the cookie
console.log(parsedUserInfo);
    }catch(error){
      toast.error('cant login!');
    }
  };

  return (
    <div className="signin-container">
      {/* Left Side */}
      <div className="signin-left">
        
        <div className="signin-welcome">
         <SignInDash/>
          
        </div>
      </div>

      {/* Right Side (Form) */}
      <div className="signin-right">
        <form className="signin-form" onSubmit={sendData}>
          <h2 className="signin-form-title">Sign In</h2>

          <div className="signin-form-group">
            <label className="signin-label">Email</label>
             <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control border border-dark"
                            placeholder="Enter your email"
                            aria-describedby="emailHelp"
                          />
          </div>

          <div className="signin-form-group">
            <label className="signin-label">Password</label>
            <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control border border-dark"
                            id="exampleInputPassword1"
                            placeholder="Password"
                          />
          </div>

          <button type="Sign In" className="signin-button btnSign btn-primar">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
export default Signin;
