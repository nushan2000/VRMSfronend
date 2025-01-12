import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import '../Css/FeeBackReviewStyle.css';
import BarChart from "./BarChart";

export default function FeedBackReview() {
    const [vehicleDetails, setVehicleDetails] = useState("");
    const [vehicleNumbers, setVehicleNumbers] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        const fetchVehicleData = async () => {

            try{
                const response = await fetch(`${process.env.REACT_APP_API_URL}/user/feedback/dropdown/vehileNo`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                if(response.ok){
                    const data = await response.json();
                    setVehicleNumbers(data);
                }else {
                    console.log("data fetching error")
                }

            } catch(error){
                console.log("try part error",error)
            }

            setLoading(false);
        }

        fetchVehicleData();
    },[])

    const hadleVehicleSelect = async (selectedVehicleDetails) => {
        
        
        setVehicleDetails(selectedVehicleDetails);
        console.log(vehicleDetails)
        localStorage.setItem('selectedVehicleDetails', selectedVehicleDetails);
    }

    function myFunction(selectedVehicleDetails) {
        document.getElementById("myDropdown").classList.toggle("show");
        hadleVehicleSelect(selectedVehicleDetails);
    }

    function toggleDropdown() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    window.onclick = function (event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    return (
        <div className="feedback-review-page">
            <div className="inputDiv">

                
                <div class="dropdown">
                    
                <button onClick={toggleDropdown} className="dropbtn">{vehicleDetails || "Select Vehicle"}</button>
                    <div id="myDropdown" class="dropdown-content">
                        {loading ? (
                            <p>Loading...</p>
                        ):(
                            vehicleNumbers.map(vehicle => (
                                <a key={vehicle} onClick={() => hadleVehicleSelect(vehicle)}>{vehicle}</a>
                            ))
                        )}

                    </div>

                    {/* <button onClick={() => myFunction("")}>Search Feedback</button> */}
                </div>
                {/* <button onClick={() => hadleVehicleSelect()} >Preview feedback</button> */}
            </div>
            <div className="barChart">
            <BarChart onSelect={setVehicleDetails} />
            </div>
        </div>

    )
}