import {checkAuthLoader, getAuthToken} from "../util/auth.js";
import {json, useLoaderData} from "react-router-dom";
import DietDayDetails from "../components/diet/dietDay/DietDayDetails.jsx";

function DietDayPage() {
    const loaderData = useLoaderData();
    console.log(loaderData);
    const data = loaderData.responseData;
    return <DietDayDetails mondayDate={loaderData.date} data={data}/>;

}

export default DietDayPage;

export async function loader({ params }) {
    // Check if this check is necessary :)
    const authResult = checkAuthLoader();
    if (authResult instanceof Response) {
        return authResult;
    }
    console.log(params);

    const dayId = params.dietDayId;
    const token = getAuthToken();

    const response = await fetch(`http://localhost:8080/api/diet-day/get/${dayId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        throw json(
            {message: "Error getting diet"},
            {status: 500}
        );
    } else {
        const responseData = await response.json();
        return {
            date: params.date,
            responseData
        };
    }
}

