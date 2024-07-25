import DietNavMenu from "./DietNavMenu.jsx";
import {formatDate} from '../../util/date.js';
import {useState} from "react";

function calculateCurrentMonday() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const lastMonday = new Date(today);
    lastMonday.setDate(today.getDate() - dayOfWeek + 1);
    return formatDate(lastMonday, 'YYYY-MM-DD');
}

function calculateDate(currentMonday, move) {
    const monday = new Date(currentMonday);
    const day = new Date(currentMonday);
    day.setDate(monday.getDate() + move);
    console.log(day);
    return formatDate(day, 'YYYY-MM-DD');
}

function calculateCurrentSunday(currentMonday) {
    return calculateDate(currentMonday, 6);
}

function DietContent() {
    const [currentMonday, setCurrentMonday] = useState(calculateCurrentMonday());

    function handleCurrentWeekChange(motionDirection) {
        if (motionDirection === "previous") {
            setCurrentMonday(calculateDate(currentMonday, -7));
        }
        if (motionDirection === "next") {
            setCurrentMonday(calculateDate(currentMonday, 7));
        }
    }


  return (
      <>
        <DietNavMenu
            currentMonday={currentMonday}
            currentSunday={calculateCurrentSunday(currentMonday)}
            onClick={handleCurrentWeekChange} />
      </>
  );
}

export default DietContent;