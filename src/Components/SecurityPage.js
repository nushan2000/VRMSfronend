import React, { useState, useEffect } from "react";
import axios from "axios";
import { PDFViewer, PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import '../Css/SecurityPage.css';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  value: {
    fontSize: 14,
    marginBottom: 10,
  },
  columnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    width: '48%', // Adjust as needed
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginVertical: 10,
  },
});

const SecurityPage = () => {
  const [pdfs, setPDFs] = useState([]);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const token = localStorage.getItem("token"); 
  useEffect(() => {
    // Fetch PDF documents from the server when the component mounts
    const fetchPDFs = async () => { 
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/request/requests`,{
          headers: {
            Authorization: `Bearer ${token}`
            
          },
        });
        const filteredRequests = response.data.filter(request => request.approveDeenAr && request.approveHead);
        setPDFs(filteredRequests);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      }
    };

    fetchPDFs();
  }, []);

  const handlePDFSelect = (pdf) => {
    setSelectedPDF(pdf);
  };

  return (
    <div className="container">
      <div className="pdf-list-container  " style={{ margin: "50px 40px 4px 4px" }}>
        <h2>PDF List</h2>
        <div className="pdf-list">
          {pdfs.map((pdf, index) => (
            <div key={index} className="pdf-item" onClick={() => handlePDFSelect(pdf)}>
              <span>{pdf.date}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="pdf-viewer-container">
        <h2>PDF Viewer</h2>
        <div className="pdf-viewer">
          {selectedPDF && (
            <PDFViewer width={600} height={800}>
       <Document>
  <Page style={styles.page}>
    <Text style={styles.title}>Vehicle Reservation Form</Text>
    <View style={styles.columnContainer}>
      {/* First column */}
      <View style={styles.column}>
        <Text style={styles.label}>Date: {selectedPDF.date}</Text>
        <Text style={styles.label}>From: {selectedPDF.depatureLocation} To:{selectedPDF.destination}</Text>
        <Text style={styles.label}>Expected Time Taken: {selectedPDF.startTime} To {selectedPDF.endTime}  </Text>
      </View>
      
      {/* Second column */}
      <View style={styles.column}>
        <Text style={styles.label}>Vehicle: {selectedPDF.vehicle}</Text>
        <Text style={styles.label}>Section: {selectedPDF.section}</Text>
        
      </View>
    </View>
    {/* Below the columns */}
    <Text style={styles.label}>Reason: {selectedPDF.reason}</Text>
    <Text style={styles.label}>Approximately Distance: {selectedPDF.distance}</Text>
    <Text style={styles.label}>Come Back: {selectedPDF.comeBack ? 'Yes' : 'No'}</Text>
   <Text style={styles.label}>Passengers:</Text>
        {selectedPDF.passengers.map((passenger, idx) => (
          <Text key={idx} style={styles.value}>
            {passenger.name}, {passenger.position}, {passenger.pickup}, {passenger.drop}
          </Text>
        ))}
        <></>
         <Text style={styles.label}>Applier: {selectedPDF.applier}</Text>
    <Text style={styles.label}>Head Approved: {selectedPDF.headApproved ? 'Yes' : 'No'}</Text>
    <View style={styles.line}></View>
    <Text style={styles.label}>Vehicles going outside Galle city: {selectedPDF.headApproved ? 'Yes' : 'No'}</Text>
    <Text style={styles.label}>Dean /AR Approved: {selectedPDF.approveDeenAr ? 'Yes' : 'No'}</Text>
  </Page>
</Document>


            </PDFViewer>
          )}
        </div>
        {selectedPDF && (
          <div className="download-link-container">
            <PDFDownloadLink document={<Document><Page><Text>{selectedPDF.name}</Text></Page></Document>} fileName={`${selectedPDF.name}.pdf`}>
              {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
            </PDFDownloadLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityPage;
