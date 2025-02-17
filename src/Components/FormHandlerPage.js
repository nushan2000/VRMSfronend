import React, { useState, useEffect } from "react";
import axios from "axios";
import { PDFViewer, PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@mui/material';

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

function FormHandlerPage() {
  const [pdfs, setPDFs] = useState([]);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const token = localStorage.getItem("token"); 

  useEffect(() => {
    const fetchPDFs = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/request/requests`, {
          headers: {
            Authorization: `Bearer ${token}`,
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
    <Box sx={{ margin: "100px" }}>
      <Typography variant="h4" gutterBottom>PDF List</Typography>
      <Paper sx={{ padding: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pdfs.map((pdf, index) => (
              <TableRow key={index} hover onClick={() => handlePDFSelect(pdf)}>
                <TableCell>{pdf.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {selectedPDF && (
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h5" gutterBottom>PDF Viewer</Typography>
          <PDFViewer width={600} height={800}>
            <Document>
            <Page style={styles.page}>
          <Text style={styles.title}>Vehicle Reservation Form</Text>
          
          <View style={styles.columnContainer}>
            <View style={styles.column}>
              <Text style={styles.label}>Date: {selectedPDF.date}</Text>
              <Text style={styles.label}>From: {selectedPDF.depatureLocation} To: {selectedPDF.destination}</Text>
              <Text style={styles.label}>Expected Time Taken: {selectedPDF.startTime} To {selectedPDF.endTime}</Text>
            </View>
            
            <View style={styles.column}>
              <Text style={styles.label}>Vehicle: {selectedPDF.vehicle}</Text>
              <Text style={styles.label}>Section: {selectedPDF.section}</Text>
            </View>
          </View>
          
          <Text style={styles.label}>Reason: {selectedPDF.reason}</Text>
          <Text style={styles.label}>Approximately Distance: {selectedPDF.distance}</Text>
          <Text style={styles.label}>Come Back: {selectedPDF.comeBack ? 'Yes' : 'No'}</Text>

          <View style={styles.line}></View>
          
          <Text style={styles.label}>Passengers:</Text>
          
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Name</Text>
              <Text style={styles.tableCellHeader}>Position</Text>
              <Text style={styles.tableCellHeader}>Pickup</Text>
              <Text style={styles.tableCellHeader}>Drop</Text>
            </View>
            {selectedPDF.passengers.map((passenger, idx) => (
              <View key={idx} style={styles.tableRow}>
                <Text style={styles.tableCell}>{passenger.name}</Text>
                <Text style={styles.tableCell}>{passenger.position}</Text>
                <Text style={styles.tableCell}>{passenger.pickup}</Text>
                <Text style={styles.tableCell}>{passenger.drop}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.label}>Applier: {selectedPDF.applier}</Text>
          <Text style={styles.label}>Head Approved: {selectedPDF.headApproved ? 'Yes' : 'No'}</Text>
          
          <View style={styles.line}></View>

          <Text style={styles.label}>Vehicles going outside Galle city: {selectedPDF.headApproved ? 'Yes' : 'No'}</Text>
          <Text style={styles.label}>Dean /AR Approved: {selectedPDF.approveDeenAr ? 'Yes' : 'No'}</Text>
        </Page>
            </Document>
          </PDFViewer>

          <Box sx={{ marginTop: 2 }}>
            <PDFDownloadLink document={<Document><Page><Text>{selectedPDF.name}</Text></Page></Document>} fileName={`${selectedPDF.name}.pdf`}>
              {({ loading }) => (
                <Button variant="contained" color="primary" disabled={loading}>
                  {loading ? 'Loading document...' : 'Download PDF'}
                </Button>
              )}
            </PDFDownloadLink>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default FormHandlerPage;
