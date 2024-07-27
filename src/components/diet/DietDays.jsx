import classes from './DietDays.module.css'
import DietDay from "./DietDay.jsx";
import {useOutletContext} from "react-router-dom";
import {calculateDate} from "../../util/date.js";

function getDayData(dietDays, currentMonday, move) {
    const date = calculateDate(currentMonday, move);
    return dietDays.find((d) => d.date === date);
}

function DietDays() {
    const { currentMonday, currentSunday, dietDays } = useOutletContext();
    console.log(currentMonday, currentSunday, dietDays);
    return (
        <div className={classes.dietContainer}>
            <DietDay day="monday" data={getDayData(dietDays, currentMonday, 0)}/>
            <DietDay day="tuesday" data={getDayData(dietDays, currentMonday, 1)}/>
            <DietDay day="wednesday" data={getDayData(dietDays, currentMonday, 2)}/>
            <DietDay day="thursday" data={getDayData(dietDays, currentMonday, 3)}/>
            <DietDay day="friday" data={getDayData(dietDays, currentMonday, 4)}/>
            <DietDay day="saturday" data={getDayData(dietDays, currentMonday, 5)}/>
            <DietDay day="sunday" data={getDayData(dietDays, currentMonday, 6)}/>
        </div>
    )
}

export default DietDays;