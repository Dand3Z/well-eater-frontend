import classes from "./DatePicker.module.css";
import {useState} from "react";
import {formatDate} from '../../util/date.js';

function DatePicker({ currentMonday }) {
    const [currentStartDate, setCurrentStartDate] = useState(new Date(currentMonday));

    const updateWeekDisplay = () => {
        const endDate = new Date(currentStartDate);
        endDate.setDate(endDate.getDate() + 6);
        return `${formatDate(currentStartDate)} - ${formatDate(endDate)}`;
    };

    const changeWeek = (days) => {
        const newStartDate = new Date(currentStartDate);
        newStartDate.setDate(newStartDate.getDate() + days);
        setCurrentStartDate(newStartDate);
    };

    return (
        <div className={classes.datePicker}>
            <button className={classes.arrow} onClick={() => changeWeek(-7)}>&larr;</button>
            <span className={classes.weekDisplay}>{updateWeekDisplay()}</span>
            <button className={classes.arrow} onClick={() => changeWeek(7)}>&rarr;</button>
        </div>
    );
};

export default DatePicker;
//