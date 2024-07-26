import classes from './DietDay.module.css';
import {dayWeekMapper} from '../../util/dayWeekNameMapper.js';

// date, dietDayId, meals[], stats: date, stats: carbs, fats, kcal, proteins
function DietDay({ day, data }) {
    // if data === undefined -> not used day, init it
    return (
        <div className={`${classes[day]} ${classes.day}`}>
            <h2>{dayWeekMapper(day)}</h2>
            {data !== undefined && (
                <>
                    <h3>Węglowodany: {data.stats.stats.carbs} g</h3>
                    <h3>Tłuszcz: {data.stats.stats.fats} g</h3>
                    <h3>Białko: {data.stats.stats.proteins} g</h3>
                    <h3>Kcal: {data.stats.stats.kcal} kcal</h3>
                </>
            )
            }
        </div>
    )
}

export default DietDay;