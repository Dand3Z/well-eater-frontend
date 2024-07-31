import classes from './DietDays.module.css'
import DietDayGeneral from "./DietDayGeneral.jsx";
import {useOutletContext} from "react-router-dom";
import {calculateDate} from "../../util/date.js";

function getDayData(dietDays, currentMonday, move) {
    const date = calculateDate(currentMonday, move);
    return dietDays.find((d) => d.date === date);
}

function DietDays() {
    const { currentMonday, currentSunday, dietDays } = useOutletContext();
    return (
        <div className={classes.dietContainer}>
            <DietDayGeneral day="monday" data={getDayData(dietDays, currentMonday, 0)} date={calculateDate(currentMonday, 0)}/>
            <DietDayGeneral day="tuesday" data={getDayData(dietDays, currentMonday, 1)} date={calculateDate(currentMonday, 1)}/>
            <DietDayGeneral day="wednesday" data={getDayData(dietDays, currentMonday, 2)} date={calculateDate(currentMonday, 2)}/>
            <DietDayGeneral day="thursday" data={getDayData(dietDays, currentMonday, 3)} date={calculateDate(currentMonday, 3)}/>
            <DietDayGeneral day="friday" data={getDayData(dietDays, currentMonday, 4)} date={calculateDate(currentMonday, 4)}/>
            <DietDayGeneral day="saturday" data={getDayData(dietDays, currentMonday, 5)} date={calculateDate(currentMonday, 5)}/>
            <DietDayGeneral day="sunday" data={getDayData(dietDays, currentMonday, 6)} date={calculateDate(currentMonday, 6)}/>
        </div>
    )
}

export default DietDays;