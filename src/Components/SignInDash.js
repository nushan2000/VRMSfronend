import React, { useState, useEffect } from "react";
import axios from "axios";
import VehicleDetails from "./vehiDetails"; // Assuming this is the correct import for your VehicleDetails component
import "../Css/vehicleDash.css";

export default function SignInDash() {
  const [vehicles, setItems] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showPopup, setShowPopUp] = useState(false);
  const [status, setStatus] = useState();
  const today = new Date().toISOString().split("T")[0];

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };
  useEffect(() => {
    fetchVehiDetail();
  }, []);

  console.log(vehicles);

  const fetchVehiDetail = async () => {
    try {
      const apiBaseUrl = process.env.REACT_APP_API_URL;
      console.log("API Base URL:", apiBaseUrl); // Debugging
      const response = await axios.get(`http://10.50.227.121:3000/vehicle/vehicles`);
      setItems(response.data);
      console.log("API Base URL:", response.data);

      //const today = new Date().toISOString().split("T")[0];
      //const todayStatus = vehicles.statusList.find(status => status.statusDate.startsWith(today));

      // Get newStatus if found, otherwise return "No status for today"
      //const newStatus = todayStatus ? todayStatus.newStatus : "No status for today";
      // Transform the array
      // const newArray =response.data.map((vehicle) => {
      //     const today = new Date().toISOString().split("T")[0];

      //     // Find the status object where statusDate matches today
      //     const todayStatus = vehicle.statusList.find(status => status.statusDate.startsWith(today));

      //     return {
      //         id:vehicle._id,
      //       status: vehicle.status,
      //       availableSheats: vehicle.availableSheat, // Assuming the correct field is "availableSheat"
      //       vehicleImg: vehicle.vehicleImg,
      //       vehicleNo: vehicle.vehicleNo,
      //       newstatus: todayStatus ? todayStatus.newStatus : "available",
      //       statusDate: todayStatus ? todayStatus.statusDate : ""
      //     };
      // }

      // )
      // console.log("new object",newArray);
      // setStatus(newArray)
      //   if (response.data?.statusList) {
      //     const today = new Date().toISOString().split("T")[0];
      //     const useStatus = vehicles.statusList.some((item) =>
      //       item.statusDate.startsWith(today)
      //     );
      //     console.log("usestatte",useState);

      //     setStatus({
      //       statusDate:useStatus.statusDate,
      //   newStatus:useStatus.newStatus
      //     });

      //     // Update state safely
      //   }
    } catch (error) {
      console.error("Error fetching vehicle details:", error);
    }
  };

  const handleLabelClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowPopUp(true);
    //console.log("status",status);
  };

  return (
    <div>
      <ol className="Dashboard1">
        <h1>Today Available</h1>
        {vehicles?.map((vehicle, index) => (
          <li key={index}>
            <label
              className="form-label sidetails1"
              style={
                vehicle.statusList.find((status) =>
                  status.statusDate.startsWith(today)
                )
                  ? { backgroundColor: "#FFEBEE" }
                  : { backgroundColor: "#E8F5E9" }
              }
              onClick={() => handleLabelClick(vehicle)}
            >
              <div className="rowbutton1">
                <div className="columnbuttonleft1 ">
                  <div>
                    {vehicle.vehicleImg === "" ||
                    vehicle.vehicleImg === null ? (
                      ""
                    ) : (
                      <img
                        className="vehiclebutton1"
                        src={`data:image/png;base64,${vehicle.vehicleImg}`}
                        alt="Vehicle"
                      />
                    )}
                  </div>
                </div>
                <div className="columnbuttonright1 ">
                  <p>
                    <span className="tabbed-text">Available seats:</span>
                    {vehicle?.avilableSheat} <br />
                    <span className="tabbed-text">Status:</span>
                    {vehicle.statusList.find((status) =>
                      status.statusDate.startsWith(today)
                    ) ? (
                      vehicle.statusList.find((status) =>
                        status.statusDate.startsWith(today)
                      )?.newStatus
                    ) : (
                      <img
                        src={require("../Images/yes1.png")}
                        alt="Yes"
                        style={{
                          color: "green",
                          width: "24px",
                          height: "24px",
                        }}
                      />
                    )}
                  </p>
                </div>
              </div>
            </label>
          </li>
        ))}
      </ol>
      {/* {showPopup && localStorage.getItem("designation") === "checker" && (
        <VehicleDetails vehicle={selectedVehicle} onClose={handleClosePopUp} />
      )} */}
    </div>
  );
}
