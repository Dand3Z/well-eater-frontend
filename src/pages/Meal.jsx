import MealContent from "../components/diet/dietDay/meal/MealContent.jsx";
import {checkAuthLoader, getAuthToken} from "../util/auth.js";
import {json, useLoaderData} from "react-router-dom";
import {getServerUrl} from "../util/url.js";

function MealPage() {
    const loaderData = useLoaderData();
    console.log(loaderData);
    const data = loaderData.responseData;
    return <MealContent responseData={data} mondayDate={loaderData.date} dietDayId={loaderData.dietDayId}/>
}

export default MealPage;

export async function loader({ params }) {
    const authResult = checkAuthLoader();
    if (authResult instanceof Response) {
        return authResult;
    }
    console.log(params);

    const mealId = params.mealId;
    const token = getAuthToken();

    const response = await fetch(`${getServerUrl()}/api/user/meal/get/${mealId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        throw json(
            {message: "Error getting meal"},
            {status: 500}
        );
    } else {
        const responseData = await response.json();
        responseData.foods.sort((a, b) => a.name.localeCompare(b.name));
        return {
            date: params.date,
            dietDayId: params.dietDayId,
            responseData
        };
    }
}