import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function generateVehicleRequestPDF(formData, vehicle, passengerList) {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([595.28, 841.89]); // A4 size
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  let y = height - 40;
  const lineHeight = 20;

  const drawHeader = (text) => {
    page.drawText(text, {
      x: 40,
      y,
      size: 16,
      font,
      color: rgb(0, 0.2, 0.5),
    });
    y -= lineHeight + 10;
  };

  const drawText = (label, value) => {
    page.drawText(`${label}: ${value || ''}`, {
      x: 40,
      y,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });
    y -= lineHeight;
  };
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-GB', {
      year: 'numeric',
      month: 'long',  // e.g., May
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Asia/Colombo'  // Adjust based on your local timezone
    });
  };
  
  
  
  drawHeader('Vehicle Request Form');

  drawText('Date', formData.date);
  drawText('Vehicle', vehicle?.vehicleName || '');
  drawText('Start Time', formData.startTime);
  drawText('End Time', formData.endTime);
  drawText('Departure From', formData.depatureLocation);
  drawText('Destination', formData.destination);
  drawText('Section', formData.section);
  drawText('Funded From', formData.reasonFunded);
  drawText('Return in same route?', formData.comeBack ? 'Yes' : 'No');
  drawText('Approximate Distance (km)', formData.distance);
  drawText('Reason', formData.reason);

  y -= 10;
  drawHeader('Approval Notes');
  drawText('Head Note', formData.departmentHeadNote);
  drawText('Checker Note', formData.checkerNote);
  drawText('AR Note', formData.arDeanNote);
  drawText('Dean Note', formData.deanNote);


  y -= 10;
  drawHeader('Passenger List');

  page.drawText('No', { x: 40, y, size: 12, font });
  page.drawText('Name', { x: 80, y, size: 12, font });
  page.drawText('Designation', { x: 200, y, size: 12, font });
  page.drawText('Pickup', { x: 330, y, size: 12, font });
  page.drawText('Drop-off', { x: 430, y, size: 12, font });
  y -= lineHeight;

  passengerList.forEach((p, index) => {
    if (y < 60) {
      y = height - 40;
      page = pdfDoc.addPage([595.28, 841.89]);
    }

    page.drawText(String(index + 1), { x: 40, y, size: 12, font });
    page.drawText(p.name, { x: 80, y, size: 12, font });
    page.drawText(p.position, { x: 200, y, size: 12, font });
    page.drawText(p.pickup, { x: 330, y, size: 12, font });
    page.drawText(p.drop, { x: 430, y, size: 12, font });
    y -= lineHeight;

    y -= 10;
    drawHeader('Security Section');
    //drawText('Vehicle departure date and time from the gate', formData.startDateTime);
    drawText('Vehicle departure date and time from the gate', formatDateTime(formData.startDateTime));
    drawText('Vehicle arrival date and time to the gate', formatDateTime(formData.endDateTime));  });

  const pdfBytes = await pdfDoc.save();

  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'vehicle_request_form.pdf';
  link.click();
}
