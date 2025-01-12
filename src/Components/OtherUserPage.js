import React, {useEffect, useState}  from "react";
import "../Css/OtherUserPageStyle.css";
import Calendar from "react-calendar";
import axios from 'axios';
import Dashboard from "./Dashboard";



export default function OtherUserPage(){


    const [date, setDate] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [reason, setReason]=useState("");
    const [section, setSection]=useState("");
    const [vehicle, setVehicle]=useState("");
    const [depatureLocation, setDepatureLocation]=useState("");
    const [destination, setDestination]=useState("");
    const [comeBack, setComeBack]=useState("");
    const [distance, setDistance]=useState("");
    const [name, setName]=useState("");
    const [position, setPosition]=useState("");
    const [pickup, setPickup]=useState("");
    const [drop, setDrop]=useState("");

    const [requestVehicle,setRequestVehicle]=useState([])

    // // useEffect(()=>{
    // //     const fetchVehicle=async()=>{
    // //         const res =await fetch('http://localhost:8080/request/requestvehicle')

    // //         const data =await res.json()
    // //         setRequestVehicle(data)
    // //     }
    // })

    const handleSelectedSection = (a) => {
        const newSection = a.target.value;
        setSection(newSection);
      };

    const handleSelectedVehicle = (a) => {
        const newVehicle = a.target.value;
        setVehicle(newVehicle);
      };


      const handleRadioChange = (a) => {
        const newValue = a.target.value;
        setVehicle(newValue);
      };

      

    function sendData(a){
        
 
        a.preventDefault();


        

        const newDetails={
            date,
            startTime,
            endTime,
            reason,
            section,
            vehicle,
            depatureLocation,
            destination,
            comeBack,
            distance,
            name,
            position,
            pickup,
            drop

            

        }
        

        axios.post("http://localhost:8080/request/addrequest",newDetails).then(()=>{
            alert("New details Added")
        }).catch((err)=>{
            console.error("error",err)
            alert("error with details adding",err)
        })
    }

    return(
        
        <body>

                <div class="row ">
                    
                <div class="columLleft">

<Dashboard/>
</div>
                <div class="column2" >
                    <h2>Column 2</h2>
                    <form class="vehicleRequestForm" title="Vehicle Request Form" onSubmit={sendData} >
            <label for="Vehicle Request Forme" class="form-label"  >Vehicle Request Form </label>
                
                    <div class="RequestVehicle">
                        <label for="date" class="date">Date :</label>
                        <input type="date" class="dateInput" id="date" placeholder ="yyyy-mm-dd" onChange={(a)=>{
                            setDate(a.target.value);
                        }}/>
                    </div>

                    <div class="RequestVehicle">
                        <label for="time" class="startTime">Start Time :</label>
                        <input type="time" class="startTimeInput" id="startTime" placeholder ="hh-mm" onChange={(a)=>{
                            setStartTime(a.target.value);
                        }}/>
                        <label for="time" class="endTime">End Time :</label>
                        <input type="time" class="endTimeInput" id="endTime" placeholder ="hh-mm" onChange={(a)=>{
                            setEndTime(a.target.value);
                        }}/>
                    </div>

                    <div class="RequestVehicle">
                        <label for="sectiondSelect" class="section">Select Section :</label>
                        <select id="sectiondSelect" class="selectSectionInput" value={section} onChange={handleSelectedSection}>
                            <option>Administrative</option>
                            <option>Finance</option>
                            <option>Technical Officer</option>
                            <option>Acadamic Staff</option>
                            <option>AR Office</option>

                        </select  >

                        <label for="vehicleSelect" class="vehicle">Select Vehicle :</label>
                        <select id="vehicleSelect" class="form-control" value={vehicle} onChange={handleSelectedVehicle}>
                            <option>Vehicle 1 </option>
                            <option>Vehicle 2</option>
                            <option>Vehicle 3</option>
                            <option>Vehicle 4</option>
                        </select>
                    </div>
                    


                

                <div class="RequestVehicle">
                    <label for="reason" class="reason">Reason :</label>
                    <input type="text" class="reasonInput" id="reason" placeholder ="Enter Reason For Vehicle Resevation" 
                    onChange={(a)=>{
                        setReason(a.target.value);}}/>
                    
                </div>

                <div class="RequestVehicle">
                    <label for="depatureFrom" class="depatureLocation">Departure From :</label>
                    <input type="text" class="departureFromInput" id="depatureFrom" placeholder ="Enter Depature Location"
                    onChange={(a)=>{
                        setDepatureLocation(a.target.value)}}/>
                </div>

                <div class="RequestVehicle">
                    <label for="destination" class="destinationLocation">Destination :</label>
                    <input type="text" class="destinatonInput" id="Destination" placeholder ="Enter Destination Location"
                    onChange={(a)=>{
                        setDestination(a.target.value)}}/>
                </div>

                <div class="RequestVehicle">
                    <label for="comeBack" class="comeBack">Do you want to come back in same vehicle</label>
                    <input class="set-comeback-input" type="radio" name="setComeBack" id="setComeBack1" value="Yes" checked={setVehicle==='Yes'} onChange={handleRadioChange}/>
                    <label class="set-comeback-label" for="setComeBack1">
                        Yes
                    </label>
                    <input class="set-comeback-input" type="radio" name="setComeBack" id="setComeBack2" value="No" checked={setVehicle==='No'} onChange={handleRadioChange}/>
                    <label class="set-comeback-label" for="setComeBack2">
                        No
                    </label>
                </div>
                



                <div class="RequestVehicle">
                    <label for="approximateDistance" class="distance">Approximate Distance :</label>
                    <input type="number" class="approximateDistanceInput" id="approximateDistance" 
                    onChange={(a)=>{
                        setDistance(a.target.value)}}></input>                   
                    <span class="approximateDistance">km</span>
                </div>

                <form>

                <label for="addPassenger" class="addPassenger" >Add Passenger</label>

                <div class="RequestVehicle">
                    <label for="passengerName" class="passengerName">Name :</label>
                    <input type="text" class="passengerNameInput" id="passengerName" placeholder ="Enter Passenger Name"
                    onChange={(a)=>{
                        setName(a.target.value)}}/>
                </div>

                <div class="RequestVehicle">
                        <label for="positionSelect" class="position">Select position :</label>
                        <select id="positionSelect" class="selectpositionInput">
                            <option>Acadamic Staff</option>
                            <option>Non-acadamic staff</option>
                            <option>Student</option>
                        </select>
                </div>

                <div class="RequestVehicle">
                    <label for="pickUpLocation" class="pickUpLocation">Pickup Location :</label>
                    <input type="text" class="pickupLocationInput" id="pickUpLocation" placeholder ="Enter Passenger Pickup Location"
                    onChange={(a)=>{
                        setPickup(a.target.value)}}/>
                </div>

                <div class="RequestVehicle">
                    <label for="dropLocation" class="dropLocation">Drop Location :</label>
                    <input type="text" class="dropLocationInput" id="dropLocation" placeholder ="Enter Passenger Drop Location"
                    onChange={(a)=>{
                        setDrop(a.target.value)}}/>
                </div>
                <button type="submit" class="btn btn-primary">Add Reservation</button>

                </form>
                


                <div>
                    <table class="table">
                        <thead class="table-light">
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Name</th>
                                <th scope="col">Position</th>
                                <th scope="col">Pickup From</th>
                                <th scope="col">Drop to</th>
                            </tr>
                        </thead>
                        <tbody>
                            <th  scope="col">1</th>
                            <th scope="col">Nushan</th>
                            <th scope="col">Student</th>
                            <th scope="col">Allawaten</th>
                            <th scope="col">Wakaputen</th>
                        </tbody>
                    </table>
                        

                    
                </div>

                
                </form>

                </div>
                    
                
                </div>

        </body>
    )
}
