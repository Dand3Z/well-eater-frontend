import classes from './MealGeneral.module.css';
import {mealTypeMapper} from "../../../util/nameMappers.js";

function MealGeneral({ data, monday, meal }) {
    return (
        <div className={`${classes[meal]} ${classes.meal}`}>
            <div>
                <h2>{mealTypeMapper(meal)}</h2>
            </div>
            <div>

            </div>
        </div>
    )
}

export default MealGeneral;