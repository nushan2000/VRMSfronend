import React, { createContext, useState, useContext } from "react";

const ReservationContext = createContext();

export function ReservationProvider({ children }) {
  const [selectedRequest, setSelectedRequest] = useState(null);

  return (
    <ReservationContext.Provider value={{ selectedRequest, setSelectedRequest }}>
      {children}
    </ReservationContext.Provider>
  );
}

export const useReservation = () => useContext(ReservationContext);
