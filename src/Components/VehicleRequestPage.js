import React, {useState} from "react";
import '../Css/VehicleRequastPage.css'
import '../Css/SignInPageStyle.css'
import Dashboard from "./Dashboard";
import RequestForm from "./RequestForm";


export default function RequestPage(){//////////////////////////////////
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [dailyRate, setDailyRate] = useState("")
    const [date, setdate]=useState("");




    return(//////////////////////////////////////////
        
        <div className='min-vh-100'>
        <div class="row">
          
          <div class="columleft">

      <Dashboard/>
  </div>
  <div class="columnRight columnRightt">
      <RequestForm/>
  </div>
          
          

</div>
        
    </div>

    );
}
