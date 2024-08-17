import classes from './MealGeneral.module.css';
import {mealTypeMapper} from "../../../util/nameMappers.js";
import {Link} from "react-router-dom";

function MealGeneral({ data, monday, meal }) {
    console.log(data);
    return (
        <div className={`${classes[meal]} ${classes.meal}`}>
            <div className={classes.dishType}>
                <h2>{mealTypeMapper(meal)}</h2>
            </div>
            <Link className={classes.macros} to={`meal/${data.mealId}`}>
                <div>
                    <p>Węglowodany: {data.stats.carbs} g</p>
                </div>
                <div>
                    <p>Tłuszcze: {data.stats.fats} g</p>
                </div>
                <div>
                    <p>Białka: {data.stats.proteins} g</p>
                </div>
                <div>
                    <p>Kcal: {data.stats.kcal} kcal</p>
                </div>
            </Link>
        </div>
    )
}

export default MealGeneral;