import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code'; // Importing from react-qr-code

const QrCodeComponent = ({ vehicleNumber }) => {
  const [qrCodeData, setQRCodeData] = useState('');
  const [qrCodeURL, setQRCodeURL] = useState("");

  const frontEndURL = `http://localhost:3001/user/feedback?vehicle=${vehicleNumber}`

  useEffect(()=>{
    if(vehicleNumber) {
        generateQRCode(`${frontEndURL}?vehicleNO=${vehicleNumber}`);
    }
  }, [vehicleNumber, frontEndURL]);

  const generateQRCode = async (url) =>{
    try{
        // Generate QR code URL using the provided URL
        setQRCodeURL(url);
    } catch (error) {
        console.error("Error generating QR code:", error);
    }
  }

  const downloadQRCode = () => {
    if (qrCodeURL) {
      // Create a temporary link element to download the QR code image
      const downloadLink = document.createElement("a");
      downloadLink.href = qrCodeURL;
      downloadLink.download = "qr-code.png";
  
      // Attach event listeners to handle download errors
      downloadLink.addEventListener("error", () => {
        console.error("Error downloading QR code: File not found");
      });
      downloadLink.addEventListener("click", () => {
        console.log("Downloading QR code...");
      });
  
      // Trigger the download
      downloadLink.click();
    }
  };
  

  return (
    <div>
    
    <QRCode value={qrCodeURL} />
    <button onClick={downloadQRCode}>
      Download
    </button>
    <p>Scan this QR code to give feedback for vehicle {vehicleNumber}</p>
  </div>
  );
};

export default QrCodeComponent;
