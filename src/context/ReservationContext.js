import React, { createContext, useState, useContext } from "react";

const ReservationContext = createContext();

export function ReservationProvider({ children }) {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [tabValue, setTabValue] = useState("one");
  return (
    <ReservationContext.Provider value={{ selectedRequest, setSelectedRequest,tabValue, setTabValue }}>
      {children}
    </ReservationContext.Provider>
  );
}

export const useReservation = () => useContext(ReservationContext);
