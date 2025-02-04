import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { IsAuthenticate } from "./IsAuthenticate";

const ProtectedRoute = ({ allowedRole }) => {
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const role = await IsAuthenticate();
            setUserRole(role);
            setLoading(false);
        };
        checkAuth();
    }, []);

    console.log("Protected Route Check:", userRole);

    if (loading) return <div>Loading...</div>; 

    if (!userRole) return <Navigate to="/" />; 
    if (userRole === allowedRole) {
        return <Outlet />; 
    }

    return <Navigate to="/" />; 
};

export default ProtectedRoute;
