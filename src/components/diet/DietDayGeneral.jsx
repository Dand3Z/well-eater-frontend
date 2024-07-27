import classes from './DietDayGeneral.module.css';
import {dayWeekMapper} from '../../util/nameMappers.js';
import {Link} from "react-router-dom";

// date, dietDayId, dietDay[], stats: date, stats: carbs, fats, kcal, proteins
function DietDayGeneral({ day, data }) {
    // if data === undefined -> not used day, init it
    return (
        <div className={`${classes[day]} ${classes.day} ${data === undefined ? classes.unused : classes.used}`}>
            <div className={classes.title}>
                <h2>{dayWeekMapper(day)}</h2>
            </div>
            {data !== undefined && (
                <Link to={`day/${data.dietDayId}`}>
                    <div className={classes.macros}>
                        <p>Węglowodany: {data.stats.stats.carbs} g</p>
                        <p>Tłuszcz: {data.stats.fats} g</p>
                        <p>Białko: {data.stats.stats.proteins} g</p>
                        <p>Kcal: {data.stats.stats.kcal} kcal</p>
                    </div>
                </Link>)}
        </div>
    )
}

export default DietDayGeneral;