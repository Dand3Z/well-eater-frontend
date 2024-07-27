import classes from './MealContent.module.css';
import {Link} from "react-router-dom";

function MealContent( {...props } ) {
    const mondayDate = props.mondayDate;
    const dietDayId = props.dietDayId;
    const data = props.responseData;

    return (
        <>
            <div className={classes.mealHeader}>
                <Link to={`/diet/${mondayDate}/day/${dietDayId}`}>
                    <div>Wróć</div>
                </Link>
                <div className={classes.totalStats}>
                    <p>Węglowodany: {data.stats.carbs} g</p>
                    <p>Tłuszcz: {data.stats.fats} g</p>
                    <p>Białko: {data.stats.proteins} g</p>
                    <p>Kcal: {data.stats.kcal} kcal</p>
                </div>
            </div>
        </>
    )
}

export default MealContent;