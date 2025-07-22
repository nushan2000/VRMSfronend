import React, { useState, useEffect } from "react";
import axios from "axios";
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
});

const PDFGenerator = ({ requests }) => (
  <PDFViewer style={{ width: '100%', height: '100vh' }}>
    <Document>
      {requests.map((request, index) => (
        <Page key={index} style={styles.page}>
          <View style={styles.section}>
            <Text>Request {index + 1}</Text>
            <Text>Date: {request.date}</Text>
            <Text>Start Time: {request.startTime}</Text>
            <Text>End Time: {request.endTime}</Text>
            <Text>Reason: {request.reason}</Text>
            <Text>Section: {request.section}</Text>
            <Text>Vehicle: {request.vehicle}</Text>
            <Text>Departure Location: {request.depatureLocation}</Text>
            <Text>Destination: {request.destination}</Text>
            <Text>Come Back: {request.comeBack ? 'Yes' : 'No'}</Text>
            <Text>Distance: {request.distance} km</Text>
          </View>
          {request.passengers.map((passenger, idx) => (
            <View key={idx} style={styles.section}>
              <Text>Passenger {idx + 1}</Text>
              <Text>Name: {passenger.passengerName}</Text>
              <Text>Position: {passenger.position}</Text>
              <Text>Pickup: {passenger.pickup}</Text>
              <Text>Drop: {passenger.drop}</Text>
            </View>
          ))}
        </Page>
      ))}
    </Document>
  </PDFViewer>
);

const RequestForm = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch data from MongoDB
    axios.get("http://localhost:8080/request/requests")
      .then(response => {
        setRequests(response.data);
      })
      .catch(error => {
        console.error("Error fetching requests:", error);
      });
  }, []);

  return (
    <div>
      <PDFGenerator requests={requests} />
    </div>
  );
};

export default RequestForm;
