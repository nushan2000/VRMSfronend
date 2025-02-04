import React, {useState} from 'react'
import '../Css/SignInPageStyle.css'
import SignInDash from './SignInDash'
import { useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';
import PopUp from './Popup';
import Navbar from './NavBar';
import { toast } from 'react-toastify';
export default function Signin() {

  const [showPopUp, setShowPopUp] = useState(true);

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  

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
    }else{
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
    <div className='sign'>
      
      
    <div >
      
      <div class="roww"> 
        <div  class="columleft">
          <SignInDash/>

        </div>
        
        <div  class="columnRight ">
          <div>
            <div className='signin'>
              <div className="row61">
                <div className="column61" > 
                  <img className="img61" src={require('../Images/sign4.png')} ></img>  
                </div>
                <div className="column62" >               
                  <form className='form61' onSubmit={sendData}>
                    <img className="img-log61" src={require('../Images/logo4.png')}></img>
                    <div className="mb-3">
                      <label  className="form-label">Email address</label>
                      <div className="input-group">
                      <span className="input-group-text border border-dark">
                      <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-envelope"
                            viewBox="0 0 16 16"
                          >
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                          </svg>
                          </span>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control border border-dark"
                            placeholder="Enter your email"
                            aria-describedby="emailHelp"
                          />
                          
                        </div>
                      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                      <label  className="form-label">Password</label>
                      <div className="input-group">
                      <span className="input-group-text border border-dark">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-key" viewBox="0 0 16 16">
                        <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5"/>
                        <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                      </svg>
                          </span>
                      <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control border border-dark" id="exampleInputPassword1" placeholder='Password'/>
                      </div>
                    </div>           
                     <button  type="Sign In"  className="btnSign btn-primary">SIGN IN</button>
                  </form>
                </div >
            
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {showPopUp && (
        <div className='popuppage'>
          <PopUp onClose={handleClosePopUp} />
        </div>
      )}
    </div>
  )
}
