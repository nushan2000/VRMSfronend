import React, { useState } from "react";
import axios from "axios";
import "../Css/AddNewVehicle.css";

export default function AddNewVehicle() {
    const [vehicleNo, setVehicleNo] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [sheatCapacity, setSheatCapacity] = useState("");
    const [driverName, setDriverName] = useState("");
    const [vehicleImg, setVehicleImg] = useState("");
    const [driverEmail, setDriverEmail] = useState("");
    const [vehicleName, setVehicleName] = useState("");
    const [message, setMessage] = useState("");

    function convertToBase64(e) {
        if (e.target.files.length > 0) {
            var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                setVehicleImg(reader.result.split(",")[1]); // Set only the base64 data
            };
            reader.onerror = (error) => {
                console.log("Error", error);
            };
        }
    }

    function sendVehicleData(e) {
        e.preventDefault();

        const addNewVehicle = {
            vehicleNo,
            vehicleType,
            sheatCapacity,
            driverName,
            vehicleImg,
            driverEmail,
            vehicleName
        }

        const token = JSON.parse(localStorage.getItem("token"));
        axios.post(`${process.env.REACT_APP_API_URL}/vehicle/addVehicle`, addNewVehicle,{
            headers: {
              Authorization: `Bearer ${token}`
              
            },
          })
    .then(() => {
        setMessage("New vehicle added successfully");
        setVehicleNo("");
        setVehicleType("");
        setSheatCapacity("");
        setDriverName("");
        setVehicleImg("");
        setDriverEmail("");
        setVehicleName("");
    })
    .catch((err) => {
        console.error("Error", err);
        setMessage(`Error adding new vehicle: ${err.message}`);
    });

    }

    return (
        <div className="main">
            <form className="addvehicle" onSubmit={sendVehicleData}>
                <div>
                    <h1>Vehicle</h1>
                </div>

                <div>
                    <label>Vehicle NO:</label>
                    <input type="text" value={vehicleNo} className="form-contral" onChange={(e) => setVehicleNo(e.target.value)} />
                </div>

                <div>
                    <label>Vehile Type</label>
                    <input type="text" value={vehicleType} className="form-contral" onChange={(e) => setVehicleType(e.target.value)} />
                </div>

                <div>
                    <label>Sheat Capacity</label>
                    <input type="Number" value={sheatCapacity} className="form-contral" onChange={(e) => setSheatCapacity(e.target.value)} />
                </div>

                <div>
                    <label>Driver Name</label>
                    <input type="text" value={driverName} className="form-contral" onChange={(e) => setDriverName(e.target.value)} />
                </div>
                
                <div>
                    <label>Driver Email:</label>
                    <input type="text" value={driverEmail} className="form-contral" onChange={(e) => setDriverEmail(e.target.value)} />
                </div>

                <div>
                    <label>Vehicle Name</label>
                    <input type="text" value={vehicleName} className="form-contral" onChange={(e) => setVehicleName(e.target.value)} />
                </div>

                <div>
                    <label>Image</label>
                    <input type="file" className="form-control" id="vehicleImg" accept="image/*" onChange={convertToBase64}></input>
                    {vehicleImg === "" || vehicleImg == null ? "" : <img className="vehiclebutton" src={`data:image/png;base64,${vehicleImg}`} alt="Vehicle" />}
                </div>

                <div>
                    <button type="submit">Submit</button>
                </div>

                {/* Display message */}
                {message && <div className="message">{message}</div>}
            </form>
        </div>
    )
}
