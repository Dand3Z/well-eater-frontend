import classes from "./DatePicker.module.css";
import {formatDate} from '../../util/date.js';

function DatePicker({ currentMonday, currentSunday, onClick }) {

    const updateWeekDisplay = () => {
        return `${formatDate(new Date(currentMonday))} - ${formatDate(new Date(currentSunday))}`;
    };

    return (
        <div className={classes.datePicker}>
            <button className={classes.arrow} onClick={() => onClick('previous')}>&larr;</button>
            <span className={classes.weekDisplay}>{updateWeekDisplay()}</span>
            <button className={classes.arrow} onClick={() => onClick('next')}>&rarr;</button>
        </div>
    );
};

export default DatePicker;
