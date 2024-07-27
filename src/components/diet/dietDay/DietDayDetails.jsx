import classes from './DietDayDetails.module.css';
import MealGeneral from "./MealGeneral.jsx";
import {Link} from "react-router-dom";

function getMealData(data, mealType) {
    return data.meals.find((m) => m.mealType === mealType);
}

function DietDayDetails( {...props } ) {
    const mondayDate = props.mondayDate;
    const data = props.data;
    console.log(data);
    return (
        <>
            <div className={classes.dayHeader}>
                <Link to={`/diet/${mondayDate}`}>
                    <div>Dupa</div>
                </Link>
            </div>
            <div className={classes.dayContainer}>
                <MealGeneral meal="breakfast" monday={mondayDate} data={getMealData(data, "BREAKFAST")}/>
                <MealGeneral meal="lunch" monday={mondayDate} data={getMealData(data, "LUNCH")}/>
                <MealGeneral meal="dinner" monday={mondayDate} data={getMealData(data, "DINNER")}/>
                <MealGeneral meal="snack" monday={mondayDate} data={getMealData(data, "SNACK")}/>
                <MealGeneral meal="supper" monday={mondayDate} data={getMealData(data, "SUPPER")}/>
            </div>
        </>
    );
}

export default DietDayDetails;