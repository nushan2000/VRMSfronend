import React, {useState} from 'react'
import '../Css/SignInPageStyle.css'
import SignInDash from './SignInDash'
import { useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';
import PopUp from './Popup';
import Navbar from './NavBar';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';

import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import logo from '../Images/logo4.png';
import signImg from '../Images/sign4.png';
import '../Css/SignInPage.css';

import {
  Box,
  Container,
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  InputAdornment,

  Button,
} from '@mui/material';
 function Signin(props) {
  const drawerWidth = 240;
  const [showPopUp, setShowPopUp] = useState(true);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined

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
    <Grid container className="signin-modern-root">
    <Grid item xs={12} md={6} className="signin-modern-left">
      <img src={signImg} alt="Sign Visual" className="signin-modern-image" />
    </Grid>

    <Grid item xs={12} md={6} className="signin-modern-right">
      <Paper elevation={6} className="signin-modern-form-container">
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight={600} sx={{ color: '#8A2D3B' }}>
  Welcome Back
</Typography>

<Avatar src={logo} sx={{ width: 72, height: 72, mb: 1, bgcolor: '#641B2E' }} />

          <Typography variant="body2" color="text.secondary">
            Sign in to continue to your account
          </Typography>
        </Box>

        <form onSubmit={sendData} className="signin-modern-form">
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                <EmailIcon sx={{ color: '#641B2E' }} />
              </InputAdornment>
              
              ),
            }}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="signin-modern-btn"
          >
            Sign In
          </Button>
        </form>
      </Paper>
    </Grid>
  </Grid>
    // <Box sx={{ display: 'flex' }}>
     
     
    //   <Box
    //     component="nav"
    //     sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    //     aria-label="mailbox folders"
    //   >
    //     {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
    //     {/* <Drawer
    //       container={container}
    //       variant="temporary"
    //       open={mobileOpen}
    //       onTransitionEnd={handleDrawerTransitionEnd}
    //       onClose={handleDrawerClose}
    //       sx={{
    //         display: { xs: 'block', sm: 'none' },
    //         '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
    //       }}
    //       slotProps={{
    //         root: {
    //           keepMounted: true, // Better open performance on mobile.
    //         },
    //       }}
    //     >
    //       {drawer}
    //     </Drawer>
    //     <Drawer
    //       variant="permanent"
    //       sx={{
    //         display: { xs: 'none', sm: 'block' },
    //         '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
    //       }}
    //       open
    //     >
    //       {drawer}
    //     </Drawer> */}
    //   </Box>
    //   <Box
    //     component="main"
    //     sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
    //   >
    //     <Toolbar />
    //     <div  class="columnRight ">
    //       <div>
    //         <div className='signin'>
    //           <div className="row61">
    //             <div className="column61" > 
    //               <img className="img61" src={require('../Images/sign4.png')} ></img>  
    //             </div>
    //             <div className="column62" >               
    //               <form className='form61' onSubmit={sendData}>
    //                 <img className="img-log61" src={require('../Images/logo4.png')}></img>
    //                 <div className="mb-3">
    //                   <label  className="form-label">Email address</label>
    //                   <div className="input-group">
    //                   <span className="input-group-text border border-dark">
    //                   <svg
    //                         xmlns="http://www.w3.org/2000/svg"
    //                         width="16"
    //                         height="16"
    //                         fill="currentColor"
    //                         className="bi bi-envelope"
    //                         viewBox="0 0 16 16"
    //                       >
    //                         <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
    //                       </svg>
    //                       </span>
    //                       <input
    //                         type="email"
    //                         value={email}
    //                         onChange={(e) => setEmail(e.target.value)}
    //                         className="form-control border border-dark"
    //                         placeholder="Enter your email"
    //                         aria-describedby="emailHelp"
    //                       />
                          
    //                     </div>
    //                   <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    //                 </div>
    //                 <div className="mb-3">
    //                   <label  className="form-label">Password</label>
    //                   <div className="input-group">
    //                   <span className="input-group-text border border-dark">
    //                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-key" viewBox="0 0 16 16">
    //                     <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5"/>
    //                     <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
    //                   </svg>
    //                       </span>
    //                   <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control border border-dark" id="exampleInputPassword1" placeholder='Password'/>
    //                   </div>
    //                 </div>           
    //                  <button  type="Sign In"  className="btnSign btn-primary">SIGN IN</button>
    //               </form>
    //             </div >
            
               
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </Box>
    // </Box>
  );
}

Signin.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};
export default Signin;
