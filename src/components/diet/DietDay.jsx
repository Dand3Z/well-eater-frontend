import classes from './DietDay.module.css';
import {dayWeekMapper} from '../../util/dayWeekNameMapper.js';

// date, dietDayId, meals[], stats: date, stats: carbs, fats, kcal, proteins
function DietDay({ day, data }) {
    // if data === undefined -> not used day, init it
    return (
        <div className={`${classes[day]} ${classes.day} ${data === undefined ? classes.unused : classes.used}`}>
            <div className={classes.title}>
                <h2>{dayWeekMapper(day)}</h2>
            </div>
            <div className={classes.macros}>
                {data !== undefined && (
                    <>
                        <p>Węglowodany: {data.stats.stats.carbs} g</p>
                        <p>Tłuszcz: {data.stats.stats.fats} g</p>
                        <p>Białko: {data.stats.stats.proteins} g</p>
                        <p>Kcal: {data.stats.stats.kcal} kcal</p>
                    </>
                )}
            </div>
        </div>
    )
}

export default DietDay;