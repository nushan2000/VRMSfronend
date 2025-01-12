import React from "react";
import "../Css/OtherUserPageStyle.css";
import Dashboard from './Dashboard'
import VehiDetails from './vehiDetails'

export default function VehiDetailPage(){
    return(
        <body>

                <div class="row ">
                    
                <div class="columLleft">

                <Dashboard/>
            </div>
                <div class="column2" >
                <VehiDetails/>
                    
                </div><div></div>
                    
                
                </div>

        </body>

    )


}