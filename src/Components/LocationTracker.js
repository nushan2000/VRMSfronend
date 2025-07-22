import React, { useState, useEffect } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import io from 'socket.io-client';
import axios from 'axios';
import "../Css/LocationTracker.css";
const center = { lat: 20.9271, lng: 79.8612 };

function LocationTracker() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAmAH2kmn2Z4LHbZEPFEltxWtyF5tlvPyw", // Replace with your Google Maps API key
  });

  const [definedLocation, setDefinedLocation] = useState({ lat: 20.9271, lng: 79.8612 }); // Default defined location
  const [currentPosition, setCurrentPosition] = useState(null); // Mobile user's location

  useEffect(() => {
    // Fetch data from backend when the component mounts
    fetchData();
    const intervalId = setInterval(fetchData, 2000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);


  const fetchData = async () => {
    try {
        
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/location-details/get-location`);
      console.log("Backend response:", response.data); // Make a GET request to your backend endpoint
      const { latitude, longitude } = response.data;
      setCurrentPosition({ lat: latitude, lng: longitude });
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };


  return isLoaded ? (
    <div className="rowmap">
      <div className="columnmap2"><h2> &ensp; You Can See Your Vehicle Location</h2></div>
      <div className="columnmap1">
      <div className="map">
    <GoogleMap 
      center={currentPosition }
      zoom={8}
      mapContainerStyle={{  height: "60vh" }}
      options={{
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
    >
      {/* Display defined location */}
      <Marker position={definedLocation} />

      {/* Display mobile user's location if available */}
      {currentPosition && (
        <Marker position={currentPosition} />
      )}
    </GoogleMap>
    </div>
      </div>
      

    </div>
    
  ) : (
    <></>
  );
}

export default LocationTracker;
