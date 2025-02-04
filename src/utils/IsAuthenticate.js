import axios from "axios";

export const IsAuthenticate = async () => {
    try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const api = process.env.REACT_APP_API_URL;

        if (!token || !userId) return false; 

        const response = await axios.get(`${api}/user/authLinks/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log("Auth Response:", response.data);

        if (response.data.code === 200) {
            return response.data.data; 
        }

        return false;
    } catch (error) {
        console.error("Authentication check failed:", error);
        return false;
    }
};
