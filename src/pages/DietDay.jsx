import {checkAuthLoader, getAuthToken} from "../util/auth.js";
import {json, Outlet, useLoaderData, useMatch} from "react-router-dom";
import DietDayDetails from "../components/diet/dietDay/DietDayDetails.jsx";
import {getServerUrl} from "../util/url.js";

function DietDayPage() {
    const loaderData = useLoaderData();
    const match = useMatch('diet/:date?/day/:dietDayId');
    const data = loaderData.responseData;
    return (
        <>
            {match && <DietDayDetails mondayDate={loaderData.date} data={data}/>}
            <Outlet />
        </>
    );

}

export default DietDayPage;

export async function loader({ params }) {
    const authResult = checkAuthLoader();
    if (authResult instanceof Response) {
        return authResult;
    }
    console.log(params);

    const dayId = params.dietDayId;
    const token = getAuthToken();

    const response = await fetch(`${getServerUrl()}/api/user/diet-day/get/${dayId}`, {
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

