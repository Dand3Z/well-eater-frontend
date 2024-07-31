import {calculateCurrentMonday, calculateCurrentSunday, calculateDate} from "../util/date.js";
import {useState} from "react";
import {json, Outlet, useLoaderData, useMatch, useNavigate} from "react-router-dom";
import {checkAuthLoader, getAuthToken} from "../util/auth.js";
import DietNavMenu from "../components/diet/DietNavMenu.jsx";



function DietWeekPage() {
  const data = useLoaderData();
  const [currentMonday, setCurrentMonday] = useState(data.currentMonday);
  const navigate = useNavigate();
  const match = useMatch('diet/:date?');

  function handleCurrentWeekChange(motionDirection) {
    const newDate = calculateDate(currentMonday, motionDirection === "previous" ? -7 : 7);
    if (newDate !== currentMonday) {
      setCurrentMonday(newDate);
      navigate(`/diet/${newDate}`);
    }
  }

  return (
      <>
        {match && (
          <DietNavMenu currentMonday={currentMonday}
                       currentSunday={calculateCurrentSunday(currentMonday)}
                       onClick={handleCurrentWeekChange}/>
        )}
        <Outlet context={{ currentMonday, currentSunday: calculateCurrentSunday(currentMonday), dietDays: data.days }}/>
      </>
  );
}

export default DietWeekPage;

export async function loadDiet({ params }) {
  const authResult = checkAuthLoader();
  if (authResult instanceof Response) {
    return authResult;
  }

  const date = params.date || new Date();
  const currentMonday = calculateCurrentMonday(date);
  const currentSunday = calculateCurrentSunday(currentMonday);
  const token = getAuthToken();

  const response = await fetch(`http://localhost:8080/api/diet-day/get/by-date?startDate=${currentMonday}&endDate=${currentSunday}`, {
    method: 'GET',
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
      currentMonday,
      days: responseData
    };
  }
}