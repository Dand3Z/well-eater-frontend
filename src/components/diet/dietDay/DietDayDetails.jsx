import classes from './DietDayDetails.module.css';
import MealGeneral from "./MealGeneral.jsx";
import {Link} from "react-router-dom";
import Icon from "../../general/ImportIcons.jsx";

function getMealData(data, mealType) {
    return data.meals.find((m) => m.mealType === mealType);
}

function DietDayDetails( {...props } ) {
    const mondayDate = props.mondayDate;
    const data = props.data;
    return (
        <>
            <div className={classes.dayHeader}>
                <Link to={`/diet/${mondayDate}`}>
                    <div className={classes.backward}>
                        <Icon className={'smallIcon'} type={'NAV'} value={'BACKWARD'} />
                    </div>
                </Link>
                <div className={classes.totalStats}>
                    <Icon className={'smallIcon'} type={'NAV'} value={'CHART_BAR'} />
                    <p>Statystyki dnia:</p>
                    <p>Węglowodany: {data.stats.stats.carbs} g</p>
                    <p>Tłuszcze: {data.stats.stats.fats} g</p>
                    <p>Białka: {data.stats.stats.proteins} g</p>
                    <p>&rarr; {data.stats.stats.kcal} kcal</p>
                </div>
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