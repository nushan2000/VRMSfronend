import React, { useEffect, useState } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import "../Css/BarChartStyle.css";

export default function BarChart() {

    const[selectedVehicleNumber,setSelectedVehicleNumber] = useState("");
    const[selectedFeedbackData, setSelectedFeedbackData] = useState(null);
    const[selectedOtherFeedback,setSelectedOtherFeedback]= useState("");
    const selectedVehicleDetails = localStorage.getItem('selectedVehicleDetails');
    const token = localStorage.getItem("token"); 
    useEffect(()=>{
        const fetchData = async () =>{
            
            try{
                const selectedVehicleNo = {
                    vehicleNumber : selectedVehicleDetails,
                }
                const response = await fetch(`${process.env.REACT_APP_API_URL}/user/feedback/vehicleNo`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(selectedVehicleNo)
                });

                if(response.ok){
                    const data = await response.json();
                    setSelectedFeedbackData(data);
                    setSelectedOtherFeedback(data.otherFeedback)
                } else {
                    console.log("Logical issue");
                }
            } catch(error){
                console.log("Feedback data fetching error");
            }   
        };

        fetchData();
    
    },[selectedVehicleDetails])


    ChartJS.register(...registerables);

    const renderBarChart = () => {
        if(selectedFeedbackData) {
            const feedbackData = selectedFeedbackData;
            const data = {
                labels: ["Cleanliness", "Professionalism", "Punctuality", "Comfort", "Overall Satisfaction"],
                datasets: [
                    {
                        label: "Feedback",
                        data: [
                            calculateAverage(feedbackData.CleanlinessOfTheTaxi),
                            calculateAverage(feedbackData.ProfessionalismOfTheDriver),
                            calculateAverage(feedbackData.Punctuality),
                            calculateAverage(feedbackData.comfortOfTheRide),
                            calculateAverage(feedbackData.overallSatisfaction)
                        ],
                        backgroundColor: [
                            "rgba(32, 52, 158, 0.8)",
                            "rgba(249, 6, 30, 0.8)",
                            "rgba(3, 223, 33, 0.8)",
                            "rgba(177, 5, 179, 0.8)",
                            "rgba(3, 0, 3, 0.8)"
                        ],
                        
                    }
                ],
            };
            return (
                <div className="card w-100 h-100">
                    <Bar
                        data={data}
                        options={{
                            responsive: true,
                            title: { text: "Feedback Details", display: true },
                            yAxisTitle: "Average Rating",
                            scales: {
                                x: {
                                    ticks: {
                                        color: 'red' ,
                                        
                                    }
                                },
                                y: {
                                    ticks: {
                                        color: 'red' ,
                                        scale: '50%'
                                    }
                                }
                            }
                        }}
                        height={"400px"}
                    />

                    <div>
                        <p>{selectedOtherFeedback}</p>
                    </div>
                </div>
            );
        } else {
            return <div>Loading...</div>;
        }
    };

    // Function to calculate average rating
    const calculateAverage = (feedback) => {
        let total = 0;
        let count = 0;
        for(const rating in feedback) {
            total += parseInt(rating) * feedback[rating];
            count += feedback[rating];
        }
        return count === 0 ? 0 : total / count;
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    {renderBarChart()}
                </div>
            </div>
        </div>
    );
}