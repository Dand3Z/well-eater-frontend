import classes from './DietDay.module.css';
import {dayWeekMapper} from '../../util/dayWeekNameMapper.js';

// date, dietDayId, meals[], stats: date, stats: carbs, fats, kcal, proteins
function DietDay({ day, data }) {
    // if data === undefined -> not used day, init it
    return (
        <div className={`${classes[day]} ${classes.day}`}>
            <h2>{dayWeekMapper(day)}</h2>
        </div>
    )
}

export default DietDay;