import classes from './DietDay.module.css';
import {dayWeekMapper} from '../../util/dayWeekNameMapper.js';

function DietDay({ day }) {
    return (
        <div className={`${classes[day]} ${classes.day}`}>
            <h2>{dayWeekMapper(day)}</h2>
        </div>
    )
}

export default DietDay;