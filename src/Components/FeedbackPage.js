import React, { useState }  from "react";
import '../Css/FeedbackPageStyle.css'
import { useParams } from "react-router-dom";

export default function FeedbackPage() {

    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        punctuality: "",
        ProfessionalismOfTheDriver: "",
        CleanlinessOfTheTaxi: "",
        comfortOfTheRide: "",
        overallSatisfaction: "",
        otherFeedback: "",
        SuggestionsForImprovement: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        setErrors({ ...errors, [e.target.name]: "" });
    };

    const { vehicle} = useParams();
    console.log(vehicle)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key]) {
                validationErrors[key] = "This field is required";
            }
        });
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            alert("Feedback not Submited, Fill all the details and try again")
            return;
        }

            // Assuming the URL is stored in a variable called 'urlString'
    const urlString = window.location.href;

    // Step 1: Parse the URL
    const url = new URL(urlString);
    const params = new URLSearchParams(url.search);

    // Step 2: Access the restaurantID parameter
    const selectedVehicleNo = params.get("vehicle");

    console.log("Restaurant ID:", selectedVehicleNo);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/user/feedback/feedback-submit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    punctuality: formData.punctuality,
                    ProfessionalismOfTheDriver: formData.ProfessionalismOfTheDriver,
                    CleanlinessOfTheTaxi: formData.CleanlinessOfTheTaxi,
                    comfortOfTheRide: formData.comfortOfTheRide,
                    overallSatisfaction: formData.overallSatisfaction,
                    otherFeedback: formData.otherFeedback,
                    SuggestionsForImprovement: formData.SuggestionsForImprovement,
                    vehicleNo : selectedVehicleNo
                })
            });
            
            const data = await response.json();
            console.log(data);
            alert("Feedback Submited")
            // Optionally, show success message or redirect user
        } catch (error) {
            console.error("Error submitting feedback:", error);
            alert("Something went wrong")
            // Optionally, show error message to the user
        }
    };


    return(
        <div className="background">
            <div className="feedbackFormContainer">
                
                <form onSubmit={handleSubmit}>
                    <div className="topic">FEEDBACK FORM</div>
                    <table className="feedbackTable">
                        <tr>
                            <th></th>
                            <th>Very Good</th>
                            <th>Good</th>
                            <th>Poor</th>
                            <th>Very Poor</th>
                        </tr>
                        <tr>
                            <th>Punctuality</th>
                            <th><input type="radio" name="punctuality" value= "4" onChange={handleChange}></input></th>
                            <th><input type="radio" name="punctuality" value="3" onChange={handleChange}></input></th>
                            <th><input type="radio" name="punctuality" value="2" onChange={handleChange}></input></th>
                            <th><input type="radio" name="punctuality" value = "1" onChange={handleChange}></input></th>
                        </tr>
                        <tr>
                            <th>Professionalism</th>
                            <th><input type="radio" name="ProfessionalismOfTheDriver" value= "4" onChange={handleChange}></input></th>
                            <th><input type="radio" name="ProfessionalismOfTheDriver" value= "3" onChange={handleChange}></input></th>
                            <th><input type="radio" name="ProfessionalismOfTheDriver" value= "2" onChange={handleChange}></input></th>
                            <th><input type="radio" name="ProfessionalismOfTheDriver" value= "1" onChange={handleChange}></input></th>
                        </tr>
                        <tr>
                            <th>Cleanliness of the taxi</th>
                            <th><input type="radio" name="CleanlinessOfTheTaxi" value= "4" onChange={handleChange}></input></th>
                            <th><input type="radio" name="CleanlinessOfTheTaxi" value= "3" onChange={handleChange}></input></th>
                            <th><input type="radio" name="CleanlinessOfTheTaxi" value= "2" onChange={handleChange}></input></th>
                            <th><input type="radio" name="CleanlinessOfTheTaxi" value= "1" onChange={handleChange}></input></th>
                        </tr>
                        <tr>
                            <th>Comfrot fo the ride</th>
                            <th><input type="radio" name="comfortOfTheRide" value= "4" onChange={handleChange}></input></th>
                            <th><input type="radio" name="comfortOfTheRide" value= "3" onChange={handleChange}></input></th>
                            <th><input type="radio" name="comfortOfTheRide" value= "2" onChange={handleChange}></input></th>
                            <th><input type="radio" name="comfortOfTheRide" value= "1" onChange={handleChange}></input></th>
                        </tr>
                        <tr>
                            <th>Overall satisfaction</th>
                            <th><input type="radio" name="overallSatisfaction" value= "4" onChange={handleChange}></input></th>
                            <th><input type="radio" name="overallSatisfaction" value= "3" onChange={handleChange}></input></th>
                            <th><input type="radio" name="overallSatisfaction" value= "2" onChange={handleChange}></input></th>
                            <th><input type="radio" name="overallSatisfaction" value= "1" onChange={handleChange}></input></th>
                        </tr>
                    </table>
                    
                    <div className="typeFeedback">
                        <label>Other Feedback :</label>
                        <input type="text" name="otherFeedback" placeholder="Provide your feedback" onChange={handleChange}></input>
                        {errors.otherFeedback && <span className="error">{errors.otherFeedback}</span>}

                        <label>Suggestions for Improvement :</label>
                        <input type="text" name="SuggestionsForImprovement" placeholder="Provide your feedback" onChange={handleChange}></input>
                        {errors.SuggestionsForImprovement && <span className="error">{errors.SuggestionsForImprovement}</span>}

                        <button className="feedbackSubmitbtn" type="submit">Submit</button>
                    </div>
                </form>
                
            </div>
        </div>
    )
}